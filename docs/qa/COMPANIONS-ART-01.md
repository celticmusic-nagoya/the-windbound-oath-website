# COMPANIONS-ART-01 — Independent QA (2026-11-06)

## Scope
Draft PR #7, Morwen v3.0 and Serena approved WebP artwork in COMPANIONS cards.

## Static checks
- PASS: Source Git tree at commit `892505cf5443f7b6af05b7e4c7bebf94b0916a17` contains `web/companions/morwen.webp` and `web/companions/serena.webp`.
- PASS: PR #7 references those exact two paths at the immutable source commit.
- PASS: Only Morwen and Serena receive `companion-card__figure` markup (2 figures across 4 cards).
- PASS: Liam and Bram remain text-only, pending visual approval.
- PASS: Existing approved companion biography text is not modified in the PR diff.
- PASS: Images have Japanese alt text, `loading="lazy"`, `decoding="async"`, dimensions, and `object-fit:contain`.
- PASS: CSS has a single-column layout at max-width 768px.
- PASS: PR #7 is Draft and mergeable as reported by GitHub.

## BLOCKED / unresolved
- **BLOCKED: live image HTTP response**. The current QA environment could not resolve raw.githubusercontent.com; the image files' existence in the Git tree does not establish successful browser loading.
- **BLOCKED: visual QA**. No browser screenshot or Android device inspection performed; cannot claim 390px layout, CLS, or overflow pass.
- **RECOMMENDED BEFORE MERGE**: copy the two WebP files byte-identically into the website repo (e.g. `assets/companions/morwen.webp`, `assets/companions/serena.webp`) and use relative paths. This requires a binary-capable workflow such as Codex; the current GitHub text-file connector cannot safely copy binary content.
- Confirm asset bytes and dimensions against source, then run 390px/desktop visual QA and Android check.

## Gate
**NOT READY FOR MERGE** until the above blockers are resolved. Do not change main or publish.

## Follow-up: website-local assets (2026-11-06)
- PASS: Two WebP files were copied byte-identically to `assets/companions/` in the website repository using Git blobs.
- PASS: Git blob SHA source == destination: Morwen `391665bbfdf384a4b7df956487c0c5464038152d`; Serena `065f0f0d87d2726ea356b187c31075a52ad5bafb`. This confirms byte-for-byte identity (Git blob SHA-1), not a separate SHA-256 computation.
- PASS: Both HTML `src` values use relative website-local paths; no raw.githubusercontent.com dependency remains for companion art.
- PASS: Two approved portraits only; Liam/Bram remain text-only.
- PENDING USER QA: browser image rendering, desktop/390px/Android layout, overflow, CLS, image proportions.
- RELEASE DECISION: Director has authorized ChatGPT to merge and perform direct post-merge QA; user will conduct visual QA on the published site. No claim of visual PASS is made.
