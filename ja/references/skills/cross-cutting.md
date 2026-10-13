# Skill: `/cross-cutting`

## スキル名 (Name)
`cross-cutting`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/cross-cutting`
- Used to document system-wide non-functional concepts in Phase 0 / Phase 4 (`architecture/08-crosscutting-concepts.md`).

## 入力 (Input)
- System requirements for logging, audit trails, multi-tenant isolation, caching, and rate-limiting.

## 出力 (Output)
- Cross-cutting concept specifications and architectural middleware definitions.

## 説明・役割 (Description)
- 全社・全モジュール共通の横断的関心事を管理：認証・認可基盤、分散トレーシング、セキュリティ基準、エラーコード体系、設定暗号化。
---

## プロンプト実行例 (Example Prompt)

```text
/cross-cutting

Specify structured logging format with X-Correlation-ID tracing, JWT tenant claim extraction, and Redis rate limiting.
```

