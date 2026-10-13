# Phase 0 — データモデルと ER 図 (ERD)

**対象範囲：** `/spec` による画面リーフ仕様の策定に**先立ち**、中核データ構造をモデリングすること —— `/overview`、`/surfaces`、`/module`、`/user-flow` と並ぶ Phase 0（全体構想フェーズ）の一角を構成します。

**本ドキュメントの対象外：** 画面レベルの入力項目マッピング（Design フェーズ）· バックエンドの完全な API 契約（Phase 2c `01`）· 物理 DB 向けの SQL マイグレーション。

**マクロワークフローの位置づけ：** [index.md § Phase 0](./index.md#phase-0-data-model) · 設計フェーズへの引き渡し：[design.md § データモデル](./design.md#data-model-two-stages)。

---

## 3 層のデータモデリング分離構造

| レイヤー | タイミング | スキル / 成果物 | 粒度と関心事 |
|---|---|---|---|
| **1 — 全体 ERD** | 新モジュール、新エンティティ/テーブル、所有権変更、クロスモジュール関連 | `/db-erd` → `<LCA>/common/db-erd.md` | エンティティ、リレーション、**主要**属性、所属 `CMP-*` / Surface |
| **2 — 画面バインディング** | 単一の `W-*` / リーフバンドル策定時 | `/spec` → `spec.entities` + `design.sections[].db` | 入力項目/列 ↔ **テーブル名.カラム名**；一覧 `columns[].key` ↔ DB または `#derived-data` 計算項目 |
| **3 — BE API 契約** | 設計仕様の確定後 | `/api-spec` → `01-backend-spec.yaml` | `modules[].entities[]`, `fields[]`, エンドポイント —— バックエンドコード生成の SSOT |

第 1 層は **Phase 0**。第 2 層は **Phase 1 設計**。第 3 層は **Phase 2c**（grill-dev 段階での先行起草も可能）。

---

## 推奨される Phase 0 実行シーケンス

```text
/overview (プロダクトの全体ビジョンと業務領域の定義)
    → /surfaces (具体的なクライアント画面領域の分割)
    → /module (CMP-* モジュールの境界と依存関係の定義)
    → /user-flow (データに関わる FLOW-* 業務ジャーニーの整理)
    → /db-erd (LCA 最近共通祖先スコープでの ER 図作成)
    → (任意) /cross-service (外部サービス連携や集約処理がある場合)
```

---

## `/db-erd` の実行が必須となる条件

- **新規**モジュール/クラスタの追加、または共通の**テーブル/エンティティ**の導入時。
- **カーディナリティ**（1対多、多対多）や**所有権境界**（マルチテナント、DDD 集約ルート）を変更する場合。
- レガシー移行：旧システムのスキーマを新システムのビジネスエンティティへマッピングする場合 (`/legacy /db-erd`)。

**スキップ可能なケース：** 既存の安定した `db-erd.md` を持つ CMP 内での画面修正であり、**新しい永続化テーブルやカラムを導入しない**場合（純粋な UI、バリデーション、文言修正のみ）。

---

## `db-erd.md` の最低限の記述要件

- 標準的な Mermaid `erDiagram` を含むこと。
- 各エンティティについて：業務名、**所有モジュール/Surface**、論理主キー、主要属性を明記すること。
- リレーションの多重度、および業務上重要な場合は物理/論理削除の扱いを記載すること。
- これを利用する `FLOW-*` / `CMP-*` へのリンクを明記すること —— **各画面バンドル内に全体 ER 図を重複コピーすることは厳禁**です。

---

## 設計フェーズ (`/spec`) への引き渡し

AI Agent は、画面バンドルの `db:` 項目を補完する際、LCA パスを上位へ探索して `common/db-erd.md` を**自動参照**します。

リーフバンドル側での記述項目：
1. **`spec.entities` / `spec.relationships`** — 画面に関わるエンティティのサブセット。
2. **`design.sections[].db`** — `schema` (テーブル名または ER 名), `field` (カラム名), 列挙型マッピング `enumMapping`。
3. **`spec.ui.list.columns[].key`** — DB カラムに対応するか、`#derived-data` として明示。
4. **`bind.field`** — Payload / API リクエスト項目名（バックエンド `01` と整合）。

Split 実行後：`entities` とレイアウト関連の `db` は **`ir/design.yaml`** に抽出されます。

---

## 3 つの名前空間の明確な区別

| 概念 | 例 | 責務と記述場所 |
|---|---|---|
| ER エンティティ (図面) | `Customer`, `Order` | `db-erd.md` で定義 |
| 物理テーブル / Schema | `customers`, `orders` | `design.db.schema` および `01` の `table:` で定義 |
| コード生成エンティティ | `CustomerEntity` | `gen.codegen.entity` および OpenAPI 契約で定義 |
