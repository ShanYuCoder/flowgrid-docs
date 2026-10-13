# Phase 0 — セットアップ ＆ プロジェクト初期構築

本文書は、`flowgrid setup` コマンドを用いた環境初期化（Phase 0）の具体的手順と、**3 つの典型的な実戦開発シナリオ**における標準プロセスを解説します：
1. **Greenfield（完全新規開発）：** ゼロから新しいプロダクトを立ち上げる場合。
2. **Maintain（既存保守改修）：** 既存コードベースを継続的に開発・保守する場合。
3. **Rebase / Modernization（システム刷新・リプレイス）：** レガシーシステムを刷新し新技術へ移行する場合。

---

## Phase 0 意思決定フローチャート

```mermaid
flowchart TD
  START(["開始: flowgrid setup [workspace]"]) --> CHOICE{"プロジェクトの種別？"}

  %% 分岐 1: Greenfield
  CHOICE -->|1. Greenfield<br/>(完全新規プロダクト)| GF_DOCS["ビジョン、アーキテクチャ記述<br/>Surfaces 構成を定義"]
  GF_DOCS --> GF_REPO["source-code/ 配下に<br/>新規リポジトリを作成"]
  GF_REPO --> GF_INIT["/init を実行<br/>(リポジトリと端をマッピング)"]
  GF_INIT --> NEXT_PHASE

  %% 分岐 2: Maintain
  CHOICE -->|2. Maintain<br/>(既存コード保守)| MT_REPO["既存リポジトリを<br/>source-code/ 配下に配置"]
  MT_REPO --> MT_INIT["/init を実行<br/>(構成スキャン ＆ 認識)"]
  MT_INIT --> MT_NEXT["設計フェーズへ進む:<br/>/trace で既存コードを調査"]
  MT_NEXT --> NEXT_PHASE

  %% 分岐 3: Rebase
  CHOICE -->|3. Rebase<br/>(システム刷新・移行)| RB_LEGACY["旧コードを source-legacy/ 配下に配置<br/>(厳格に読取専用 READ-ONLY)"]
  RB_LEGACY --> RB_EXTRACT["/extract-legacy を実行<br/>(レガシーモジュールを抽出)"]
  RB_EXTRACT --> RB_NEW["source-code/ 配下に<br/>新技術スタックのリポジトリを作成"]
  RB_NEW --> RB_INIT["/init を実行<br/>(新環境を設定)"]
  RB_INIT --> RB_NEXT["設計フェーズへ進む:<br/>/legacy で仕様を復元"]
  RB_NEXT --> NEXT_PHASE

  NEXT_PHASE(["機能開発ライフサイクルへ移行:<br/>Design ➔ Codegen ➔ Test ➔ Wire"])
```

---

## 3 大シナリオ別実践ガイド

### 1. Greenfield シナリオ（新規プロジェクト）
- **ステップ 1：ワークスペース骨格の生成**
  ```bash
  flowgrid setup my-project [--mode=base|custom]
  ```
  CLI は 2 つの生成モードをサポートしています：
  - `base`（デフォルト）：完全な骨格設計に加え、標準サンプル共通部品（`surfaces/common`, `03-user-flows/FLOW-login.md`）を自動展開。
  - `custom`：純粋な SSOT ディレクトリ構造のみを構築し、サンプルの共通ファイルは注入しません。
- **ステップ 2：基本方針の定義**
  - `overview/index.md` にプロダクトの目的、ターゲット層、リリース目標を記述。
  - `architecture/` 配下にシステム構造（Arc42 規約、技術制約、ERD）を定義。
  - `surfaces/` 配下に画面サーフェス一覧（管理画面、ポータル、モバイル等）を定義。
- **ステップ 3：リポジトリの作成**
  - `source-code/` 配下にソースコードリポジトリを作成またはクローン。
- **ステップ 4：スキル `/init` の実行**
  - `/init` を実行して技術スタックを自動認識し、`platform-repos.local.json` を生成。

### 2. Maintain シナリオ（既存リポジトリの継続保守）
- 既存のリポジトリを `source-code/` 配下に配置。
- `/init` を実行して構成をスキャンし、FlowGrid と既存プロジェクトを紐付け。
- 新機能の開発時は、`/spec` 実行時に `/trace` スキルを併用して `source-code/` 内の実装や暗黙のルールを対照確認。

### 3. Rebase シナリオ（システム刷新・リプレイス）
- **反コピペ保護：** レガシーシステムの旧コードを `source-legacy/` 配下に配置（**厳格に読取専用**。直接の編集や無秩序なコピペは厳禁）。
- `/extract-legacy` を実行し、旧システムの業務ロジックを抽出。
- `source-code/` 配下に新しいモダンスタックの新規リポジトリを用意。
- Phase 1 の設計時に `/legacy` スキルを活用し、安全に業務ルールを新システムへ移植・モデリング。
