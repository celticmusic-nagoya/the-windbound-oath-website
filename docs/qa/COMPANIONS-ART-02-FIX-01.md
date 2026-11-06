# COMPANIONS-ART-02-FIX-01

## Reported
- Liam appears too small compared to Bram on desktop.
- Bram retains a white rectangular background.

## Implemented
- Liam-only CSS scale 1.22 (desktop) and 1.15 (max-width 768px), with figure clipping to its card.
- Bram WebP: removed near-white pixels (RGB channels >= 238) connected to the image border. Original approved PNG and game repo are unchanged.
- Original website-local WebP preserved in Git history.
- One-time workflow removed after success.

## Checks
- GitHub Actions [run 42172758246](https://github.com/celticmusic-nagoya/the-windbound-oath-website/actions/runs/42172758246): PASS.
- Removed white background pixels: 543,078; output transparent pixels: 543,078.
- New Bram WebP SHA-256: `c0b07054112780ef1e6aacf33ce76bbc1c8a0bbc0d0cdf1c2af142e6be8aa91e`.
- Other companion image paths and approved bios untouched.
- Real browser / Android visual QA: NOT_RUN. Confirm silhouette, edge halos, isolated white gaps, Liam scale, and mobile clipping after publication.

## Caveat
This is a color-based cleanup, not a human-verified segmentation. White pixels not connected to the border are retained, and near-white details touching the backdrop may be affected. Director visual QA is required; do not claim pixel-perfect isolation.
