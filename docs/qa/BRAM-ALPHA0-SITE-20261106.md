# BRAM-ALPHA0 — website asset replacement

Director approved new alpha-0 PNG and requested both website and game master replacement.

- Official source: game repository merge commit `9be04bdf1b8b89c4ee3bc9a84ac0968bd89cd4ed`, `assets/companions/bram/master/bram-full-body.png`.
- Official PNG SHA-256: `d22fa6d79f10ed01fefb7b8b4bd6cd362f4e7a42dfa80f3d12e6c1d34ec0e9bf`.
- GitHub Actions [run 42174330806](https://github.com/celticmusic-nagoya/the-windbound-oath-website/actions/runs/42174330806): SUCCESS.
- Website-local asset replaced: `assets/companions/bram.webp`; generated from approved PNG with RGBA and transparent pixels preserved.
- Existing HTML `src="assets/companions/bram.webp"` requires no change.
- Previous site WebP recoverable via Git history. No cross-repository runtime image references.
- Liam boot clipping previously confirmed resolved by director; Liam asset/CSS untouched.
- Desktop/mobile visual QA of new Bram art: NOT_RUN, director to confirm after merge.
