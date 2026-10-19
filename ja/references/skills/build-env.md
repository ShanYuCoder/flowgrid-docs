---
name: build-env
description: "/build-env — コードベースを実行するための標準化された Docker ローカル開発環境を自動構築します。Central Gateway 連携モードと完全独立 Full Standalone モードの双方をサポート。"
disable-model-invocation: true
---

# /build-env — ローカルコード実行環境の構築 (Docker Environment)

## 1. 設計思想：グローバルポータビリティと事前統合された Gateway 知識体系

FlowGrid は、**Linux、macOS、Windows/WSL** を使用する世界中の開発者に向けて設計されたオープンソースのパブリックツールです。

### A. ホストマシンの Gateway 探索は厳禁 (Zero Host-Gateway Sniffing)
- **不可侵の安全原則：** Agent はホストマシンのローカルパス（例: `~/gateway`, `C:\gateway`, `/home/*` など）をスキャンしてはならず、ホストの Docker ネットワークを調べたりホストの `routes.json` を読み取ったりしてはなりません。
- FlowGrid は開発者のホストマシン上で現在どのルートが有効化されているかを知る必要はなく、関知もしません。
- FlowGrid は、すべての開発者が gateway をインストールしていることや、特定のディレクトリに配置していることを前提としません。

### B. 事前統合された Gateway トポロジ認知 (Pre-Synthesized Knowledge)
ホスト環境を動的に調査する代わりに、FlowGrid は標準的な Central Gateway アーキテクチャの知識を**あらかじめ統合・内蔵**しています（`docker-external` や `docker-gateway` などの実戦実績から抽出）：
- **HTTP/HTTPS ルーティングとワイルドカード TLS：** Nginx リバースプロキシ（ポート 80/443、`*.local.com` ワイルドカード証明書）。
- **リレーショナルデータベース：** MySQL 8.4 (`mysql:3306`), MySQL 8.0 (`mysql-80:3306`), PostgreSQL 17 (`postgres:5432` / エイリアス `saas-postgres`)。
- **キャッシュとキーバリューストア：** Redis 7 (`redis:6379`)。
- **オブジェクトストレージ ＆ クラウドモック (S3 / SQS / SNS)：** LocalStack 3.7 (`localstack:4566`) + StackPort 管理画面 (`stackport:8080` / `https://stackport.local.com`)。*LocalStack が標準 S3 エミュレーションを提供するため、プロジェクト独自で MinIO を起動することは禁止。*
- **データベース管理 UI：** phpMyAdmin (`phpmyadmin`), pgAdmin 4 (`pgadmin`), Redis Commander (`redis-commander`)。
- **テスト ＆ モックツール：** Mailpit (`mailpit` SMTP ポート 1025 / Web 画面 8025 / `http://mail.local.com`), Mock API (`mock-api:4000`)。
- **共有 Gateway ネットワーク (`GATEWAY_NETWORK_NAME`)：**
  - **ネットワーク設定に関する重要事項：** `base_shared_net` などの名称は特定の開発者環境における個人設定例であり、普遍的な固定規格ではありません。
  - 共有される外部 Docker ネットワークは、開発者ホストの **Gateway 自身の `.env` ファイル** で定義されています（またはインフラチームにより指定）。
  - プロジェクトの `docker/.env` にはプレースホルダーとして `GATEWAY_NETWORK_NAME=base_shared_net` が記載されます。
  - **メンバーによる調整の義務：** メンバーは環境構築時に自身の Gateway の `.env` を確認し、実環境のネットワーク名と完全に一致するように `docker/.env` の `GATEWAY_NETWORK_NAME` を調整しなければなりません。一致しない場合、コンテナは Gateway ネットワークに参加できません。

---

## 2. Docker 考古学: 既存 Docker 構成の再利用

