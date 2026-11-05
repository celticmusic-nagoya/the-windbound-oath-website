# THE WINDBOUND OATH — Official Website

Independent official website repository (static HTML / CSS / vanilla JS, no build step).
GitHub Pages publication is **not yet authorized**.

- Source: `celticmusic-nagoya/the-windbound-oath` Draft PR #137, SHA `62c6a07290cc8e6766800ddf80a84c0a4ad9eeda`, directory `site/` (moved to this repository root)
- Game (unchanged, separate repository): https://celticmusic-nagoya.github.io/the-windbound-oath/
- Proposed site URL (not live): https://celticmusic-nagoya.github.io/the-windbound-oath-website/

## Folders
| Path | Published | Role |
|---|---|---|
| `index.html` | yes | 8 sections: HERO / NEWS / STORY / SYSTEM / CHARACTERS / GALLERY / PLAY GAME / FOOTER |
| `css/site.css` | yes | Design tokens + layout |
| `js/site.js` | yes | Menu, news, deferred images, gallery lightbox |
| `data/news.json` | yes | News list — edit this file only |
| `img/` | yes | Approved web derivatives only (lossless WebP / PNG / 1×1 placeholder) |
| `_tools/` | no (Jekyll skips `_` folders) | QA scripts and image provenance (`provenance/IMAGE_REPORT.json`) |
| `_qa/` | no | Migration evidence |

## Update news
Add an item to `data/news.json`: `{ "date": "YYYY-MM-DD", "category": "DEVELOPMENT|ART|FIX", "title": "…", "status": "draft" }`.
Only items with `"status": "published"` are shown on the site. Change `draft` to `published` after director approval.

## Images
Web images are derived from the game repository's approved originals by `_tools/build_images.py`
(run inside the game repository; originals are read-only). Do not add unapproved images here.

## QA
```
python3 -m http.server 8765          # in this repository root
NODE_PATH=$(npm root -g) node _tools/qa_site.js
python3 _tools/qa_contrast.py
```
