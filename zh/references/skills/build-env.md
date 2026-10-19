---
name: build-env
description: "/build-env — 自动构建标准化的 Docker 本地运行环境，同时支持 Central Gateway 模式与独立 Full Standalone 模式。"
disable-model-invocation: true
---

# /build-env — 本地代码运行环境构建 (Docker Environment)

## 1. 设计哲学：全球通用性与预置 Gateway 知识体系

FlowGrid 是一款面向全球开发者的开源公共工具，全面支持 **Linux、macOS 与 Windows/WSL**。

### A. 严禁嗅探宿主机 Gateway (Zero Host-Gateway Sniffing)
- **不可违背的安全防线：** Agent **严格禁止**扫描宿主机上的任何绝对路径（如 `~/gateway`、`C:\gateway` 或 `/home/*`），**绝不**尝试连接宿主机 Docker 网络或读取宿主机的 `routes.json`。
- FlowGrid 无从得知也**无需关心**开发者宿主机上目前激活了哪些路由规则。
- FlowGrid 不做任何假设（例如假设所有人都安装了 gateway，或者放在某个固定目录下）。

### B. 预置 Gateway 拓扑认知 (Pre-Synthesized Knowledge)
FlowGrid 无需动态探测，而是内置了**企业级标准 Central Gateway 架构知识**（提炼自 `docker-external` 与 `docker-gateway` 等成熟范式）：
- **HTTP/HTTPS 路由与泛域名 TLS：** Nginx 反向代理（`gateway-nginx` 监听 80/443 端口，配备 `*.local.com` 泛域名证书）。
- **关系型数据库：** MySQL 8.4 (`mysql:3306`)、MySQL 8.0 (`mysql-80:3306`)、PostgreSQL 17 (`postgres:5432` / 别名 `saas-postgres`)。
- **缓存与键值存储：** Redis 7 (`redis:6379`)。
- **对象存储与云端模拟 (S3 / SQS / SNS)：** LocalStack 3.7 (`localstack:4566`) + StackPort 控制台 (`stackport:8080` / `https://stackport.local.com`)。*LocalStack 提供标准 S3 模拟；项目绝不重复启动 MinIO 容器。*
- **数据库管理界面：** phpMyAdmin (`phpmyadmin`)、pgAdmin 4 (`pgadmin`)、Redis Commander (`redis-commander`)。
- **测试与 Mock 工具：** Mailpit (`mailpit` SMTP 端口 1025 / Web 界面 8025 / `http://mail.local.com`)、Mock API (`mock-api:4000`)。
- **网关共享网络 (`GATEWAY_NETWORK_NAME`)：**
  - **网络配置重要提示：** 诸如 `base_shared_net` 的网络名称仅为特定开发者环境下的个人配置示例，并非全局通用硬编码标准。
  - 该外部共享 Docker 网络直接定义在开发者宿主机 **Gateway 自身的 `.env` 文件** 中（或由团队基础设施统一命名）。
  - 项目的 `docker/.env` 默认提供 `GATEWAY_NETWORK_NAME=base_shared_net` 作为占位符示例。
  - **成员必须自主调整：** 项目成员在搭建环境时，**必须**查看其本地 Gateway 的 `.env` 文件获取真实网络名称，并在项目 `docker/.env` 中将 `GATEWAY_NETWORK_NAME` 调整为完全一致的值，各容器方可正常加入网关网络。

---

## 2. Docker 考古：复用项目既有 Docker 配置

**[强制执行规则]** 在生成任何新 Docker 配置之前，Agent 必须全面审查项目仓库（例如 `local/`、`dev/`, `_docker/`, `prod/`, `docker/` 等子目录）：
1. **绝不从零臆造 Dockerfile**：若代码库中已存在定义了语言版本、系统依赖与 PECL 扩展（GD、Redis、Swoole、BCMath、Sockets 等）的既有 `Dockerfile`，必须优先复用。
2. **复用或精简既有 Dockerfile：**
   - 直接将 `build.context` 指向既有目录（例如 `context: ${PROJECT_WORKSPACE}/backend/_docker/php`）。
   - 或将既有 Dockerfile 精简后放入 `docker/php/Dockerfile`：剥离 Nginx/Supervisor/DB 等分层，仅保留纯应用运行时（如 PHP-FPM 或 Swoole）。
