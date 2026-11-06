# COMPANIONS-ART-02 — director approval and delivery status

Director-approved artwork (2026-11-06):
- Bram: `assets/companions/bram/master/bram-full-body.png` in game repository, SHA-256 `ba0d08a30738ab0e156c680f3fb3b1c98644fd12528ace991db84515275c869b`, 1024×1536 RGBA.
- Liam: `assets/companions/liam/source/liam_idle.png` in game repository, SHA-256 `0900dc7beddf71939b7e38ec50632ce9b0654ced240f7858548794d3e68cb445`, 1223×1286 RGBA.

The approvals apply to these exact images; they do not approve other source images. Morwen v3.0 and Serena are unchanged.

Delivery requirement: copy approved art into the website repository and serve it locally. No runtime reference to game repository.

A one-time GitHub Actions workflow `.github/workflows/stage-companions-art-02.yml` was added to fetch pinned originals, verify SHA-256, create WebP derivatives, and commit them to this feature branch. It must be confirmed to run successfully and the resulting files inspected before HTML references are added and before merging.

**Current QA gate: BLOCKED until website-local WebP assets exist.** No main merge, no publication until verified.
