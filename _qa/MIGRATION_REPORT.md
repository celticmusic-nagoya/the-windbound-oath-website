# WEBSITE-SEPARATION-02 移植記録（Claude自己QA）

- 移植元: `celticmusic-nagoya/the-windbound-oath` PR #137 `62c6a07290cc8e6766800ddf80a84c0a4ad9eeda` の `site/`（`git archive` で取得）
- 移植先: 本リポジトリ `feature/website-separation-01` のルート

## 移植したもの
- `index.html`、`css/`、`js/`、`data/news.json`、HTML/CSS/JSが実際に参照する画像38件（`img/`）
- 画像・CSS・JS・dataは移植元とSHA-256が一致（バイト単位で同一）。`index.html` だけ下記のURLを変更
- `_tools/`（公開対象外）: QAスクリプト、`build_images.py`、画像の由来記録（IMAGE_REPORT / FORMAT_COMPARISON）

## 移植しなかったもの
- `img/screenshots/candidates/`（C1〜C4、未承認）、CG02/CG04/CG05・ゴブリン・レイダー（元々 `site/` に存在しない）、QA証跡（`docs/qa/_evidence/`）、ゲーム素材

## URLの変更（index.html）
- PLAY GAME 3か所: `../` → `https://celticmusic-nagoya.github.io/the-windbound-oath/`
- og:image: 新URL案 `https://celticmusic-nagoya.github.io/the-windbound-oath-website/img/hero/bg-landscape.webp`
- 追加: `og:url`、`link rel="canonical"`（新URL案。未公開）
- ページ内リンク（#news など）、`data/news.json` の読み込み、favicon は相対パスのまま

## Pages方式
`.nojekyll` は追加しない。GitHub Pages既定のJekyllは `_` 始まりのフォルダを公開しないため、`_tools/`・`_qa/` を同じリポジトリに置いたまま公開物から外せる（ゲームリポジトリと同じ方式）。Jekyll 3.10.0 の EntryFilter で再現し、公開44件・非公開6件（`_tools/`・`_qa/`・dotfile）を確認。

## 公開物
44ファイル / 31,180,274 bytes（`payload_manifest.txt`。README.md・MIGRATION_BRIEF.md を含む）

## QA（エミュレーション。Google Fonts遮断）
- 参照切れ: 内部参照46件すべて200、壊れた参照0
- qa_site.js 42 PASS / 0 FAIL（1440/1280/1024/768/390/360の横スクロール、844×390、HERO重なり、メニュー、sizes 54条件、ライトボックス、キーボード、reduced-motion、JS無効、ゲームリンク）
- コントラスト 30 PASS / 0 FAIL
- CLS（7画面×DPR1〜3）: 遅延なし／ロゴ1.2秒遅延／全画像1.2秒遅延 すべて0
- HTML: ローカルNu 20.6.30 で旧版特有の誤検出3件のみ（移植元と同じ）。0エラー/0警告の確定はCodexの最新版で
- ゲームリポジトリ: 変更なし（作業ツリー差分0、PR #137 HEAD `62c6a07` のまま）。ゲームはタイトル→エイダンの家まで起動確認
- BLOCKED: Google Fontsの実適用、Android実機
