# 旧データの棚卸し（WEBSITE-SEPARATION-02、2026-11-05）

**棚卸しのみ。何も削除・変更していない。** 実際の削除は新サイト公開後、個別のディレクター承認を受けてから行う。

## 1. 旧ゲームリポジトリ `celticmusic-nagoya/the-windbound-oath`
旧サイト関連のデータは **Draft PR #137 のブランチ `feature/website-rebuild-01`（HEAD `62c6a07290cc8e6766800ddf80a84c0a4ad9eeda`）にだけ存在** し、main（現在 `6e28466`）には1ファイルも入っていない。現在の公開ゲーム（Pages）には含まれていない。

| 整理候補 | ブランチ上のファイル数 | 容量（blob合計） | mainへの混入 | 新リポジトリへの移植 |
|---|---|---|---|---|
| `site/` | 57 | 37,162,997 B | なし | 実行ファイルと参照画像の41件は移植済み（SHA一致）。未移植は候補スクリーンショット8件・画像レポート2件・ツール類（`_tools/` に移植） |
| `docs/qa/_evidence/website-rebuild-01/` | 42 | 28,479,672 B | なし | 未移植（旧サイト専用のQA証跡） |
| `docs/qa/WEBSITE-REBUILD-01_CODEX_QA_BRIEF.md` / `…_PAGES_EXCLUSION_PROPOSAL.md` | 2 | 9,279 B | なし | 未移植 |
| PR #137（Draft）とブランチ `feature/website-rebuild-01` | — | — | — | — |

- 整理方法の案（承認後）: PR #137 を「新リポジトリへ移行済み」として**マージせずにクローズ**し、ブランチは保持または削除。mainは無変更のまま。候補スクリーンショットC1〜C4（未承認・採用候補）は、削除前に保管先を決める
- 対象外（変更・削除しない）: 他のゲームファイル、AGENTS.md、ゲーム設定、他のPR・ブランチ

## 2. 退避ブランチ
- URL: https://github.com/celticmusic-nagoya/the-windbound-oath-handoff/tree/backup/website-separation-02
- 先端: `4873750545e7ce9909a2b2577ca9c624d66d423e` ＝ 新リポジトリ PR #1 の旧HEADと同一コミット（親は新リポジトリの `28f3e33`）
- 固有の内容: **なし**（全内容が新リポジトリ `feature/website-separation-01` の履歴に含まれる）。復元の必要もない
- 扱い: ディレクター指示により**削除保留**
