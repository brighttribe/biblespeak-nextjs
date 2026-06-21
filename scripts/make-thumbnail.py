#!/usr/bin/env python3
"""
Generates YouTube thumbnails for one BibleSpeak word.

Usage:
    python3 scripts/make-thumbnail.py aaron-pronunciation

Output:
    videos/[slug]-thumb-long.png  — 1280x720
    videos/[slug]-thumb-short.png — 1080x1920
"""

import argparse
import json
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

# ── Constants ────────────────────────────────────────────────────────────────
BASE = Path("/Users/briandempsey/AI Sites/biblespeak")
ASSETS = BASE / "assets/video"
VIDEOS_DIR = BASE / "videos"
WORDS_JSON = BASE / "data/words.json"

FONT_BOLD = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_REG  = "/System/Library/Fonts/Supplemental/Georgia.ttf"
WHITE     = (255, 255, 255)
ACCENT    = (99, 102, 241)
DIM_WHITE = (200, 200, 220)
LEFT_PAD  = 120

# Long thumbnail dimensions
THUMB_LONG_W, THUMB_LONG_H = 1280, 720
THUMB_LONG_MAX_W = 900

# Short thumbnail dimensions
THUMB_SHORT_W, THUMB_SHORT_H = 1080, 1920


# ── Helpers ───────────────────────────────────────────────────────────────────
def auto_font(draw, text, max_w, font_path, max_size=150, min_size=60):
    for size in range(max_size, min_size - 1, -2):
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if (bbox[2] - bbox[0]) <= max_w:
            return font
    return ImageFont.truetype(font_path, min_size)


# ── Thumbnail functions ───────────────────────────────────────────────────────
def make_thumb_long(title, pron, out_path):
    """1280x720 long thumbnail — same layout as intro slide."""
    bg = Image.open(ASSETS / "youtube-bg.png").resize((THUMB_LONG_W, THUMB_LONG_H))
    draw = ImageDraw.Draw(bg)

    label_font = ImageFont.truetype(FONT_REG, 36)   # scaled for 720p
    title_font = auto_font(draw, title, THUMB_LONG_MAX_W, FONT_BOLD, 120, 48)
    pron_font  = ImageFont.truetype(FONT_REG, 44)

    tb = draw.textbbox((0, 0), title, font=title_font)
    th = tb[3] - tb[1]

    H = THUMB_LONG_H

    draw.text((LEFT_PAD, H // 2 - 140), "How to Pronounce", font=label_font, fill=ACCENT)
    draw.text((LEFT_PAD, H // 2 - th // 2 - 30), title, font=title_font, fill=WHITE)
    draw.text((LEFT_PAD, H // 2 + th // 2 + 15), pron, font=pron_font, fill=DIM_WHITE)

    bg.save(out_path)
    print(f"  Saved long thumbnail: {out_path}")


def make_thumb_short(title, pron, out_path):
    """1080x1920 short thumbnail — same as make_slide_short_word."""
    bg = Image.open(ASSETS / "shorts-bg.png").resize((THUMB_SHORT_W, THUMB_SHORT_H))
    draw = ImageDraw.Draw(bg)

    W = THUMB_SHORT_W
    H = THUMB_SHORT_H
    max_w = W - LEFT_PAD * 2

    label_font = ImageFont.truetype(FONT_REG, 52)
    title_font = auto_font(draw, title, max_w, FONT_BOLD, 150, 60)
    pron_font  = ImageFont.truetype(FONT_REG, 60)

    tb = draw.textbbox((0, 0), title, font=title_font)
    th = tb[3] - tb[1]
    lb = draw.textbbox((0, 0), "How to Pronounce", font=label_font)
    pb = draw.textbbox((0, 0), pron, font=pron_font)

    draw.text(
        ((W - (lb[2] - lb[0])) // 2, H // 2 - 200),
        "How to Pronounce", font=label_font, fill=ACCENT
    )
    draw.text(
        ((W - (tb[2] - tb[0])) // 2, H // 2 - th // 2 - 40),
        title, font=title_font, fill=WHITE
    )
    draw.text(
        ((W - (pb[2] - pb[0])) // 2, H // 2 + th // 2 + 20),
        pron, font=pron_font, fill=DIM_WHITE
    )

    bg.save(out_path)
    print(f"  Saved short thumbnail: {out_path}")


# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Generate thumbnails for a BibleSpeak word.")
    parser.add_argument("slug", help="Word slug, e.g. aaron-pronunciation")
    args = parser.parse_args()

    with open(WORDS_JSON) as f:
        words = json.load(f)

    word = next((w for w in words if w['slug'] == args.slug), None)
    if word is None:
        print(f"ERROR: slug '{args.slug}' not found in words.json")
        sys.exit(1)

    VIDEOS_DIR.mkdir(parents=True, exist_ok=True)

    title = word['title']
    pron  = word['pronunciation']

    print(f"Generating thumbnails for: {title} ({args.slug})")

    long_out  = VIDEOS_DIR / f"{args.slug}-thumb-long.png"
    short_out = VIDEOS_DIR / f"{args.slug}-thumb-short.png"

    make_thumb_long(title, pron, long_out)
    make_thumb_short(title, pron, short_out)

    print("Done.")


if __name__ == "__main__":
    main()
