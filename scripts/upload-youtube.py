#!/usr/bin/env python3
"""
Uploads a BibleSpeak video to YouTube with title, description, thumbnail, captions, and playlist.

Usage:
    python3 scripts/upload-youtube.py aaron-pronunciation --type long
    python3 scripts/upload-youtube.py aaron-pronunciation --type short

Writes the video ID to videos/[slug]-youtube-ids.json (merges with existing file).
Prints the video URL when done.

Prerequisites:
    pip install google-auth-oauthlib google-api-python-client
    config/client_secrets.json  — download from Google Cloud Console (OAuth 2.0 client)
    config/youtube-playlists.json — {"long": "PLAYLIST_ID", "short": "PLAYLIST_ID"}
"""

import argparse
import json
import os
import sys
from pathlib import Path

BASE = Path("/Users/briandempsey/AI Sites/biblespeak")
VIDEOS_DIR = BASE / "videos"
CONFIG_DIR = BASE / "config"
WORDS_JSON = BASE / "data/words.json"

SECRETS_FILE    = CONFIG_DIR / "client_secrets.json"
TOKEN_FILE      = CONFIG_DIR / "youtube-token.json"
PLAYLISTS_FILE  = CONFIG_DIR / "youtube-playlists.json"

SCOPES = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
]


def check_prerequisites():
    if not SECRETS_FILE.exists():
        print("Missing: config/client_secrets.json")
        print()
        print("To fix:")
        print("  1. Go to Google Cloud Console → APIs & Services → Credentials")
        print("  2. Click 'Create Credentials' → 'OAuth 2.0 Client ID'")
        print("  3. Choose 'Desktop app' as the application type")
        print("  4. Download the JSON file")
        print("  5. Save it to config/client_secrets.json")
        sys.exit(1)

    if not PLAYLISTS_FILE.exists():
        print("Missing: config/youtube-playlists.json")
        print()
        print("To fix:")
        print("  1. Go to YouTube Studio and create two playlists manually:")
        print("     - 'Bible Word Pronunciations' (for long videos)")
        print("     - 'Bible Word Shorts' (for shorts)")
        print("  2. Copy each playlist ID from its URL")
        print("  3. Create config/youtube-playlists.json with this content:")
        print('     {"long": "YOUR_LONG_PLAYLIST_ID", "short": "YOUR_SHORT_PLAYLIST_ID"}')
        sys.exit(1)


def get_authenticated_service():
    from google.oauth2.credentials import Credentials
    from google.auth.transport.requests import Request
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    creds = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())

    if not creds or not creds.valid:
        print()
        print("=" * 60)
        print("IMPORTANT: When the browser opens:")
        print("  1. Sign in with graceonlinelibrary@gmail.com")
        print("  2. You will see a channel selection screen")
        print("  3. YOU MUST CLICK 'Pronunciation Station'")
        print("     DO NOT click 'Brian Dempsey' or the email address")
        print("=" * 60)
        print()
        flow = InstalledAppFlow.from_client_secrets_file(str(SECRETS_FILE), SCOPES)
        creds = flow.run_local_server(port=0, prompt='consent')

    TOKEN_FILE.write_text(creds.to_json())
    youtube = build("youtube", "v3", credentials=creds)

    # Verify we're on the right channel
    r = youtube.channels().list(part='snippet', mine=True).execute()
    items = r.get('items', [])
    if items:
        ch_title = items[0]['snippet']['title']
        ch_id = items[0]['id']
        if 'pronunciation' not in ch_title.lower() and 'station' not in ch_title.lower():
            print()
            print("=" * 60)
            print(f"ERROR: Authenticated as '{ch_title}' — WRONG CHANNEL")
            print("Delete the token and re-run, then pick 'Pronunciation Station'")
            print("=" * 60)
            TOKEN_FILE.unlink(missing_ok=True)
            sys.exit(1)
        print(f"  Authenticated as: {ch_title} ({ch_id})")

    return youtube


def build_title(word, video_type):
    title = word["title"]
    if video_type == "long":
        return f"How to Pronounce {title} | Bible Name Pronunciation"
    else:
        return f"How to Pronounce {title} #Shorts"


def build_description(word, video_type):
    title = word["title"]
    pron = word["pronunciation"]
    slug = word["slug"]
    title_no_spaces = title.replace(" ", "")

    if video_type == "long":
        return (
            f"How to pronounce {title} ({pron}). Hear the correct pronunciation of {title} from 3 different voices.\n"
            f"\n"
            f"Whether you're reading the Bible aloud, teaching a class, or just want to say {title} correctly — this is the right pronunciation of {title}.\n"
            f"\n"
            f"🔗 https://www.biblespeak.org/{slug}/\n"
            f"🔗 https://www.biblespeak.org\n"
            f"\n"
            f"#BibleNames #HowToPronounce #BiblePronunciation #{title_no_spaces} #BibleSpeak"
        )
    else:
        return (
            f"How to pronounce {title} ({pron}). Hear it from 3 voices.\n"
            f"\n"
            f"🔗 https://www.biblespeak.org/{slug}/\n"
            f"\n"
            f"#BibleNames #HowToPronounce #BiblePronunciation #Shorts"
        )


