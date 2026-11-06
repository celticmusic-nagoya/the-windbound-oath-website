# THE WINDBOUND OATH — Official Website

Independent official website repository (static HTML / CSS / vanilla JS, no build step).
GitHub Pages is published. Routine website-only improvements are pre-approved for ChatGPT implementation, self-QA, and merge; the director performs visual/device QA. Major redesigns, canon changes, spoilers, and destructive changes require explicit consultation. Codex/Claude review is not part of the website workflow.

- Source: `celticmusic-nagoya/the-windbound-oath` Draft PR #137, SHA `62c6a07290cc8e6766800ddf80a84c0a4ad9eeda`, directory `site/` (moved to this repository root)
- Game (unchanged, separate repository): https://celticmusic-nagoya.github.io/the-windbound-oath/
- Official site URL: https://celticmusic-nagoya.github.io/the-windbound-oath-website/

## Folders
| Path | Published | Role |
|---|---|---|
| `index.html` | yes | 8 sections: HERO / NEWS / STORY / SYSTEM / CHARACTERS / GALLERY / PLAY GAME / FOOTER |
| `css/site.css` | yes | Design tokens + layout |
| `js/site.js` | yes | Menu, news, deferred images, gallery lightbox |
| `data/news.json` | yes | News list — edit this file only |
| `img/` | yes | Approved web derivatives only (lossless WebP / PNG / 1×1 placeholder) |
| `_tools/` | no (Jekyll skips `_` folders) | QA scripts and image provenance (`provenance/IMAGE_REPORT.json`) |
| `_qa/` | no | Migration evidence, migration brief (`_qa/MIGRATION_BRIEF.md`) |
| `_drafts-news/` | no | Draft news (`news.json`) awaiting director approval |

## Update news
- Public file: `data/news.json` — contains **only director-approved items**. It is `{"items": []}` until something is approved.
- Drafts: `_drafts-news/news.json` (not published). Write new items here first with `"status": "draft"`.
- To publish an approved item: copy it from `_drafts-news/news.json` into `data/news.json` and set `"status": "published"`.
  Item format: `{ "date": "YYYY-MM-DD", "category": "DEVELOPMENT|ART|FIX", "title": "…", "status": "published" }`.
- `js/site.js` additionally shows only `status: "published"` items, but drafts must never be placed in `data/news.json`: everything in that file is downloadable once published.

## Publishing method (important)
GitHub Pages builds this repository with its default Jekyll build. Jekyll does not publish files or folders whose names start with `_` or `.`,
which is why `_qa/`, `_tools/` and `_drafts-news/` stay private on the site (they are still visible in the GitHub repository itself).
**Do not switch to a non-Jekyll deployment** (adding `.nojekyll`, a custom Actions deploy of the whole tree, another static host) without first moving
`_qa/`, `_tools/` and `_drafts-news/` out of the deployed files — otherwise they would be published.
`.github/workflows/publish-precheck.yml` runs the same Jekyll build on pushes to the work branch and checks the output; it never deploys.

## Images
Web images are derived from the game repository's approved originals by `_tools/build_images.py`
(run inside the game repository; originals are read-only). Do not add unapproved images here.

## QA
```
python3 -m http.server 8765          # in this repository root
NODE_PATH=$(npm root -g) node _tools/qa_site.js
python3 _tools/qa_contrast.py
```
