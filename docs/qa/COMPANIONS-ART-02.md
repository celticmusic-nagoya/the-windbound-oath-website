# COMPANIONS-ART-02 — director approval and delivery status

Director-approved artwork (2026-11-06):
- Bram: `assets/companions/bram/master/bram-full-body.png` in game repository, SHA-256 `ba0d08a30738ab0e156c680f3fb3b1c98644fd12528ace991db84515275c869b`, 1024×1536 RGBA.
- Liam: `assets/companions/liam/source/liam_idle.png` in game repository, SHA-256 `0900dc7beddf71939b7e38ec50632ce9b0654ced240f7858548794d3e68cb445`, 1223×1286 RGBA.

The approvals apply to these exact images; they do not approve other source images. Morwen v3.0 and Serena are unchanged.

Delivery requirement: copy approved art into the website repository and serve it locally. No runtime reference to game repository.

A one-time GitHub Actions workflow `.github/workflows/stage-companions-art-02.yml` was added to fetch pinned originals, verify SHA-256, create WebP derivatives, and commit them to this feature branch. It must be confirmed to run successfully and the resulting files inspected before HTML references are added and before merging.

**Current QA gate: BLOCKED until website-local WebP assets exist.** No main merge, no publication until verified.

## Final implementation / static QA
- GitHub Actions run [42172153092](https://github.com/celticmusic-nagoya/the-windbound-oath-website/actions/runs/42172153092): SUCCESS. Original SHA-256 verified before conversion.
- Bram original: SHA-256 `ba0d08a30738ab0e156c680f3fb3b1c98644fd12528ace991db84515275c869b`, 1024×1536; generated WebP SHA-256 `de5a2af933a06a1e04d8f635bb474acf399f142ce691b1f2a43e17332b97ab28`, 373072 bytes.
- Liam original: SHA-256 `0900dc7beddf71939b7e38ec50632ce9b0654ced240f7858548794d3e68cb445`, 1223×1286; generated WebP SHA-256 `589d5178fc9f428eb948e209d0ff778dbf1a5c96f4d30a0597ddfdfdebbd17c9`, 434170 bytes.
- Website-local files: `assets/companions/bram.webp`, `assets/companions/liam.webp` present in feature branch.
- HTML uses website-local relative URLs with descriptive alt text, intrinsic dimensions, lazy loading, async decoding.
- Existing Morwen and Serena artwork and all companion biographies unchanged.
- One-time staging workflow removed after success.
- Browser/Android visual QA: **NOT_RUN**, director to verify after merge. Static checks are not a substitute for device QA.