**[必須遵守ルール]** 新しい Docker 構成を生成する前に、Agent はプロジェクトリポジトリ（例: `local/`, `dev/`, `_docker/`, `prod/`, `docker/` サブディレクトリ）を徹底的に調査しなければなりません：
1. **Dockerfile をゼロから捏造しない：** 言語バージョン、システム依存関係、PECL 拡張（GD, Redis, Swoole, BCMath, Sockets 等）が定義された既存の `Dockerfile` が存在する場合、それを最優先で再利用する。
2. **既存 Dockerfile の再利用または適応：**
   - `build.context` を既存の Docker フォルダに直接向ける（例: `context: ${PROJECT_WORKSPACE}/backend/_docker/php`）。
   - または、既存の Dockerfile を `docker/php/Dockerfile` に適応させる：Nginx/Supervisor/DB レイヤーを排除し、純粋なアプリケーションランタイム（PHP-FPM または Swoole）のみを抽出する。
3. **拡張機能と設定の維持：** プロジェクトのゴールデンサンプルから `php.ini`, `fpm-pool.conf` / `www.conf`, および必要なビルドフラグを同期させる。

### 2.1. ポート解決および割り当て戦略 (BE、FE および全言語リポジトリ対応)

あらゆるコンテナ（フロントエンド、バックエンド、Worker、各言語のマイクロサービス）のリッスンポートを決定する際、Agent は以下の厳格な 2 段階の優先順位に従わなければなりません：

