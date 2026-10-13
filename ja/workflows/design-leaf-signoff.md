# 設計リーフ — サインオフ基準 (Design Sign-off)

**対象範囲：** テストレーンへの引き渡しや本番コード自動生成の**前**における、個別の機能リーフ（`surfaces/<surface>/CMP-*/<NN…>/<slug>.bundle.yaml`）に対する人間のサインオフ基準。

**エンジンの自動ブロックではありません** —— エンジニアが [design.md](./design.md) および各種 Grill スキルを完了した後、テックリードや BA が内容を確認して承認します。チャット上での口頭の「完了しました」は、本チェックリストの代替にはなりません。

**関連ドキュメント：** [gates.md](./gates.md) · [grill-and-human-review.md](./grill-and-human-review.md) · 構造監査コマンド `flowgrid audit spec`。

---

## 適用タイミング

- 単一の `W-*` / 画面リーフノードの設計をクローズするとき。
- `/testcase` によるテスト作成、バックエンド `/api-spec`、フロントエンド `/prototype` へ引き渡すとき。
- チーム内で SSOT の品質スコア（十分な追跡性、コード生成の準備、BA にとっての可読性）を確認するとき。

---

## 6 つの判定基準 (全項目合格が必須)

| # | 評価項目 | 検証基準 |
|---|---|---|
| 1 | **構造監査** | `flowgrid audit spec <bundle> --type <profile>` で未処理の `gaps[]` がゼロであること；`confirms[]` が解決または `qa` に起票されていること。 |
| 2 | **業務可読性** | **VitePress** 上の `ir/generated/spec.md`（DB がある場合は `data-model.md`）において、ストーリー、**一覧テーブルの項目定義**、シナリオ、AC がプレースホルダーでなく意味のある内容で記述されていること。 |
| 3 | **UI ↔ ストーリー追跡** | 2〜3 個のシナリオをサンプリング照合し、ユーザー操作が `design.actions` / `design.sections`（受渡境界やエラーメッセージ）と整合していること。 |
| 4 | **API 契約の一致** | `api/<seq>/01-backend-spec.yaml` が `ir/design.yaml` の `apiRef` と一致していること；バックエンドがスコープ内の場合、`flowgrid audit fe-be` にブロッカーがないこと。 |
| 5 | **コード生成準備** | `grillStatus.dev: done` であること；フロントエンドの `flowgrid gen:dry` ドライランが通過し、`gen.codegen` および開発タグが記録されていること。 |
| 6 | **QA インボックス** | `qa` 内の未決事項が解消または合意済み負債のみであり、バンドル内に隠された勝手な未解決事項がないこと。 |

### 推奨確認項目 (非ブロッキング)

| # | 評価項目 | 検証基準 |
|---|---|---|
| 7 | **データモデル** | LCA の `db-erd.md` が閲覧可能であること；永続化される入力項目に `db.schema`/`db.field` が定義されていること；一覧の計算項目に `#derived-data` が付与されていること。詳細は [architecture-data.md](./architecture-data.md)。 |

- テストレーンに入る前に、`/grill-prototype` で画面・文言・モック境界の SSOT 乖離がないこと。
- フロントエンド側で `registry:sync` が完了し、DSL タグが `design.registry.json` と整合していること。

---

## サインオフの記録方法 (手動)

バンドルファイル内または PR 説明欄に 1 行のログを残すことを推奨します：

```text
Design sign-off: <page-id> | reviewer: <氏名> | date: YYYY-MM-DD | rubric: 6/6
```

エンジンによる厳格な順序束縛を避けるため、YAML の必須フィールドとはしていません。
