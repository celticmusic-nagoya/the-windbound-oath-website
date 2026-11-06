# COMPANIONS-ART-02-FIX-02

## Director report
Screenshot shows Liam boots clipped by the figure frame, and small white fringe remaining around Bram.

## Fix
- Liam desktop CSS scale reduced from 1.22 to 1.10; origin moved to center bottom to preserve boots. Mobile scale reduced from 1.15 to 1.06.
- Bram: narrow 2px interior alpha boundary cleaned only for neutral bright pixels (min RGB > 194 and channel spread < 42). Nearest non-bright interior colors replace white-contaminated fringe. Alpha softened to <=185 only on affected pixels.
- The existing approved PNG, other portraits, and bios were not modified.
- One-time workflow removed after success.

## Verification
- GitHub Actions [run 42173318908](https://github.com/celticmusic-nagoya/the-windbound-oath-website/actions/runs/42173318908): SUCCESS.
- 2,100 fringe pixels corrected.
- Transparent pixels: 543,078.
- Bram WebP SHA-256: `671141e3970e1eaa39c758e298450a7b22774917359f988ed85f36c66710bac5`.
- Visual desktop/Android QA: NOT_RUN. Director should verify boots, weapon and ribbons clipping, edge halos, and silhouette integrity.
