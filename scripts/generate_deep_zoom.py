#!/usr/bin/env python3
"""Slice one large source image into a multi-resolution tile pyramid, the
same technique Google Maps / OpenSeadragon use for "deep zoom": at any
zoom level, the browser only ever loads small 256x256 tiles at a
resolution close to what's actually on screen, so the image stays crisp
whether you're zoomed way out or way in, without ever loading (or
blurrily upscaling) the whole multi-thousand-pixel original at once.

Usage:
    python3 scripts/generate_deep_zoom.py <source_image> <output_dir>

Output:
    <output_dir>/manifest.json
    <output_dir>/<level>/<col>_<row>.jpg   for every level, 0..N-1
"""
import json
import math
import os
import sys

from PIL import Image

TILE_SIZE = 256
JPEG_QUALITY = 82


def generate(src_path, out_dir, tile_size=TILE_SIZE):
    img = Image.open(src_path).convert("RGB")
    native_w, native_h = img.size

    max_dim = max(native_w, native_h)
    num_levels = max(1, math.ceil(math.log2(max(max_dim / tile_size, 1))) + 1)

    level_sizes = []
    for level in range(num_levels):
        scale = 2 ** (level - (num_levels - 1))
        w = max(1, round(native_w * scale))
        h = max(1, round(native_h * scale))
        level_sizes.append((w, h))

    os.makedirs(out_dir, exist_ok=True)
    total_tiles = 0

    for level, (w, h) in enumerate(level_sizes):
        resized = img.resize((w, h), Image.LANCZOS)
        level_dir = os.path.join(out_dir, str(level))
        os.makedirs(level_dir, exist_ok=True)

        cols = math.ceil(w / tile_size)
        rows = math.ceil(h / tile_size)
        for row in range(rows):
            for col in range(cols):
                box = (
                    col * tile_size,
                    row * tile_size,
                    min((col + 1) * tile_size, w),
                    min((row + 1) * tile_size, h),
                )
                tile = resized.crop(box)
                tile.save(
                    os.path.join(level_dir, f"{col}_{row}.jpg"),
                    "JPEG",
                    quality=JPEG_QUALITY,
                    optimize=True,
                )
                total_tiles += 1

        print(f"level {level}: {w}x{h} -> {cols}x{rows} tiles")

    manifest = {
        "tileSize": tile_size,
        "levels": num_levels,
        "nativeWidth": native_w,
        "nativeHeight": native_h,
        "levelSizes": level_sizes,
    }
    with open(os.path.join(out_dir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"done: {num_levels} levels, {total_tiles} tiles -> {out_dir}")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(1)
    generate(sys.argv[1], sys.argv[2])
