#!/usr/bin/env python3
"""
Full BibleSpeak publish pipeline for one word.

Usage:
    python3 scripts/publish.py aaron-pronunciation
    python3 scripts/publish.py aaron-pronunciation --video-only   # skip YouTube upload

Steps:
    1. make-video.py (renders long + short mp4)
    2. make-thumbnail.py (renders long + short thumbnails)
    3. generate-srt.py (generates long + short SRT captions)
    4. upload-youtube.py --type long
    5. upload-youtube.py --type short
"""

import argparse
import subprocess
import sys
from pathlib import Path

BASE = Path("/Users/briandempsey/AI Sites/biblespeak")
SCRIPTS = BASE / "scripts"


def run(cmd, label):
    print(f"\n{'='*60}")
    print(f"  {label}")
    print(f"{'='*60}")
    result = subprocess.run(cmd, cwd=str(BASE))
    if result.returncode != 0:
        print(f"\nERROR: '{label}' failed (exit code {result.returncode})")
        sys.exit(result.returncode)


def main():
    parser = argparse.ArgumentParser(description="Run the full BibleSpeak publish pipeline.")
    parser.add_argument("slug", help="Word slug, e.g. aaron-pronunciation")
    parser.add_argument("--video-only", action="store_true", help="Render videos/thumbnails/SRTs but skip upload")
    args = parser.parse_args()

    slug = args.slug
    print(f"\nBibleSpeak Publish Pipeline — {slug}")

    run(
        [sys.executable, str(SCRIPTS / "make-video.py"), slug],
        "Step 1/5: Rendering videos"
    )

    run(
        [sys.executable, str(SCRIPTS / "make-thumbnail.py"), slug],
        "Step 2/5: Generating thumbnails"
    )

    run(
        [sys.executable, str(SCRIPTS / "generate-srt.py"), slug],
        "Step 3/5: Generating SRT captions"
    )

    if args.video_only:
        print("\n--video-only flag set. Skipping upload steps.")
    else:
        run(
            [sys.executable, str(SCRIPTS / "upload-youtube.py"), slug, "--type", "long"],
            "Step 4/5: Uploading long-form to YouTube"
        )

        run(
            [sys.executable, str(SCRIPTS / "upload-youtube.py"), slug, "--type", "short"],
            "Step 5/5: Uploading Short to YouTube"
        )

    print(f"\n{'='*60}")
    print(f"  DONE — {slug}")
    print(f"{'='*60}")

    # Print what was created
    videos_dir = BASE / "videos"
    created = [
        videos_dir / f"{slug}-long.mp4",
        videos_dir / f"{slug}-short.mp4",
        videos_dir / f"{slug}-thumb-long.png",
        videos_dir / f"{slug}-thumb-short.png",
        videos_dir / f"{slug}-long.srt",
        videos_dir / f"{slug}-short.srt",
    ]
    print("\nFiles created:")
    for p in created:
        status = "✓" if p.exists() else "✗ MISSING"
        print(f"  {status}  {p.name}")

    if not args.video_only:
        ids_file = videos_dir / f"{slug}-youtube-ids.json"
        if ids_file.exists():
            import json
            with open(ids_file) as f:
                ids = json.load(f)
            print(f"\nYouTube IDs saved to {ids_file.name}:")
            for k, v in ids.items():
                if v:
                    print(f"  {k}: https://www.youtube.com/watch?v={v}")


if __name__ == "__main__":
    main()
