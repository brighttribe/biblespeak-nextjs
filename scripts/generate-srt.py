#!/usr/bin/env python3
"""
Generates SRT caption files for one BibleSpeak word.

Usage:
    python3 scripts/generate-srt.py aaron-pronunciation

Output:
    videos/[slug]-long.srt
    videos/[slug]-short.srt
"""

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path

# ── Constants ────────────────────────────────────────────────────────────────
BASE = Path("/Users/briandempsey/AI Sites/biblespeak")
AUDIO_DIR = BASE / "audio-generated"
WORD_CLIPS_HOPE = BASE / "audio-word-hope"
WORD_CLIPS_NATHANIEL = BASE / "audio-word-nathaniel"
VIDEOS_DIR = BASE / "videos"
WORDS_JSON = BASE / "data/words.json"

# Static audio durations (seconds)
INTRO_DUR          = 3.875873
MIDDLE_BEFORE_DUR  = 1.925397
MIDDLE_AFTER_BIBLE = 5.036871
MIDDLE_AFTER_OTHER = 3.736576
PROPER_BEFORE_DUR  = 1.646780
PROPER_AFTER_DUR   = 1.368118
OUTRO_DUR          = 3.504354

GAP = 0.4


# ── Helpers ───────────────────────────────────────────────────────────────────
def has_scripture(content):
    return bool(re.search(r'[A-Z][a-z]+ \d+:\d+', re.sub('<[^>]+>', ' ', content)))


def audio_duration(path):
    r = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
         '-of', 'default=noprint_wrappers=1:nokey=1', str(path)],
        capture_output=True, text=True
    )
    return float(r.stdout.strip())


def fmt_time(seconds):
    ms = int((seconds % 1) * 1000)
    s  = int(seconds) % 60
    m  = int(seconds) // 60 % 60
    h  = int(seconds) // 3600
    return f"{h:02d}:{m:02d}:{s:02d},{ms:03d}"


def write_caption(f, index, start, end, text):
    f.write(f"{index}\n")
    f.write(f"{fmt_time(start)} --> {fmt_time(end)}\n")
    f.write(f"{text}\n\n")


# ── Long-form SRT ─────────────────────────────────────────────────────────────
def generate_long_srt(word, pron_dur, nathaniel_dur, hope_dur, out_path):
    title   = word['title']
    pron    = word['pronunciation']
    content = word.get('content', '')
    bible   = has_scripture(content)

    cursor = 0.0
    index  = 1

    with open(out_path, 'w') as f:

        # ── Seg 0: intro ──────────────────────────────────────────────────────
        cursor += GAP
        # intro.mp3 caption
        write_caption(
            f, index,
            cursor, cursor + INTRO_DUR,
            "The following pronunciation is brought to you by BibleSpeak.org."
        )
        index += 1
        cursor += INTRO_DUR + GAP

        # pronunciation caption
        write_caption(
            f, index,
            cursor, cursor + pron_dur,
            f"{title} — {pron}"
        )
        index += 1
        cursor += pron_dur + GAP

        # ── Seg 1: middle ─────────────────────────────────────────────────────
        cursor += GAP
        if bible:
            sentence = (
                f"Knowing how to correctly pronounce {title} helps bring scripture to life, "
                f"grounding it in real history, real people, and the story of the Bible."
            )
            after_dur = MIDDLE_AFTER_BIBLE
        else:
            sentence = (
                f"Knowing how to correctly pronounce {title} connects you to the world of "
                f"the Bible and broader Christian tradition."
            )
            after_dur = MIDDLE_AFTER_OTHER

        seg1_dur = MIDDLE_BEFORE_DUR + nathaniel_dur + after_dur
        write_caption(f, index, cursor, cursor + seg1_dur, sentence)
        index += 1
        cursor += seg1_dur + GAP

        # ── Seg 2: repeat pronunciation ───────────────────────────────────────
        cursor += GAP
        seg2_dur = PROPER_BEFORE_DUR + hope_dur + PROPER_AFTER_DUR
        write_caption(
            f, index,
            cursor, cursor + seg2_dur,
            f"Here's how to pronounce {title} one more time."
        )
        index += 1
        cursor += seg2_dur + GAP

        # ── Seg 3: outro ──────────────────────────────────────────────────────
        cursor += GAP
        write_caption(
            f, index,
            cursor, cursor + OUTRO_DUR,
            "Visit BibleSpeak.org for more Bible word pronunciations."
        )

    print(f"  Saved long SRT: {out_path}")


# ── Short SRT ─────────────────────────────────────────────────────────────────
def generate_short_srt(word, pron_dur, out_path):
    title = word['title']
    pron  = word['pronunciation']

    with open(out_path, 'w') as f:

        # ── Seg 0: word ───────────────────────────────────────────────────────
        cursor = GAP
        write_caption(
            f, 1,
            cursor, cursor + pron_dur,
            f"{title} — {pron}"
        )
        cursor += pron_dur + GAP

        # ── Seg 1: outro ──────────────────────────────────────────────────────
        cursor += GAP
        write_caption(
            f, 2,
            cursor, cursor + OUTRO_DUR,
            "Visit BibleSpeak.org for more Bible word pronunciations."
        )

    print(f"  Saved short SRT: {out_path}")


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Generate SRT captions for a BibleSpeak word.")
    parser.add_argument("slug", help="Word slug, e.g. aaron-pronunciation")
    args = parser.parse_args()

    with open(WORDS_JSON) as f:
        words = json.load(f)

    word = next((w for w in words if w['slug'] == args.slug), None)
    if word is None:
        print(f"ERROR: slug '{args.slug}' not found in words.json")
        sys.exit(1)

    slug = args.slug

    # Measure word clip durations at runtime via ffprobe
    pron_audio_path    = AUDIO_DIR / f"{slug}.mp3"
    nathaniel_clip_path = WORD_CLIPS_NATHANIEL / f"{slug}.mp3"
    hope_clip_path      = WORD_CLIPS_HOPE / f"{slug}.mp3"

    if not pron_audio_path.exists():
        print(f"ERROR: missing pron audio: {pron_audio_path}")
        sys.exit(1)
    if not nathaniel_clip_path.exists():
        print(f"ERROR: missing Nathaniel clip: {nathaniel_clip_path}")
        sys.exit(1)
    if not hope_clip_path.exists():
        print(f"ERROR: missing Hope clip: {hope_clip_path}")
        sys.exit(1)

    pron_dur     = audio_duration(pron_audio_path)
    nathaniel_dur = audio_duration(nathaniel_clip_path)
    hope_dur      = audio_duration(hope_clip_path)

    print(f"Generating SRTs for: {word['title']} ({slug})")
    print(f"  pron_dur={pron_dur:.3f}s  nathaniel_dur={nathaniel_dur:.3f}s  hope_dur={hope_dur:.3f}s")

    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

    generate_long_srt(
        word, pron_dur, nathaniel_dur, hope_dur,
        VIDEOS_DIR / f"{slug}-long.srt"
    )
    generate_short_srt(
        word, pron_dur,
        VIDEOS_DIR / f"{slug}-short.srt"
    )

    print("Done.")


if __name__ == "__main__":
    main()