def upload_video(youtube, word, video_type, playlist_id):
    from googleapiclient.http import MediaFileUpload

    slug = word["slug"]
    video_file = VIDEOS_DIR / f"{slug}-{video_type}.mp4"

    if not video_file.exists():
        print(f"Error: video file not found: {video_file}")
        sys.exit(1)

    body = {
        "snippet": {
            "title": build_title(word, video_type),
            "description": build_description(word, video_type),
            "tags": ["Bible", "pronunciation", "BibleSpeak", word["title"]],
            "categoryId": "27",  # Education
        },
        "status": {
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False,
        },
    }

    media = MediaFileUpload(str(video_file), chunksize=-1, resumable=True, mimetype="video/mp4")
    request = youtube.videos().insert(part="snippet,status", body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"  Upload progress: {int(status.progress() * 100)}%")

    print(f"  Uploaded: https://www.youtube.com/watch?v={response['id']}")
    return response["id"]


def upload_thumbnail(youtube, video_id, slug, video_type):
    from googleapiclient.http import MediaFileUpload

    thumb_file = VIDEOS_DIR / f"{slug}-thumb-{video_type}.png"

    if not thumb_file.exists():
        print(f"  Warning: thumbnail not found: {thumb_file}")
        return

    try:
        youtube.thumbnails().set(
            videoId=video_id,
            media_body=MediaFileUpload(str(thumb_file))
        ).execute()
        print(f"  Thumbnail uploaded.")
    except Exception as e:
        print(f"  Warning: thumbnail upload failed (account may need phone verification): {e}")


def upload_captions(youtube, video_id, slug, video_type):
    from googleapiclient.http import MediaFileUpload

    srt_file = VIDEOS_DIR / f"{slug}-{video_type}.srt"

    if not srt_file.exists():
        print(f"  Warning: captions file not found: {srt_file}")
        return

    body = {
        "snippet": {
            "videoId": video_id,
            "language": "en",
            "name": "English",
            "isDraft": False,
        }
    }
    try:
        youtube.captions().insert(
            part="snippet",
            body=body,
            media_body=MediaFileUpload(str(srt_file), mimetype="application/octet-stream")
        ).execute()
        print(f"  Captions uploaded.")
    except Exception as e:
        print(f"  Warning: caption upload failed: {e}")


def add_to_playlist(youtube, video_id, playlist_id):
    try:
        youtube.playlistItems().insert(
            part="snippet",
            body={
                "snippet": {
                    "playlistId": playlist_id,
                    "resourceId": {"kind": "youtube#video", "videoId": video_id},
                }
            }
        ).execute()
        print(f"  Added to playlist.")
    except Exception as e:
        print(f"  Warning: playlist add failed: {e}")


def save_video_id(slug, video_type, video_id):
    ids_file = VIDEOS_DIR / f"{slug}-youtube-ids.json"

    if ids_file.exists():
        ids = json.loads(ids_file.read_text())
    else:
        ids = {}

    ids[video_type] = video_id
    ids_file.write_text(json.dumps(ids, indent=2))

    # Also write back to words.json
    field = "youtube_id_long" if video_type == "long" else "youtube_id_short"
    words = json.loads(WORDS_JSON.read_text())
    for w in words:
        if w["slug"] == slug:
            w[field] = video_id
            break
    WORDS_JSON.write_text(json.dumps(words, indent=2, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description="Upload a BibleSpeak video to YouTube.")
    parser.add_argument("slug", help="Word slug (e.g. aaron-pronunciation)")
    parser.add_argument("--type", required=True, choices=["long", "short"], help="Video type")
    args = parser.parse_args()

    words = json.loads(WORDS_JSON.read_text())
    word = next((w for w in words if w["slug"] == args.slug), None)
    if word is None:
        print(f"Error: slug '{args.slug}' not found in words.json")
        sys.exit(1)

    check_prerequisites()

    playlists = json.loads(PLAYLISTS_FILE.read_text())
    playlist_id = playlists[args.type]

    youtube = get_authenticated_service()

    # Skip upload if video ID already saved
    ids_file = VIDEOS_DIR / f"{args.slug}-youtube-ids.json"
    existing = json.loads(ids_file.read_text()) if ids_file.exists() else {}
    if existing.get(args.type):
        video_id = existing[args.type]
        print(f"  Already uploaded: https://www.youtube.com/watch?v={video_id} — skipping upload")
    else:
        video_id = upload_video(youtube, word, args.type, playlist_id)
        save_video_id(args.slug, args.type, video_id)

    upload_thumbnail(youtube, video_id, args.slug, args.type)
    upload_captions(youtube, video_id, args.slug, args.type)
    add_to_playlist(youtube, video_id, playlist_id)

    print(f"\nDone! Video ID: {video_id}")
    print(f"URL: https://www.youtube.com/watch?v={video_id}")


if __name__ == "__main__":
    main()
