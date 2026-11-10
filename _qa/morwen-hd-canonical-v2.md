# MORWEN-HD-CANONICAL-V2 — 公式サイト側の記録（2026-11-10）

ステータス：Draft PR（mainへは未マージ）。ディレクターによる見た目の確認と、Android実機での確認は未実施（NOT_RUN）。

## 変更内容
- 本番のカルーセル（公式設定画・4方向）：**左側面を新しい正本の左向き（`assets/companions/morwen/hd-v2/real/left.png`、SHA-256 `a48ab1bc…645279`）に差し替え**。旧3Vの左向き（`d858c428…`）は参照から外し、ファイルは残している。正面・右側面・背面は変更していない。
- プレビュー専用：URLに `?morwen=hd-v2` を付けたときだけ、カルーセルにHDドット絵4方向の表示用画像（1200×1600）を表示する。付けない場合の表示は上記の本番どおり。
- キャッシュ対策の版番号：`morwen-4v-20261109-2` → `morwen-hd-v2-20261110`
- ファイルの由来：`_tools/provenance/MORWEN_HD_V2.json`

## 登録状況（このリポジトリ内）
- 新規登録 5点：real/left.png、pixel表示用の4点（SHA-256は配布されたMANIFESTと一致）
- 登録済み 1点：portrait.webp（`assets/companions/morwen.webp`と同じSHA-256）
- このリポジトリには追加しないもの 7点：サイトで参照しないため。ゲーム本体のリポジトリに登録している（PR #221）

## QA（Claudeによる自己QA）
- `_tools/qa_site.js`：38 PASS／5 FAIL。FAILの5件（遅延読み込み2件、ナビゲーション2件、SP画像表示 serena/placeholder 1件）は、**変更前のmain 535f1deでも同じ内容で失敗する**。今回の変更による新しいFAILは0件。
- カルーセルの確認（`morwen-hd-v2/carousel_qa_results.json`）：本番表示とプレビュー表示のそれぞれで、PC 1440×900（矢印キー）とスマホ 390×844（スワイプ）を確認。4枚すべての読み込み、5回目で1枚目に戻ること、左側面が新しい正本であること、旧左向きを参照していないこと、HTTPエラーが0件であることを確認。
- 撮影：`morwen-hd-v2/*_slide3_left.png`