3. **保留既有配置与扩展：** 严格对齐黄金样本中的 `php.ini`、`fpm-pool.conf` / `www.conf` 以及编译配置。

### 2.1. 端口解析与分配策略 (覆盖 BE、FE 及所有语言代码库)

为任何容器（前端、后端、Worker 或各语言微服务）确定监听端口时，Agent 必须严格遵守以下双层优先级策略：

1. **第一优先级：严格以既有代码与配置为准（最高优先级）：**
   - Agent 在分配端口前必须先检查项目代码中的端口定义：
     - **前端 / Node.js：** 检查 `vite.config.*`、`nuxt.config.*`、`next.config.*`、`package.json` 中的 scripts（`--port <端口>`）、或仓库 `.env` / `.env.local` 文件（如 `PORT=5173`、`PORT=3000`、`VITE_PORT=...`）。
     - **后端 / PHP：** 检查 Nginx / Apache 配置、`php-fpm.d/www.conf` (`listen`)、Octane / Reverb 启动参数（`--port=8000`、`--port=6001`）。
     - **Python (FastAPI, Flask, Django)：** 检查 Uvicorn / Gunicorn 命令（`--port <端口>`）、`Dockerfile` 中的 `EXPOSE` 指令或 `settings.py`。
     - **Java / Kotlin (Spring Boot, Quarkus)：** 检查 `application.properties` / `application.yml` (`server.port`)。
     - **.NET (C#)：** 检查 `appsettings.json` 或 `launchSettings.json` (`applicationUrl`)。
     - **Go：** 检查 `main.go` 中的 flags 或环境变量。
   - **绝对不变量：** 若既有代码中已配置了特定端口（例如 Vite 配置了 `5173`、Nuxt 配置了 `3000`、Spring/FastAPI 配置了 `8080` 等），Agent **必须无条件优先沿用该配置端口**。不存在任何被全局禁止的端口，项目源码中的配置始终拥有最高优先级。

2. **第二优先级：框架与类库通用默认端口（代码未配置时兜底）：**
   - 若代码中未显式指定端口，则按技术栈采纳通用标准端口：
     - **Node.js (Vue, Nuxt, Next.js, Express, NestJS)：** 优先采用 `3000`、`3001`、`3002`...（纯 Vite 无配置时采用 `5173`）。
     - **PHP (Laravel, Symfony, WordPress)：**
       - FastCGI: `9000`
       - HTTP / Web: `80`、`8080`、`8000`
       - Octane: `8000`
       - Reverb (WebSocket): `6001`
     - **Python (FastAPI, Flask, Django)：** 优先采用 `8000`、`8080`、`5000` (Flask)。
     - **Java / Kotlin (Spring Boot, Quarkus)：** 优先采用 `8080`、`8443`。
     - **.NET / C# (ASP.NET Core)：** 优先采用 `5000`、`5001`、`8080`。
     - **Go (Gin, Fiber, Echo)：** 优先采用 `8080`、`3000`。

---

## 3. 标准环境目录结构

Agent 必须构建一个结构清晰、自包含的企业级 `docker/` 目录：

```text
<workspace>/
├── Makefile                    # 工作区根目录 Makefile（方便在根目录下执行 up/down/logs）
└── docker/
    ├── docker-compose.yml      # 多服务 Compose 配置
    ├── .env                    # 当前生效的本地环境变量（由成员核对与调整）
    ├── .env.example            # 完整的企业级环境变量模版
    ├── router.txt              # 网关路由配置片段（带 workspace key）
    ├── node/
    │   └── frontend-dev.sh     # Node/Vite/Nuxt 启动与自动依赖安装脚本
    └── php/ (或 python/ 等)
        ├── Dockerfile          # 精简后的运行时 Dockerfile（若需自定义构建）
        ├── php.ini             # 本地 PHP 配置覆盖
        └── fpm-pool.conf       # PHP-FPM 进程池配置 (www.conf)
```

> [!IMPORTANT] 严禁在 `docker/` 下生成 `Makefile`
> 为了最佳的开发者操作体验，`Makefile` 已移至**工作区根目录**。Agent **严格禁止在 `docker/` 目录下重复生成 `Makefile`**。整个工作区仅保留根目录下一份标准的 `Makefile`。

### 3.1. 企业级 `.env.example` & `.env` 标准模版（对齐外部 Docker 完整参数）

> [!CAUTION] 核心原则：参数全覆盖，由成员自主调整 — 绝非“零配置开箱即用”的幻想
> FlowGrid 的设计哲学是输出**完全对齐实战企业级标准（类似 `docker-external`）的完整 Docker 配置，并在 `docker/.env` 与 `docker/.env.example` 中穷尽所有必要环境变量**。
> **该工具绝非要求或假设生成的容器能够完全零配置直接运行。**
> `docker/.env` 中填充的数值均为合理的默认值与占位符，旨在供**团队成员根据本地工作机环境自主核对与调整**（如修改 `GATEWAY_NETWORK_NAME` 匹配本地 Gateway、修改数据库账密、调整源码目录与证书路径等）。
> Agent 严禁尝试自动启动测试或假定零干预运行，生成完毕后必须明确提示成员在执行 `make up` 前先检查并调整 `docker/.env`。

`docker/.env.example` 和 `docker/.env` 必须包含以下完整配置块：

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
# [成员必须核对配置]:
# "base_shared_net" 仅为示例。共享网络名称由你本地 Gateway 的 .env 文件定义。
# 你必须查看 Gateway 的 .env 并将 GATEWAY_NETWORK_NAME 设置为完全一致的网络名！
###############################################################################
GATEWAY_NETWORK_NAME=base_shared_net
GATEWAY_CERTS_DIR=~/.gateway/certs

###############################################################################
# Domains & Routing Hosts (必须与 docker/router.txt 对应)
###############################################################################
BACKEND_HOST=myproject-api.local.com
FRONTEND_HOST=myproject.local.com
OCTANE_HOST=myproject-octane.local.com
REVERB_HOST=myproject-reverb.local.com

###############################################################################
# Application Runtimes & Source Mount Paths
# 请根据本地工作区实际目录结构调整路径
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
# Central Gateway Shared Infrastructure (根据你的 Gateway .env 进行核对调整)
###############################################################################
# Database (Gateway 上的 MySQL 8.4/8.0 或 PostgreSQL 17)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=myproject_db
DB_USERNAME=root
DB_PASSWORD=root

# Cache & Key-Value (Gateway 上的 Redis)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null

# Object Storage / Cloud Mock (Gateway 上的 LocalStack)
AWS_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=myproject-bucket

# Mail Testing Sandbox (Gateway 上的 Mailpit)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="no-reply@myproject.local.com"
MAIL_FROM_NAME="${PROJECT_SLUG}"

# Mock API (Gateway 上的 Mock Server)
MOCK_API_URL=http://mock-api:4000

###############################################################################
# Standalone Fallback Port Mappings (仅在未使用 Gateway 的独立全量模式下生效)
###############################################################################
STANDALONE_HTTP_PORT=8080
STANDALONE_DB_PORT=3306
STANDALONE_REDIS_PORT=6379
STANDALONE_MAIL_PORT=8025
```

---

## 4. Docker-Compose 规范（Gateway 模式）

在 Central Gateway 模式下，`docker/docker-compose.yml` 遵循以下精确约定：

### A. 项目命名与容器命名规范
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
- 容器名称必须符合规范：`${PROJECT_NAME:-dev}_${PROJECT_SLUG}_<service>`（例如 `dev_portal_php_83`、`dev_portal_node`、`dev_portal_octane`、`dev_portal_reverb`）。

### B. 共享网关网络
所有服务通过环境变量连接至网关外部网络：
```yaml
networks:
  gateway-shared:
    name: ${GATEWAY_NETWORK_NAME:-base_shared_net}
    external: true
```
Compose 中的每个服务声明：
```yaml
    networks:
      - gateway-shared
```

### C. Node.js 前端服务
- **不编写自定义 Dockerfile：** 直接使用官方 Node LTS 镜像：
  ```yaml
  frontend-node:
    image: ${NODE_IMAGE:-node:20-bookworm} # 或匹配项目的 node:18.19-bookworm
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
- **[绝对红线] 严禁为 `node_modules` 单独挂载 Named Volume：**
  - **严格禁止**创建 `frontend_node_modules:/.../node_modules` 之类的命名卷。
  - 直接将整个前端源码目录挂载进容器：
    `- ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}`
  - 直接挂载代码目录已包含 `node_modules`，保证宿主机 IDE 与容器内部 100% 同步，杜绝文件锁死和无用卷残留。

### D. `frontend-dev.sh` 自动感知包管理器与端口绑定
包装脚本 `docker/node/frontend-dev.sh` 必须自动检测并支持项目实际使用的包管理器（`pnpm`、`yarn`、`npm`），并绑定至解析后的端口（`${FRONTEND_DEV_PORT:-3000}`）：
```sh
#!/bin/sh
set -eu
cd /workspace/${FRONTEND_REPO}

PORT="${FRONTEND_DEV_PORT:-3000}"

# 根据 Lockfile 自动检测包管理器
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
- **端口绑定规则：** 所有开发服务器必须绑定至 `0.0.0.0`（以接收来自 Docker 网络与 Gateway 的流量），并使用解析确定的端口（`${FRONTEND_DEV_PORT}`，如 `5173`、`3000` 或从代码/默认约定解析的端口）。

---

## 5. 辅助服务：保持纯内部化与最简化

1. **已在网关中运行的公共服务（在 Compose 中绝不重复声明）：**
   - **数据库与缓存：** MySQL (`mysql:3306`)、PostgreSQL (`postgres:5432`)、Redis (`redis:6379`)。
   - **对象存储 / S3 / SQS：** 由网关的 `localstack:4566` 统一提供。**严禁在项目中单独启动 MinIO！** 项目的 `.env` 配置 `AWS_ENDPOINT=http://localstack:4566`（可通过 StackPort 界面 `https://stackport.local.com` 直观查看）。
   - **邮件测试：** 由网关的 `mailpit:1025` 统一提供（UI 界面: `http://mail.local.com`）。

2. **队列与定时任务 Worker（项目纯内部）：**
   - **不创建单独 Dockerfile：** Worker 容器直接复用应用的 PHP 镜像（例如 `image: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php`）。
   - 仅覆盖运行命令：
     - Queue: `command: ["php", "artisan", "queue:work"]`
     - Schedule: `command: ["php", "artisan", "schedule:work"]`
   - **纯内部运行：** 这些 Worker 仅执行后台 CLI 命令，不接收 HTTP 请求。严格禁止将其暴露给网关或放入 `router.txt`。

3. **项目专属非标数据存储（例如 Meilisearch）：**
   - 若项目确实需要网关未包含的独立服务（如 `meilisearch`），直接在 Compose 中使用官方镜像声明（`image: getmeili/meilisearch:v1.15.2`）。**不编写自定义 Dockerfile**。
   - 后端通过 Docker 内部网络别名（如 `http://meilisearch:7700`）访问，不向网关暴露。

4. **Laravel Octane / Reverb（若存在）：**
   - 若采用 Octane 替代 PHP-FPM 提供 HTTP API，监听 8000 端口（`router.txt` 中使用 `role: "node"`）。
   - 若采用 Reverb 提供 WebSocket 服务，监听 6001 端口（`router.txt` 中使用 `role: "node"`）。

---

## 6. 网关路由配置导出 (`docker/router.txt`)

Central Gateway (`routes.json`) 仅需配置**开发者浏览器能够直接访问的公共入口**：
- **后端 API (FastCGI)：** 1 条路由指向 PHP-FPM 容器（`role: "web"`，监听 9000 端口并指定 `docroot`）。
- **后端 API (HTTP / Octane)：** 1 条路由指向 Octane（`role: "node"`，监听 8000 端口）。
- **前端 Web：** 1 条路由指向 Node 开发服务器（`role: "node"`，端口匹配 `${FRONTEND_DEV_PORT}`，如 3000、5173 等）。
- **WebSocket (Reverb)：** 1 条路由指向 Reverb（`role: "node"`，监听 6001 端口）。
- **严禁将内部辅助服务**（Queue、Schedule、Meilisearch、Redis、DB）放入 `router.txt`！

### 规范的 `docker/router.txt` 格式（包含 Workspace Key）

导出的片段必须以工作区的 slug（如 `"portal"`）为顶层 key，以便开发者直接将其完整复制粘贴进网关 `routes.json` 的根对象中：

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

*Role 字段规范：*
- `role: "web"`：必须包含 `"container"` 与 `"docroot"`。Nginx 将配置 FastCGI 代理至 PHP-FPM 容器的 9000 端口。
- `role: "node"`：必须包含 `"container"` 与 `"port"`。Nginx 将配置标准 HTTP/WebSocket 反向代理。

---

## 7. 网关依赖提示与 `AskQuestion` 模式确认（防范未安装网关场景）

为了全面支持**未安装或不打算使用 Central Gateway** 的开发者，`/build-env` 在正式生成环境前必须执行交互式提示与确认。

### A. 前置公共基础设施服务提示
Agent 必须清晰列出 FlowGrid 默认假设由网关提供的共享服务列表：
```text
[Central Gateway 基础设施检查]
FlowGrid 标准环境默认假设以下共享服务已由 Central Gateway 提供：
• 共享网络: 在 Gateway 的 .env 中声明 (例如 GATEWAY_NETWORK_NAME=base_shared_net)
• 反向代理: Nginx (80/443 端口, *.local.com 泛域名 TLS 证书)
• 数据库: MySQL 8.4/8.0 (3306), PostgreSQL 17 (5432)
• 缓存: Redis 7 (6379)
• 对象存储 / S3 / SQS: LocalStack 3.7 (4566)
• 邮件测试沙箱: Mailpit (1025 / 8025)
• 管理界面: phpMyAdmin, pgAdmin, Redis Commander, StackPort
```

### B. 交互式模式选择 (`AskQuestion`)
Agent 向成员提问：
- **问题：** *"你当前是否正在使用 Central Docker Gateway 来运行这些共享基础设施服务？"*
- **选项 1 (推荐)：** `"(Recommended) 是，使用 Central Gateway — 生成精简 Compose 并挂载至 GATEWAY_NETWORK_NAME，导出 docker/router.txt"`
- **选项 2：** `"否，构建 Full Standalone 全独立环境 — 自包含生成本地 Nginx/独立端口、专属 MySQL、Redis 及内部网络"`

### C. Full Standalone 模式执行流程（当成员选择“否”时）
若成员选择全独立模式：
1. **内部独立网络：** 将 `gateway-shared` 替换为项目专用的独立 Bridge 网络：
   ```yaml
   networks:
     default:
       name: ${PROJECT_SLUG}_net
       driver: bridge
   ```
2. **补充核心基础设施容器：**
   - 添加专属 `mysql`（或 `postgres`）容器，并挂载持久化命名卷（如 `${PROJECT_SLUG}_mysql_data:/var/lib/mysql`）。
   - 添加专属 `redis` 容器。
   - 若需测试邮件，添加独立的 `mailpit` 容器。
3. **暴露宿主机端口直接访问：**
   - 直接映射宿主机端口（例如后端映射 `8080`，前端映射 `3000`，MySQL 映射 `3306`，Redis 映射 `6379`）。
   - 或在 `docker/nginx/` 下构建一个轻量级项目级 Nginx 容器。
4. **环境变量配置 (`.env`)：**
   - `DB_HOST=mysql`，`REDIS_HOST=redis` 指向内部服务名。
5. **无需 `router.txt`：** 跳过生成 `docker/router.txt`，所有服务均直接通过 localhost 端口访问。

### D. 生成后指引：成员自行核对调整 `.env`
文件写入完成后，Agent 必须输出明确的指引信息：
> "Docker 环境已成功生成！
> 请在启动前打开并根据实际情况核对调整 `docker/.env`：
> 1. 将 `GATEWAY_NETWORK_NAME` 修改为你本地 Gateway 实际配置的网络名称。
> 2. 核对 `DB_DATABASE`、`DB_USERNAME`、`DB_PASSWORD` 及 `AWS_BUCKET`。
> 3. 若挂载了本地自签证书，核对 `GATEWAY_CERTS_DIR` 路径。
> 4. 若使用 Gateway，请将 `docker/router.txt` 内容复制粘贴至 Gateway 的 `routes.json`。
> 确认无误后执行启动：`make up`"

---

## 8. 根目录 Makefile 规范

Agent 必须在**工作区根目录下**生成唯一一份简洁的 `Makefile`（底层调用 `docker compose -f docker/docker-compose.yml --env-file docker/.env`）：

```makefile
DCX := docker compose -f docker/docker-compose.yml --env-file docker/.env

MAKEFLAGS += --no-print-directory

.PHONY: help up down restart ps logs build exec-backend exec-frontend

help:
	@echo "可用命令列表:"
	@echo "  make up            - 后台启动项目所有容器"
	@echo "  make down          - 停止并清理项目容器"
	@echo "  make restart       - 重启项目容器"
	@echo "  make ps            - 查看当前运行中的容器"
	@echo "  make logs          - 实时跟踪容器日志"
	@echo "  make build         - 构建或重新构建镜像"
	@echo "  make exec-backend  - 进入后端容器终端"
	@echo "  make exec-frontend - 进入前端容器终端"

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

## 9. 校验检查清单 (Checklist)

- [ ] 生成前已扫描既有仓库寻找既有 `Dockerfile` / `docker-compose.yml`。
- [ ] 绝无动态探测宿主机路径的行为，严格依托静态预置认知。
- [ ] 已完整输出企业级 `.env.example` 与 `.env`（对齐实战 Docker 完整规范）。
- [ ] 明确标注 `base_shared_net` 仅为示例，成员必须核对其本地 Gateway `.env` 并精准对齐 `GATEWAY_NETWORK_NAME`。
- [ ] 明确提示成员在 `make up` 前核对并调整 `docker/.env`（绝非零配置直接运行）。
- [ ] Gateway 模式下：Compose 中未重复声明 Nginx、MySQL、Redis、MinIO 等服务。
- [ ] Standalone 模式下：经成员确认后自包含生成独立 DB/Redis 与 Bridge 网络。
- [ ] 前端 Node 直接挂载源码，严禁为 `node_modules` 单独创建命名卷。
- [ ] 所有服务（前端、后端、Python、Java、.NET、Go）的端口均遵循双层优先级解析：第一层 = 既有代码配置（如 5173、3000、8080 等），第二层 = 框架默认约定（Node: 3000/3001, PHP: 9000/80/8080, Python: 8000/8080, Java: 8080, .NET: 5000/8080）。
- [ ] `frontend-dev.sh` 正确感知包管理器（`pnpm`/`yarn`/`npm`）并将开发服务器绑定至 `0.0.0.0` 及解析后的端口（`${FRONTEND_DEV_PORT}`）。
- [ ] 辅助 Worker（queue、schedule、search）复用应用镜像，纯内部运行不向外暴露路由。
- [ ] `Makefile` 仅生成在工作区根目录；**严禁在 `docker/` 下残留 `Makefile`**。
- [ ] `docker/router.txt` 携带工作区 key（`"${PROJECT_SLUG}": { ... }`）且仅包含浏览器公共入口。
- [ ] 生成前已完成公共服务提醒并通过 `AskQuestion` 向成员确认网关使用偏好。

