#!/usr/bin/env python3
"""Render the Vyralnet horizon as a seamless full-phone background video."""

from __future__ import annotations

import math
import subprocess
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/assets/welcome/horizon-reference.png"
OUTPUT = ROOT / "public/assets/welcome/welcome-horizon-fullscreen.mp4"
POSTER = ROOT / "public/assets/welcome/welcome-horizon-fullscreen.jpg"

WIDTH = 720
HEIGHT = 1560
FPS = 24
DURATION = 12
FRAME_COUNT = FPS * DURATION
HORIZON_TOP = round(HEIGHT * 0.4143)
HORIZON_HEIGHT = round(WIDTH * 220 / 509)

RING = (
    (0.00, (85, 124, 53)),
    (0.12, (141, 198, 63)),
    (0.27, (200, 226, 158)),
    (0.39, (186, 141, 177)),
    (0.47, (215, 129, 213)),
    (0.56, (237, 143, 176)),
    (0.64, (247, 163, 94)),
    (0.72, (252, 195, 82)),
    (0.84, (230, 185, 79)),
    (1.00, (85, 124, 53)),
)


def smoothstep(edge0: float, edge1: float, value: float) -> float:
    value = max(0.0, min(1.0, (value - edge0) / (edge1 - edge0)))
    return value * value * (3.0 - 2.0 * value)


def ring_color(position: float) -> tuple[int, int, int]:
    position %= 1.0
    for (start, color_a), (end, color_b) in zip(RING, RING[1:]):
        if position <= end:
            amount = smoothstep(start, end, position)
            return tuple(round(a + (b - a) * amount) for a, b in zip(color_a, color_b))
    return RING[-1][1]


def make_signal(source: Image.Image) -> tuple[Image.Image, Image.Image]:
    luminance = ImageOps.grayscale(source)
    pixels = luminance.load()
    signal = Image.new("L", source.size, 0)
    signal_pixels = signal.load()
    core = Image.new("L", source.size, 0)
    core_pixels = core.load()
    feather = max(1, round(source.height * 0.15))

    for y in range(source.height):
        edge = min(y / feather, (source.height - 1 - y) / feather)
        vertical = smoothstep(0.0, 1.0, edge)
        for x in range(source.width):
            light = pixels[x, y] / 255.0
            organic = smoothstep(0.05, 0.16, light)
            cleaned = max(0.0, light - 0.008) * organic * vertical
            signal_pixels[x, y] = round(min(1.0, cleaned) * 255)
            core_pixels[x, y] = round(smoothstep(0.70, 0.99, light) * 92 * vertical)

    return signal, core


def gradient_frame(phase: float) -> Image.Image:
    row = Image.new("RGB", (WIDTH, 1))
    row.putdata([
        ring_color(0.12 + (x / max(1, WIDTH - 1)) * 0.60 - phase)
        for x in range(WIDTH)
    ])
    return row.resize((WIDTH, HORIZON_HEIGHT))


def render_frame(signal: Image.Image, core: Image.Image, index: int) -> Image.Image:
    phase = index / FRAME_COUNT
    gradient = gradient_frame(phase)
    signal_rgb = Image.merge("RGB", (signal, signal, signal))
    colored = ImageChops.multiply(gradient, signal_rgb)

    # Preserve the reference's hot, crisp rim without turning the whole arc
    # into a uniform white tube.
    core_rgb = Image.merge("RGB", (core, core, core))
    colored = ImageChops.screen(colored, core_rgb)

    # A restrained, local shimmer makes the ring feel alive while the full
    # color loop continues steadily to the right.
    shimmer = 1.0 + 0.025 * math.sin(index * math.tau / (FPS * 1.7))
    colored = ImageEnhance.Brightness(colored).enhance(shimmer)

    frame = Image.new("RGB", (WIDTH, HEIGHT), "black")
    frame.paste(colored, (0, HORIZON_TOP))
    return frame


def main() -> None:
    source = Image.open(SOURCE).convert("RGB").resize(
        (WIDTH, HORIZON_HEIGHT), Image.Resampling.LANCZOS
    )
    signal, core = make_signal(source)
    first_frame = render_frame(signal, core, 0)
    first_frame.save(POSTER, quality=94, subsampling=0, optimize=True)

    command = [
        "/opt/homebrew/bin/ffmpeg",
        "-y",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pixel_format",
        "rgb24",
        "-video_size",
        f"{WIDTH}x{HEIGHT}",
        "-framerate",
        str(FPS),
        "-i",
        "-",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "slow",
        "-crf",
        "18",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(OUTPUT),
    ]

    process = subprocess.Popen(command, stdin=subprocess.PIPE)
    assert process.stdin is not None
    for index in range(FRAME_COUNT):
        process.stdin.write(render_frame(signal, core, index).tobytes())
    process.stdin.close()
    if process.wait() != 0:
        raise SystemExit("ffmpeg failed while rendering the welcome background")


if __name__ == "__main__":
    main()
