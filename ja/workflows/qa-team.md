# ワークフロー — QA 未決課題インボックス (QA Inbox)

**1 つの課題 = 1 つのファイル。** ファイル名は **QA コード番号** と完全に一致します（課題のライフサイクルを通じて不変）。

**QA コードの命名規則：** `{画面またはモジュールの略称}_{4桁連番}` —— プレフィックスごとに連番をインクリメント（`0001`, `0002`…）。

| 画面の例 | 推奨略称 | 生成ファイル名 |
|---|---|---|
| `W-HOTEL-LIST` | `HOTEL-LIST` | `qa/HOTEL-LIST_0001.yaml` |
| `cmp-adm-ord-01-02-01-02` | `ADM-AUTH` (チーム合意のスラッグ) | `qa/ADM-AUTH_0001.yaml` |

初期の FlowGrid ワークスペースで利用されていた `QA-<page-id>-NNNN` 形式も引き続き認識されますが、新規作成時は短いスラッグを推奨します。

---

## インボックスのディレクトリ構造

```text
qa/
  HOTEL-LIST_0001.yaml    # 単一情報源 (SSOT) — 完全な対話決定ログ + 対象仕様パス
  ADM-AUTH_0002.yaml
  index.md                # 一覧目録のみ (レンダリング表示) — 状態 + リンク + 最新ログ
```

`qa/open` や `qa/resolved` などのサブディレクトリ分割、複雑な差分ファイルチェーンの作成、同一課題に対する複数ファイルの作成は**厳禁**です。

---

## ファイルデータ構造 (SSOT)

タイムスタンプ順の追記型配列 **`updates[]`** —— **イベント発生ごとに 1 件ずつ追記**（過去の履歴行の編集や削除は禁止）：

```yaml
schema: flowgrid-qa-item/v1
id: HOTEL-LIST_0001
screen: W-HOTEL-LIST
status: open          # open (未解決) | closed (解決済)
target:
  path: surfaces/.../hotel-list.bundle.yaml
  at: design.zones.filter.timezone
updates:
  - at: "20260930 08:00"
    by: middle-dev
    kind: question
    text: |
      タイムゾーンのフィルター条件は、ホテルのプロパティ設定とユーザーの端末設定のどちらを基準にすべきですか？
  - at: "20260930 10:00"
    by: ba-lead
    kind: answer
    text: |
      プロパティのタイムゾーンを基準とします。画面上には UTC+7 のラベルを表示してください。
  - at: "20261001 08:00"
    by: senior
    kind: review
    text: |
      needs-change: プロパティにタイムゾーンが未設定の場合の受入基準 (AC) を追加してください。
```

**タイムスタンプ `at` の形式：** `YYYYMMDD HH:mm`（チーム規約）または ISO 8601 —— ワークスペース内で統一します。

| `kind` 種別 | 担当者 / 記録タイミング |
|---|---|
| `question` | QA 課題の起票時（技術的負債として記録 / AskQuestion 確定時） |
| `answer` | 意思決定の確定時 —— 仕様バンドルの更新を伴う (`/qa-resolve`) |
| `review` | シニアやリードによるレビュー指摘；本文に `needs-change` が含まれる場合は `status: open` に再設定 |
| `note` | 仕様変更を伴わない情報補足や備考 |

**`needs-change` の運用フロー：** 新規ファイルを起こさず、`kind: review`（または `note`）を**末尾に追記** → `status: open` に変更 → エンジニアが仕様を反映した後に `answer` を追記してクローズします。

---

## `qa/index.md` 一覧インデックス

テーブル形式による全課題の概要表示（レンダリング用）：

| ID | ステータス Status | 対象画面 Screen | 最終更新日時 Last Updated | 概要サマリー Summary |
|---|---|---|---|---|

真の SSOT 実体は YAML ファイル内にあり、`index.md` に生のログ本文を重複コピーすることはありません。

---

## 関連スキル

| スキル | アクション |
|---|---|
| QA 起票 | `qa/{CODE}_NNNN.yaml` を作成し、最初の `updates[0]` を `kind: question` で記録 |
| `/qa-resolve` | `answer` を追記し、Bundle/01 の対象フィールドを更新して `status: closed` に設定 |
| `/qa-review` | `kind: review` を追記（この段階ではバンドルは直接変更しない） |

---

## 個人開発 vs チーム開発

| 観点 | ソロ開発 ＋ AI | チーム開発 |
|---|---|---|
| ファイル構成 | 課題ごとに 1 ファイル | 同左 —— レビュー担当者が `updates[]` 履歴を確認 |
| 追跡・監査 | 上から順にログを閲覧 | Git blame とタイムライン監査を活用 |
| インデックス | 必要に応じて閲覧 | リード向けの統合進捗ダッシュボードとして活用 |
