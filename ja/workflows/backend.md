# 開発ワークフロー — Backend バックエンド開発レーン

**SSOT 適用範囲：** **バックエンド開発レーン (Backend Lane)** ——API 契約ファイル（`01-backend-spec.yaml`）、OpenAPI 生成、API レビュー (`/grill-api-spec`)、バックエンドコード生成、単体テスト、およびフロントエンドとの契約整合性監査。

**マクロ構成：** [index.md](./index.md) · Phase 2 実装フェーズ · 実 API 結合：[wire.md](./wire.md)。

---

## 1. バックエンド開発コアサイクル (Phase 2c)

```mermaid
flowchart TD
  subgraph IN["インプット"]
    PORT["フロントエンド起点\nir/design.yaml + apiRef"]
    ONLY["純粋バックエンドサービス / 外部連携\n画面なし"]
  end

  subgraph CONTRACT["ドキュメントハブ — API 契約"]
    AS["/api-spec (API 契約の策定)"]
    O1["01-backend-spec.yaml"]
    O2["02-openapi.yaml スニペット · Mock"]
    REN["flowgrid render\nAPI ドキュメント生成"]
  end

  subgraph GRILL["レビュー ＆ 品質ゲート"]
    GAS["/grill-api-spec"]
    AUD["audit api · audit fe-be\napi:check · openapi 統合"]
    APR{"レビュー ＆ 監査クリア？"}
  end

  subgraph CODE["バックエンドリポジトリ"]
    DRY["api-gen:dry (生成ドライラン)"]
    GEN["/api · api-gen (コード生成)"]
    UNIT["api-unit-gen · /unit (単体テスト)"]
    AUDIT["/audit-api (実装整合性監査)"]
  end

  OUT["Phase 3 /wire 結合へ引渡し"]
  US["/api-update (契約更新)"]

  PORT --> AS
  ONLY --> AS
  AS --> O1 --> O2 --> REN --> GAS --> AUD --> APR
  APR -->|不備あり| US --> GAS
  APR -->|承認| DRY --> GEN --> UNIT --> AUDIT --> OUT
  PORT -.->|画面仕様変更| US
  GEN -.->|実装乖離| US

  classDef entry fill:#FEF3C7,stroke:#B45309,color:#78350F
  classDef contract fill:#FDE68A,stroke:#D97706,color:#92400E
  classDef grill fill:#FFEDD5,stroke:#EA580C,color:#9A3412
  classDef code fill:#FED7AA,stroke:#C2410C,color:#7C2D12
  classDef gap fill:#FECDD3,stroke:#BE123C,color:#881337
  classDef out fill:#E0E7FF,stroke:#4338CA,color:#312E81

  class PORT,ONLY entry
  class AS,O1,O2,REN contract
  class GAS,AUD,APR grill
  class DRY,GEN,UNIT,AUDIT code
  class US gap
  class OUT out
```

---

## 2. バックエンド開発の標準ステップ

1. **API 契約の策定 (`/api-spec`):**
   - `api/<seq>/01-backend-spec.yaml` にエンドポイント、HTTP メソッド、リクエスト DTO バリデーション、レスポンス構造を定義。
2. **API 契約のレビュー (`/grill-api-spec`):**
   - 未処理の例外ステータス（400/409/422）、アクセス制御脆弱性（IDOR）、インデックス設計、冪等性を精査。
3. **妥当性検証と OpenAPI ドキュメントレンダリング:**
   - `flowgrid api:check` でスキーマを機械検証。
   - `flowgrid openapi_gen` および `flowgrid openapi_render` を実行して Swagger 定義を出力。
4. **バックエンドコードの自動生成 (`flowgrid api-gen`):**
   - 技術スタック（NestJS, Laravel, FastAPI, .NET）に応じた Controller、Service、DTO、ORM 雛形を一括生成。
5. **単体テストコードの生成 (`flowgrid api-unit-gen`):**
   - Pytest, PHPUnit, Vitest などの単体テスト雛形を自動作成。
6. **整合性監査 (`/audit-api` および `flowgrid audit fe-be`):**
   - 実装コードが `01-backend-spec.yaml` と完全に一致していることを確定的に検証。
