# Skill: `/architecture`

## スキル名 (Name)
`architecture`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/architecture`
- Executed in Phase 0 to establish system architecture documentation.

## 入力 (Input)
- Technical stack specifications, deployment infrastructure, architectural constraints.

## 出力 (Output)
- Arc42-aligned documentation under `architecture/`:
  - `01-context-and-scope.md`
  - `02-architecture-constraints.md`
  - `03-system-scope-and-context.md`
  - `04-solution-strategy.md`
  - `05-building-block-view.md`
  - `06-runtime-view.md`
  - `07-deployment-view.md`
  - `08-crosscutting-concepts.md`
  - `09-architectural-decisions.md`
  - `10-quality-requirements.md`
  - `11-risks/risk-register.md`

## 説明・役割 (Description)
- 国際標準 Arc42 フレームワークに準拠し、Phase 0 においてシステム全体の技術アーキテクチャ設計書（12 の専門セクションおよびデータモデル）を策定。
## 関連スキル (Related Skills)
- **Paired with:** `/architecture-grill` for technical critique and validation.

---

## プロンプト実行例 (Example Prompt)

```text
/architecture

Generate Arc42 system architecture documentation for microservices platform with NestJS backend, Nuxt frontend, PostgreSQL, and Redis caching.
```