1. **第 1 優先度: 既存コードおよび設定の調査結果（最優先）：**
   - Agent はポートを割り当てる前に、プロジェクトコード内の既存ポート定義を必ず確認します：
     - **フロントエンド / Node.js：** `vite.config.*`, `nuxt.config.*`, `next.config.*`, `package.json` の scripts（`--port <ポート番号>`）、リポジトリの `.env` / `.env.local`（例: `PORT=5173`, `PORT=3000`, `VITE_PORT=...`）を確認。
     - **バックエンド / PHP：** Nginx / Apache 設定、`php-fpm.d/www.conf` (`listen`)、Octane / Reverb の起動オプション（`--port=8000`, `--port=6001`）を確認。
     - **Python (FastAPI, Flask, Django)：** Uvicorn / Gunicorn のコマンド（`--port <ポート番号>`）、`Dockerfile` の `EXPOSE` ディレクティブ、`settings.py` を確認。
     - **Java / Kotlin (Spring Boot, Quarkus)：** `application.properties` / `application.yml` (`server.port`) を確認。
     - **.NET (C#)：** `appsettings.json` または `launchSettings.json` (`applicationUrl`) を確認。
     - **Go：** `main.go` のフラグや環境変数を確認。
   - **絶対的な不変条件：** 既存コードに特定のポートが設定されている場合（例: Vite で `5173`、Nuxt で `3000`、Spring/FastAPI で `8080` 等）、Agent は**その設定ポートを最優先で必ず採用しなければなりません**。全般的に禁止されるポートは存在せず、プロジェクト既存のコード設定が常に最優先されます。

2. **第 2 優先度: フレームワークおよびライブラリの標準慣例ポート（未設定時のフォールバック）：**
   - コード内に明示的なポート指定がない場合、各技術スタックの標準的な慣例ポートを採用します：
     - **Node.js (Vue, Nuxt, Next.js, Express, NestJS)：** `3000`, `3001`, `3002`... を優先（未設定の標準 Vite は `5173`）。
     - **PHP (Laravel, Symfony, WordPress)：**
       - FastCGI: `9000`
       - HTTP / Web: `80`, `8080`, `8000`
       - Octane: `8000`
       - Reverb (WebSocket): `6001`
     - **Python (FastAPI, Flask, Django)：** `8000`, `8080`, `5000` (Flask) を優先。
     - **Java / Kotlin (Spring Boot, Quarkus)：** `8080`, `8443` を優先。
     - **.NET / C# (ASP.NET Core)：** `5000`, `5001`, `8080` を優先。
     - **Go (Gin, Fiber, Echo)：** `8080`, `3000` を優先。

---

## 3. 標準環境ディレクトリ構造

Agent は、自己完結型でクリーンなエンタープライズ標準の `docker/` ディレクトリを構築します：

```text
<workspace>/
├── Makefile                    # ワークスペースルートの Makefile（ルートから up/down/logs を手軽に実行）
└── docker/
    ├── docker-compose.yml      # マルチサービス Compose 構成
    ├── .env                    # 有効なローカル環境変数（メンバーによる調整対象）
    ├── .env.example            # エンタープライズ標準の完全な環境変数テンプレート
    ├── router.txt              # Central Gateway 用ルーティングスニペット（ワークスペース key 付き）
    ├── node/
    │   └── frontend-dev.sh     # Node/Vite/Nuxt 起動 ＆ 自動依存インストールスクリプト
    └── php/ (または python/ 等)
        ├── Dockerfile          # 適応済みランタイム Dockerfile（カスタムビルドが必要な場合）
        ├── php.ini             # ローカル用 PHP 上書き設定
        └── fpm-pool.conf       # PHP-FPM プロセスプール設定 (www.conf)
```

> [!IMPORTANT] `docker/Makefile` の生成は禁止
> 最適な開発体験を提供するため、`Makefile` は**ワークスペースルート**に集約されました。Agent は **`docker/` ディレクトリ内に `Makefile` を生成してはなりません**。ワークスペース全体でルートにある 1 つの `Makefile` のみを使用します。

### 3.1. エンタープライズ `.env.example` & `.env` 標準スキーマ（外部 Docker 完全パラメータ準拠）

> [!CAUTION] メンバー調整の原則 — 完全網羅パラメータ、メンバーによる調整（ゼロコンフィグ即時稼働の幻想を排除）
> FlowGrid の設計思想は、**実戦的なエンタープライズ標準（`docker-external` 等）に完全準拠し、`docker/.env` および `docker/.env.example` に必要なすべての環境変数を網羅した Docker 構成を出力すること**です。
> **このツールは、生成されたコンテナが一切の手動調整なしで即座に稼働することを前提・要求しません。**
> `docker/.env` に出力される値は適切なデフォルト値およびプレースホルダーであり、**チームメンバーが各自のワークステーション環境に合わせて確認・自己調整する**ことを前提としています（Gateway のネットワーク名との整合、DB 認証情報、ソースディレクトリ名、証明書パスの確認など）。
> Agent は自動起動テストを実行したり即時起動を前提としてはならず、生成完了後にメンバーへ `docker/.env` を確認・調整してから `make up` を実行するよう明確に指示しなければなりません。

`docker/.env.example` および `docker/.env` は以下の構成ブロックを網羅して出力されます：

```env
###############################################################################
# Workspace & Container Identifiers
###############################################################################
PROJECT_NAME=dev
PROJECT_SLUG=myproject
HOST_UID=1000
HOST_GID=1000

###############################################################################
# Gateway Shared Network & SSL Certificates
# [メンバーによる設定必須]:
# "base_shared_net" は単なる個人例です。共有ネットワーク名は Gateway の .env で定義されます。
# Gateway の .env を確認し、GATEWAY_NETWORK_NAME を正確に一致させてください！
###############################################################################
GATEWAY_NETWORK_NAME=base_shared_net
GATEWAY_CERTS_DIR=~/.gateway/certs

###############################################################################
# Domains & Routing Hosts (docker/router.txt と一致)
###############################################################################
BACKEND_HOST=myproject-api.local.com
FRONTEND_HOST=myproject.local.com
OCTANE_HOST=myproject-octane.local.com
REVERB_HOST=myproject-reverb.local.com

###############################################################################
# Application Runtimes & Source Mount Paths
# ローカルの実際のリポジトリ階層に合わせてパスを調整してください
###############################################################################
PROJECT_WORKSPACE=.
BACKEND_REPO=source-code/backend
FRONTEND_REPO=source-code/frontend

PHP_IMAGE=php:8.3-fpm-bookworm
NODE_IMAGE=node:20-bookworm
FRONTEND_DEV_PORT=3000
OCTANE_PORT=8000
REVERB_PORT=6001

###############################################################################
# Central Gateway Shared Infrastructure (Gateway の .env に合わせて調整)
###############################################################################
# Database (Gateway 上の MySQL 8.4/8.0 または PostgreSQL 17)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=myproject_db
DB_USERNAME=root
DB_PASSWORD=root

# Cache & Key-Value (Gateway 上の Redis)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null

# Object Storage / Cloud Mock (Gateway 上の LocalStack)
AWS_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=myproject-bucket

# Mail Testing Sandbox (Gateway 上の Mailpit)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="no-reply@myproject.local.com"
MAIL_FROM_NAME="${PROJECT_SLUG}"

# Mock API (Gateway 上の Mock Server)
MOCK_API_URL=http://mock-api:4000

###############################################################################
# Standalone Fallback Port Mappings (Gateway を使わない独立モードでのみ使用)
###############################################################################
STANDALONE_HTTP_PORT=8080
STANDALONE_DB_PORT=3306
STANDALONE_REDIS_PORT=6379
STANDALONE_MAIL_PORT=8025
```

---

## 4. Docker-Compose 仕様（Gateway 連携モード）

Central Gateway 連携モードの場合、`docker/docker-compose.yml` は以下の規約に従います：

### A. プロジェクト名とコンテナ命名規約
```yaml
name: ${PROJECT_NAME:-dev}-${PROJECT_SLUG}

x-dev-user: &dev-user
  user: "${HOST_UID:-1000}:${HOST_GID:-1000}"

x-dev-ca-env: &dev-ca-env
  NODE_EXTRA_CA_CERTS: /opt/gateway-certs/dev-rootCA.crt
  CURL_CA_BUNDLE: /opt/gateway-certs/dev-rootCA.crt
  SSL_CERT_FILE: /opt/gateway-certs/dev-rootCA.crt
  COMPOSER_HOME: /tmp/composer
```
- コンテナ名は命名パターンに準拠：`${PROJECT_NAME:-dev}_${PROJECT_SLUG}_<service>`（例: `dev_portal_php_83`, `dev_portal_node`, `dev_portal_octane`, `dev_portal_reverb`）。

### B. 共有 Gateway ネットワーク
すべてのサービスは環境変数を通じて Gateway の外部ネットワークに接続：
```yaml
networks:
  gateway-shared:
    name: ${GATEWAY_NETWORK_NAME:-base_shared_net}
    external: true
```
Compose の各サービス定義：
```yaml
    networks:
      - gateway-shared
```

### C. Node.js フロントエンドサービス
- **カスタム Dockerfile は不要：** 公式の Node LTS イメージを直接使用：
  ```yaml
  frontend-node:
    image: ${NODE_IMAGE:-node:20-bookworm} # またはプロジェクトに応じた node:18.19-bookworm
    container_name: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_frontend_node
    working_dir: /workspace/${FRONTEND_REPO}
    command: ["/bin/sh", "/opt/dev/frontend-dev.sh"]
    environment:
      <<: *dev-ca-env
      CHOKIDAR_USEPOLLING: "true"
    volumes:
      - ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}
      - ./node/frontend-dev.sh:/opt/dev/frontend-dev.sh:ro
      - ${GATEWAY_CERTS_DIR:-~/.gateway/certs}/dev-rootCA.crt:/opt/gateway-certs/dev-rootCA.crt:ro
    networks:
      - gateway-shared
  ```
- **[絶対遵守] `node_modules` 専用ボリュームの分離は禁止：**
  - `frontend_node_modules:/.../node_modules` のような Named Volume の作成は**厳禁**。
  - フロントエンドのソースリポジトリ全体を直接マウント：
    `- ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}`
  - ソース全体のマウントに `node_modules` が含まれるため、ホスト IDE とコンテナが 100% 同期し、ファイルロックの問題を解消し、不要なボリュームの残留を防ぎます。

### D. `frontend-dev.sh` によるパッケージマネージャー認識とポートバインド
スクリプト `docker/node/frontend-dev.sh` は、プロジェクトが実際に使用しているパッケージマネージャー（`pnpm`, `yarn`, `npm`）を自動認識し、解決されたポート（`${FRONTEND_DEV_PORT:-3000}`）にバインドして起動します：
```sh
#!/bin/sh
set -eu
cd /workspace/${FRONTEND_REPO}

PORT="${FRONTEND_DEV_PORT:-3000}"

# Lockfile からパッケージマネージャーを自動認識
if [ -f pnpm-lock.yaml ]; then
  if ! command -v pnpm >/dev/null 2>&1; then
    corepack enable
    corepack prepare pnpm@latest --activate
  fi
  if [ ! -d node_modules ]; then
    pnpm install
  fi
  exec pnpm run dev -- --host 0.0.0.0 --port "$PORT"
elif [ -f yarn.lock ]; then
  if [ ! -d node_modules ]; then
    yarn install
  fi
  exec yarn dev --host 0.0.0.0 --port "$PORT"
else
  if [ ! -d node_modules ]; then
    npm install
  fi
  exec npm run dev -- --host 0.0.0.0 --port "$PORT"
fi
```
- **ポートバインド規則：** すべての開発サーバーは `0.0.0.0` にバインドし（Docker ネットワークおよび Gateway 経由のリクエストを受け付けるため）、解決されたポート（`${FRONTEND_DEV_PORT}`、例: `5173`, `3000`, またはコード/慣例から導出されたポート）を使用しなければなりません。

---

## 5. 補助サービス：内部完結と最小限の原則

1. **Gateway から提供されるサービス（Compose 内で重複定義しない）：**
   - **データベースとキャッシュ：** MySQL (`mysql:3306`), PostgreSQL (`postgres:5432`), Redis (`redis:6379`)。
   - **オブジェクトストレージ / S3 / SQS：** Gateway の `localstack:4566` が提供。**ローカルで MinIO を起動することは厳禁！** プロジェクトの `.env` で `AWS_ENDPOINT=http://localstack:4566` を指定（StackPort UI `https://stackport.local.com` で確認可能）。
   - **メール：** Gateway の `mailpit:1025` が提供（UI: `http://mail.local.com`）。

2. **キュー ＆ スケジュール Worker（プロジェクト内部完結）：**
   - **個別の Dockerfile は作成しない：** Worker コンテナはアプリケーションの PHP イメージを直接再利用（例: `image: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php`）。
   - コマンドのみを上書き実行：
     - Queue: `command: ["php", "artisan", "queue:work"]`
     - Schedule: `command: ["php", "artisan", "schedule:work"]`
   - **内部実行限定：** バックグラウンド CLI のみを実行し HTTP トラフィックを受け付けないため、Gateway や `router.txt` に公開してはなりません。

3. **プロジェクト固有のデータストア（例: Meilisearch）：**
   - Gateway に存在しないサービス（例: `meilisearch`）が必要な場合、公式イメージを直接 Compose に宣言（`image: getmeili/meilisearch:v1.15.2`）。**カスタム Dockerfile は不要**。
   - バックエンドとは Docker ネットワークのエイリアス（例: `http://meilisearch:7700`）で内部通信し、Gateway には公開しません。

4. **Laravel Octane / Reverb（存在する場合）：**
   - PHP-FPM の代わりに Octane を使用して HTTP API を提供する場合、ポート 8000 でリッスン（`router.txt` では `role: "node"`）。
   - Reverb を使用して WebSocket 接続を提供する場合、ポート 6001 でリッスン（`router.txt` では `role: "node"`）。

---

## 6. Gateway ルーティング構成 (`docker/router.txt`)

Central Gateway (`routes.json`) には、**開発者のブラウザから直接アクセスするパブリックエントリポイント**のみを定義します：
- **バックエンド API (FastCGI)：** PHP-FPM コンテナに向けた 1 つのルート（`role: "web"`, ポート 9000, `docroot` 必須）。
- **バックエンド API (HTTP / Octane)：** Octane に向けた 1 つのルート（`role: "node"`, ポート 8000）。
- **フロントエンド Web：** Node 開発サーバーに向けた 1 つのルート（`role: "node"`, ポートは `${FRONTEND_DEV_PORT}` と一致、例: 3000, 5173 等）。
- **WebSocket (Reverb)：** Reverb に向けた 1 つのルート（`role: "node"`, ポート 6001）。
- **内部補助サービス**（Queue, Schedule, Meilisearch, Redis, DB）を `router.txt` に含めることは厳禁！

### ワークスペース Key 付きの正規 `docker/router.txt` フォーマット

出力されるスニペットはワークスペースの slug（例: `"portal"`）をルートキーとし、Gateway の `routes.json` のルートオブジェクトに直接コピー＆ペーストできるように構成します：

```json
"${PROJECT_SLUG}": {
  "external": true,
  "sites": [
    {
      "host": "${PROJECT_SLUG}-api.local.com",
      "role": "web",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php_83",
      "docroot": "/var/www/${PROJECT_SLUG}_be/public"
    },
    {
      "host": "${PROJECT_SLUG}.local.com",
      "role": "node",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_node",
      "port": 3000
    },
    {
      "host": "${PROJECT_SLUG}-octane.local.com",
      "role": "node",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_octane",
      "port": 8000
    },
    {
      "host": "${PROJECT_SLUG}-reverb.local.com",
      "role": "node",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_reverb",
      "port": 6001
    }
  ]
}
```

*Role フィールドの仕様：*
- `role: "web"`: `"container"` と `"docroot"` が必須。Nginx が PHP-FPM コンテナ（ポート 9000）へ FastCGI パスを設定。
- `role: "node"`: `"container"` と `"port"` が必須。Nginx が標準の HTTP/WebSocket リバースプロキシを設定。

---

## 7. Gateway 依存アラートと `AskQuestion` によるモード確認（Gateway 未導入時の対応）

Central Docker Gateway を**導入していない、または使用しない開発者**に対応するため、`/build-env` は環境生成の最終段階で確認ステップを必ず実行します。

### A. 前置インフラサービスのアラート表示
Agent は、FlowGrid が前提としている共通インフラサービスの一覧を明示します：
```text
[Central Gateway インフラ構成確認]
FlowGrid の標準環境では、以下の共通サービスが Central Gateway で稼働していることを前提とします：
• 共有ネットワーク: Gateway の .env に定義 (例: GATEWAY_NETWORK_NAME=base_shared_net)
• リバースプロキシ: Nginx (ポート 80/443, *.local.com ワイルドカード TLS)
• データベース: MySQL 8.4/8.0 (3306), PostgreSQL 17 (5432)
• キャッシュ: Redis 7 (6379)
• オブジェクトストレージ / S3 / SQS: LocalStack 3.7 (4566)
• メールテスト: Mailpit (1025 / 8025)
• 管理ツール: phpMyAdmin, pgAdmin, Redis Commander, StackPort
```

### B. インタラクティブなモード選択 (`AskQuestion`)
Agent はメンバーへ確認を行います：
- **質問：** *"共通インフラサービスのために Central Docker Gateway を使用していますか？"*
- **選択肢 1 (推奨)：** `"(Recommended) はい、Central Gateway を使用 — GATEWAY_NETWORK_NAME に接続する軽量な Compose を構築し、docker/router.txt を出力"`
- **選択肢 2：** `"いいえ、完全スタンドアロン環境を構築 — ローカル Nginx/個別ポート、専用 MySQL、Redis、内部ネットワークを内包した完全版を構築"`

### C. Full Standalone モードの実行フロー（「いいえ」を選択した場合）
メンバーがスタンドアロンモードを選択した場合：
1. **内部独立ネットワーク：** `gateway-shared` をプロジェクト専用の Bridge ネットワークに置き換え：
   ```yaml
   networks:
     default:
       name: ${PROJECT_SLUG}_net
       driver: bridge
   ```
2. **コアインフラコンテナの追加：**
   - 専用の `mysql`（または `postgres`）コンテナと永続 Named Volume を追加（例: `${PROJECT_SLUG}_mysql_data:/var/lib/mysql`）。
   - 専用の `redis` コンテナを追加。
   - メールテストが必要な場合は専用 `mailpit` を追加。
3. **ローカルアクセスのためのポートマッピング：**
   - ホストポートを直接マッピング（例: バックエンド `8080`, フロントエンド `3000`, MySQL `3306`, Redis `6379`）。
   - または `docker/nginx/` 配下に軽量なプロジェクト専用 Nginx コンテナを用意。
4. **環境変数の構成 (`.env`)：**
   - `DB_HOST=mysql`, `REDIS_HOST=redis` を内部サービス名に設定。
5. **`router.txt` は不要：** すべて localhost 経由で直接アクセスするため、`docker/router.txt` の生成はスキップ。

### D. 生成後ガイド：メンバーによる `.env` の確認と調整
ファイル生成直後、Agent は明確なガイダンスを出力しなければなりません：
> "Docker 環境が正常に生成されました！
> `make up` を実行する前に、`docker/.env` を開いてローカル環境に合わせて調整してください：
> 1. `GATEWAY_NETWORK_NAME` をお使いの Gateway の実際のネットワーク名に合わせて設定。
> 2. `DB_DATABASE`、`DB_USERNAME`、`DB_PASSWORD`、および `AWS_BUCKET` を確認。
> 3. ワイルドカード証明書をマウントしている場合、`GATEWAY_CERTS_DIR` を確認。
> 4. Gateway を使用する場合は、`docker/router.txt` の内容を Gateway の `routes.json` にコピー。
> 設定完了後、コンテナを起動: `make up`"

---

## 8. ルート Makefile 仕様

Agent は、**ワークスペースルートにのみ**クリーンな `Makefile` を生成します（`docker compose -f docker/docker-compose.yml --env-file docker/.env` を呼び出し）：

```makefile
DCX := docker compose -f docker/docker-compose.yml --env-file docker/.env

MAKEFLAGS += --no-print-directory

.PHONY: help up down restart ps logs build exec-backend exec-frontend

help:
	@echo "利用可能なコマンド一覧:"
	@echo "  make up            - プロジェクトコンテナをバックグラウンドで起動"
	@echo "  make down          - プロジェクトコンテナを停止して削除"
	@echo "  make restart       - プロジェクトコンテナを再起動"
	@echo "  make ps            - 稼働中コンテナの一覧を表示"
	@echo "  make logs          - コンテナログをリアルタイム追跡"
	@echo "  make build         - イメージをビルドまたは再ビルド"
	@echo "  make exec-backend  - バックエンドコンテナのシェルを開く"
	@echo "  make exec-frontend - フロントエンドコンテナのシェルを開く"

build:
	$(DCX) build

up:
	$(DCX) up -d

down:
	$(DCX) down

restart:
	$(DCX) restart

ps:
	$(DCX) ps -a

logs:
	$(DCX) logs -f

exec-backend:
	$(DCX) exec -it backend sh

exec-frontend:
	$(DCX) exec -it frontend-node sh
```

---

## 9. 検証チェックリスト

- [ ] 生成前に既存リポジトリをスキャンして既存の `Dockerfile` / `docker-compose.yml` を確認したか。
- [ ] ホストのパスを動的にスキャンしておらず、事前統合された静的トポロジーに基づいているか。
- [ ] 実戦的なエンタープライズ標準に準拠した完全な `docker/.env.example` および `docker/.env` を生成したか。
- [ ] `base_shared_net` は単なる例示であり、メンバーが Gateway の `.env` を確認して `GATEWAY_NETWORK_NAME` を整合させる必要がある旨を明記したか。
- [ ] `make up` 実行前にメンバーが `docker/.env` を自己調整するよう明確に指示したか（即時自動稼働を前提としない）。
- [ ] Gateway モード時: Gateway 既存サービス（Nginx, MySQL, Redis, MinIO 等）を Compose に重複定義していないか。
- [ ] Standalone モード時: メンバー確認後に専用 DB/Redis と Bridge ネットワークを含む完全な Compose を生成したか。
- [ ] フロントエンド Node はソースコードを直接マウントし、`node_modules` の Named Volume を作成していないか。
- [ ] すべてのサービス（FE、BE、Python、Java、.NET、Go）のポートが 2 段階の優先順位で解決されているか：第 1 優先 = 既存コード設定（例: 5173, 3000, 8080 等）、第 2 優先 = フレームワーク標準慣例（Node: 3000/3001, PHP: 9000/80/8080, Python: 8000/8080, Java: 8080, .NET: 5000/8080）。
- [ ] `frontend-dev.sh` はパッケージマネージャー（`pnpm`/`yarn`/`npm`）を自動認識し、`0.0.0.0` および解決されたポート（`${FRONTEND_DEV_PORT}`）に開発サーバーをバインドしているか。
- [ ] 補助 Worker（queue, schedule, search）はアプリイメージを再利用し、内部限定で実行されているか（Gateway に公開しない）。
- [ ] `Makefile` はワークスペースルートにのみ生成され、**`docker/` 内に `Makefile` が存在しない**ことを確認したか。
- [ ] `docker/router.txt` はワークスペース key（`"${PROJECT_SLUG}": { ... }`）付きで生成され、ブラウザ公開用エンドポイントのみを含んでいるか。
- [ ] 環境確定前にインフラの事前通知を行い、`AskQuestion` でメンバーに利用モードを確認したか。

