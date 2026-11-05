# WEBSITE-SEPARATION-01 — Implementation brief

**Owner:** Claude Code (implementation); Codex (independent QA).  
**State:** migration in progress; no merge or Pages activation.

## Immutable source

- Source repository: `celticmusic-nagoya/the-windbound-oath`
- Draft PR #137, exact source commit: `62c6a07290cc8e6766800ddf80a84c0a4ad9eeda`
- Source directory: `site/`
- Destination: this repository, branch `feature/website-separation-01`, with `site/` contents moved to repository root.
- Original game: https://celticmusic-nagoya.github.io/the-windbound-oath/

## Migration tasks

1. Copy only site runtime files to destination root: `index.html`, `css/`, `js/`, `data/`, and the **approved, actually referenced** `img/` assets. Keep pixel fidelity and asset bytes intact; do not invent, re-render, or approve images.
2. Do **not** copy `img/screenshots/candidates/`, unapproved CG02/CG04/CG05, goblin/raider candidates, local evidence, game assets, or development-only tools into the Pages payload. Do not remove anything from the original repository.
3. Update `PLAY GAME` and all game links from `../` to `https://celticmusic-nagoya.github.io/the-windbound-oath/`. Preserve internal fragment navigation and news data loading.
4. Update absolute OGP and canonical URLs for the **proposed** new URL `https://celticmusic-nagoya.github.io/the-windbound-oath-website/`. Do not claim this is live before publication.
5. Inspect all CSS/JS/HTML/image references and relative URLs. Fix broken paths resulting from `site/` to root relocation. Ensure no external dependency on source PR paths.
6. Add appropriate `.nojekyll` only if validated as the preferred Pages strategy; do not change existing game's Pages configuration.
7. Document site payload size (bytes) and file manifest. Keep deploy content far below 1 GB.
8. Independently QA: desktop 1440, mobile 390/360, landscape 844x390, DPR 1–3, CLS with delayed assets, HTML validation 0 errors/warnings, menu, gallery, news, accessibility, contrast, reduced-motion, game link, image paths, and regressions from source FIX-04.
9. Google Fonts actual network fetch and rendered-font QA remain BLOCKED unless access is permitted to `fonts.googleapis.com` and `fonts.gstatic.com`. Android device QA remains unverified.
10. Keep PR as Draft. No Pages enablement, merge, release, game repo edits, or source PR #137 closure without director approval.

## Reporting

TASK / SHA / STATUS / QA / total published bytes / broken references / Fonts / Android / evidence / approval needed. 300–500 Japanese characters; store detailed logs separately.

**Director's intent:** independent official website, same simple folder-based maintenance as Glendalough, while the RPG remains hosted and unchanged in the original repository.
