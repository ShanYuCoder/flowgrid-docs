---
name: build-env
description: "/build-env — Automatically construct a standardized Docker local development environment for running the codebase, supporting both Central Gateway mode and Standalone Full-Build mode."
disable-model-invocation: true
---

# /build-env — Local Code Runner Environment Construction

## 1. Philosophy: Global Portability & Synthesized Gateway Knowledge

FlowGrid is an open-source, public tool designed for developers worldwide across **Linux, macOS, and Windows/WSL**. 

### A. Zero Host-Gateway Sniffing
- **Strict Prohibition on Host Archaeology:** The Agent MUST NEVER scan host machine paths (such as `~/gateway`, `C:\gateway`, or `/home/*`), and MUST NEVER attempt to inspect host Docker networks or read `~/gateway/routes.json`.
- FlowGrid does NOT know and DOES NOT CARE what routes are active in the developer's host gateway.
- FlowGrid does NOT assume the developer has a gateway installed or that it is located at any specific file path.

### B. Pre-Synthesized Gateway Topology
Instead of dynamic host inspection, FlowGrid embeds **pre-compiled, synthesized enterprise knowledge** of the standard Central Gateway architecture (derived from enterprise golden patterns like `docker-external` and `docker-gateway`):
- **HTTP/HTTPS & Wildcard TLS Routing:** Nginx reverse proxy (`gateway-nginx` on port 80/443 with wildcard TLS `*.local.com`).
- **Relational Databases:** MySQL 8.4 (`mysql:3306`), MySQL 8.0 (`mysql-80:3306`), PostgreSQL 17 (`postgres:5432` / alias `saas-postgres`).
- **Cache & Key-Value:** Redis 7 (`redis:6379`).
- **Object Storage & Cloud Mock (S3 / SQS / SNS):** LocalStack 3.7 (`localstack:4566`) + StackPort UI (`stackport:8080` / `https://stackport.local.com`). *LocalStack provides standard S3 emulation; projects MUST NOT spin up redundant MinIO containers.*
- **Database Admin UIs:** phpMyAdmin (`phpmyadmin`), pgAdmin 4 (`pgadmin`), Redis Commander (`redis-commander`).
- **Testing & Mock Tools:** Mailpit (`mailpit` SMTP port 1025 / Web UI port 8025 / `http://mail.local.com`), Mock API (`mock-api:4000`).
- **Shared Gateway Network (`GATEWAY_NETWORK_NAME`):**
  - **Critical Note on Network Configuration:** Network names such as `base_shared_net` are personal configuration examples from specific developer setups and are NOT universal standards.
  - The shared external Docker network is defined in the **Gateway's own `.env` file** on the developer's host machine (or defined by the developer's infrastructure team).
  - The project's `docker/.env` exposes `GATEWAY_NETWORK_NAME=base_shared_net` as a default placeholder.
  - **Member Adjustment Requirement:** The member setting up the project MUST inspect their Gateway's `.env`, verify the actual network name, and configure `GATEWAY_NETWORK_NAME` in `docker/.env` to match it identically before starting containers.

---

## 2. Docker Archaeology: Re-using Existing Docker Configurations

**[CRITICAL MANDATORY RULE]** Before generating any new Docker configuration, the Agent MUST thoroughly inspect the project repository (e.g., in `local/`, `dev/`, `_docker/`, `prod/`, `docker/` subdirectories):
1. **Never invent Dockerfiles from scratch** if the codebase already contains an existing `Dockerfile` defining language versions, system dependencies, and PECL extensions (GD, Redis, Swoole, BCMath, Sockets, etc.).
2. **Re-use or adapt existing Dockerfiles:**
   - Either point `build.context` directly to the existing project docker folder (e.g., `context: ${PROJECT_WORKSPACE}/backend/_docker/php`).
   - Or adapt the existing Dockerfile into `docker/php/Dockerfile`: strip out Nginx/Supervisor/DB layers and retain ONLY the application runtime (e.g., PHP-FPM or Swoole).
3. **Preserve exact extensions & settings:** Match `php.ini`, `fpm-pool.conf` / `www.conf`, and required compilation flags from the project's golden sample.

### 2.1. Port Resolution Strategy (Across BE, FE, and All Stacks)

When determining listening ports for any container (Backend, Frontend, Workers, or custom microservices), the Agent MUST follow this strict 2-tier priority hierarchy:

1. **Priority 1: Existing Code & Configuration Archaeology (Highest Priority):**
   - The Agent MUST inspect the project code for existing port definitions before assigning any port:
     - **Frontend / Node.js:** Check `vite.config.*`, `nuxt.config.*`, `next.config.*`, `package.json` scripts (`--port <num>`), or repo `.env` / `.env.local` files (e.g., `PORT=5173`, `PORT=3000`, `VITE_PORT=...`).
     - **Backend / PHP:** Check Nginx / Apache configs, `php-fpm.d/www.conf` (`listen`), Octane / Reverb startup options (`--port=8000`, `--port=6001`).
     - **Python (FastAPI, Flask, Django):** Check Uvicorn / Gunicorn commands (`--port <num>`), `Dockerfile` EXPOSE directives, or `settings.py`.
     - **Java / Kotlin (Spring Boot, Quarkus):** Check `application.properties` / `application.yml` (`server.port`).
     - **.NET (C#):** Check `appsettings.json` or `launchSettings.json` (`applicationUrl`).
     - **Go:** Check flags or environment variables in `main.go`.
   - **MANDATORY INVARIANT:** If the existing codebase is already configured to use a specific port (e.g. `5173` for Vite, `3000` for Nuxt, `8080` for Spring/FastAPI, etc.), the Agent **MUST prioritize and adopt that exact port**. There is NO universally forbidden port; project code configuration always takes precedence.

2. **Priority 2: Standard Framework & Library Conventional Defaults (Fallback):**
   - If the codebase does NOT explicitly specify a port, fall back to the conventional default ports for that ecosystem:
     - **Node.js (Vue, Nuxt, Next.js, Express, NestJS):** Default to `3000`, `3001`, `3002`... (or `5173` if unconfigured Vite).
     - **PHP (Laravel, Symfony, WordPress):**
       - FastCGI: `9000`
       - HTTP / Web: `80`, `8080`, `8000`
       - Octane: `8000`
       - Reverb (WebSocket): `6001`
     - **Python (FastAPI, Flask, Django):** Default to `8000`, `8080`, `5000` (Flask).
     - **Java / Kotlin (Spring Boot, Quarkus):** Default to `8080`, `8443`.
     - **.NET / C# (ASP.NET Core):** Default to `5000`, `5001`, `8080`.
     - **Go (Gin, Fiber, Echo):** Default to `8080`, `3000`.

---

## 3. Standard Environment Structure

The Agent MUST construct a clean, self-contained `docker/` directory matching the enterprise standard:

```text
<workspace>/
├── Makefile                    # Workspace root Makefile (convenient up/down/logs from root)
└── docker/
    ├── docker-compose.yml      # Multi-service compose configuration
    ├── .env                    # Active local environment variables (member-adjusted)
    ├── .env.example            # Environment template with full enterprise parameters
    ├── router.txt              # Central Gateway route snippet with workspace key
    ├── node/
    │   └── frontend-dev.sh     # Node/Vite/Nuxt startup & auto-install script
    └── php/ (or python/, etc.)
        ├── Dockerfile          # Adapted runtime Dockerfile (if custom build needed)
        ├── php.ini             # Local PHP configuration overrides
        └── fpm-pool.conf       # PHP-FPM worker pool configuration (www.conf)
```

> [!IMPORTANT] NO `docker/Makefile`
> The `Makefile` has been elevated to the **workspace root** for streamlined developer ergonomics. The Agent **STRICTLY MUST NOT generate a `Makefile` inside `docker/`**. Only one canonical `Makefile` exists at the workspace root.

### 3.1. Enterprise `.env.example` & `.env` Schema (Complete External-Docker Standard)

> [!CAUTION] MEMBER ADJUSTMENT INVARIANT — FULL SCHEMA, MEMBER CUSTOMIZES (NO ZERO-TOUCH ILLUSION)
> FlowGrid generates a **complete, production-grade Docker configuration modeled after enterprise setups (like `docker-external`) with exhaustive environment variables in `docker/.env` and `docker/.env.example`**.
> **It is NOT designed or expected to run out-of-the-box immediately without human intervention.**
> The configuration values in `docker/.env` are intentional sensible defaults and placeholders for the **team member to review and self-adjust** (e.g., matching `GATEWAY_NETWORK_NAME` to their Gateway's actual network, adjusting database credentials, repo sub-paths, or cert paths) to match their personal workstation.
> The Agent MUST NOT attempt automated startup tests or assume zero-config instant execution; it MUST clearly instruct the member to inspect and fine-tune `docker/.env` before executing `make up`.

The Agent MUST populate `docker/.env.example` and `docker/.env` with the following comprehensive sections:

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
# [MANDATORY MEMBER CONFIGURATION]:
# "base_shared_net" is only a personal example. The shared network name is configured
# in your Gateway's own .env file. You MUST check your Gateway's .env and set
# GATEWAY_NETWORK_NAME to match that exact network name!
###############################################################################
GATEWAY_NETWORK_NAME=base_shared_net
GATEWAY_CERTS_DIR=~/.gateway/certs

###############################################################################
# Domains & Routing Hosts (Must match docker/router.txt)
###############################################################################
BACKEND_HOST=myproject-api.local.com
FRONTEND_HOST=myproject.local.com
OCTANE_HOST=myproject-octane.local.com
REVERB_HOST=myproject-reverb.local.com

###############################################################################
# Application Runtimes & Source Mount Paths
# Adjust paths to match your local repository directory structure
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
# Central Gateway Shared Infrastructure (Adjust to match your Gateway .env)
###############################################################################
# Database (MySQL 8.4/8.0 or PostgreSQL 17 on Gateway)
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=myproject_db
DB_USERNAME=root
DB_PASSWORD=root

# Cache & Key-Value (Redis on Gateway)
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=null

# Object Storage / Cloud Mock (LocalStack on Gateway)
AWS_ENDPOINT=http://localstack:4566
AWS_ACCESS_KEY_ID=test
AWS_SECRET_ACCESS_KEY=test
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=myproject-bucket

# Mail Testing Sandbox (Mailpit on Gateway)
MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="no-reply@myproject.local.com"
MAIL_FROM_NAME="${PROJECT_SLUG}"

# Mock API (Mock Server on Gateway)
MOCK_API_URL=http://mock-api:4000

###############################################################################
# Standalone Fallback Port Mappings (Used ONLY if running without Gateway)
###############################################################################
STANDALONE_HTTP_PORT=8080
STANDALONE_DB_PORT=3306
STANDALONE_REDIS_PORT=6379
STANDALONE_MAIL_PORT=8025
```

---

## 4. Docker-Compose Specifications (Gateway Mode)

When operating in Central Gateway mode, `docker/docker-compose.yml` follows these exact conventions:

### A. Project Name & Service Naming
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
- Containers MUST follow the naming pattern: `${PROJECT_NAME:-dev}_${PROJECT_SLUG}_<service>` (e.g., `dev_portal_php_83`, `dev_portal_node`, `dev_portal_octane`, `dev_portal_reverb`).

### B. Shared Gateway Network
All services MUST connect to the gateway's external shared network configured via variable:
```yaml
networks:
  gateway-shared:
    name: ${GATEWAY_NETWORK_NAME:-base_shared_net}
    external: true
```
Every service definition in compose specifies:
```yaml
    networks:
      - gateway-shared
```

### C. Node.js Frontend Service
- **NO custom Dockerfile:** Do NOT create a `node/Dockerfile`. Directly use the official Node LTS image:
  ```yaml
  frontend-node:
    image: ${NODE_IMAGE:-node:20-bookworm} # or node:18.19-bookworm matching project
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
- **[CRITICAL] DO NOT Separate `node_modules` Volume:**
  - **STRICTLY FORBIDDEN** to create named volumes like `frontend_node_modules:/.../node_modules`.
  - Simply mount the entire frontend source repository directly:
    `- ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}`
  - Mounting the whole source directory already includes `node_modules`. This keeps host IDE and container 100% in sync, eliminates file lock issues, and avoids useless named volumes.

### D. Package Manager & Port Binding in `frontend-dev.sh`
The wrapper script `docker/node/frontend-dev.sh` MUST detect and support the project's actual package manager (`pnpm`, `yarn`, `npm`) and bind to the resolved port (`${FRONTEND_DEV_PORT:-3000}`):
```sh
#!/bin/sh
set -eu
cd /workspace/${FRONTEND_REPO}

PORT="${FRONTEND_DEV_PORT:-3000}"

# Auto-detect package manager from lockfiles
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
- **Port Binding Rule:** All dev servers MUST bind to `0.0.0.0` (to accept requests through Docker network / Gateway) using the resolved port (`${FRONTEND_DEV_PORT}`, e.g. `5173`, `3000`, or whatever was discovered from code or conventional defaults).

---

## 5. Supplementary Services: Keep Them Internal & Minimal

Supplementary workers and project-specific services follow these strict rules:

1. **Services Synthesized from Gateway (NEVER duplicate locally in Gateway Mode):**
   - **Database & Cache:** MySQL (`mysql:3306`), Postgres (`postgres:5432`), Redis (`redis:6379`).
   - **Object Storage / S3 / SQS:** Handled by Gateway's `localstack:4566`. **NEVER spin up a local MinIO container!** The project's `.env` points `AWS_ENDPOINT=http://localstack:4566` (viewable via StackPort UI `https://stackport.local.com`).
   - **Email:** Handled by Gateway's `mailpit:1025` (UI: `http://mail.local.com`).

2. **Queue & Schedule Workers (Internal to Project):**
   - **DO NOT build separate Dockerfiles:** Dedicated worker containers MUST directly re-use the application's existing PHP image (e.g., `image: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php`).
   - Simply override the execution command:
     - Queue: `command: ["php", "artisan", "queue:work"]`
     - Schedule: `command: ["php", "artisan", "schedule:work"]`
   - **Internal-Only:** These workers run background CLI tasks and do NOT receive HTTP traffic. NEVER expose them to Central Gateway or `router.txt`.

3. **Project-Unique Datastores (e.g., Meilisearch):**
   - If the codebase strictly requires a datastore NOT present in Gateway (e.g., `meilisearch`), declare it internally in project compose using the official image directly (`image: getmeili/meilisearch:v1.15.2`). **DO NOT create a custom Dockerfile!**
   - Backend communicates internally via Docker network alias (e.g., `http://meilisearch:7700`). Do NOT expose to Central Gateway.

4. **Laravel Octane / Reverb (if present):**
   - If Octane is used as the primary HTTP server instead of PHP-FPM, it serves API traffic on port 8000 (`role: "node"` in `router.txt`).
   - If Reverb is used, it handles WebSocket connections on port 6001 (`role: "node"` in `router.txt`).

---

## 6. Gateway Routing Configuration (`docker/router.txt`)

The Central Gateway (`routes.json`) ONLY needs routing for **public entry points accessible from the developer's browser**:
- **Backend API (FastCGI):** 1 route pointing to the PHP-FPM container (`role: "web"` on port 9000, with `docroot`).
- **Backend API (HTTP / Octane):** 1 route pointing to Octane (`role: "node"`, port 8000).
- **Frontend Web:** 1 route pointing to the Node dev server (`role: "node"`, port matching `${FRONTEND_DEV_PORT}`, e.g. 3000, 5173, etc.).
- **WebSocket (Reverb):** 1 route pointing to Reverb (`role: "node"`, port 6001).
- **NEVER include internal background services** (Queue, Schedule, Meilisearch, Redis, DB) in `router.txt`!

### Canonical `docker/router.txt` Format (Scoped by Workspace Key)

The snippet MUST be keyed by the workspace slug (e.g., `"portal"`), allowing direct copy-paste into the root object of the Central Gateway's `routes.json`:

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

*Role Schema Specification:*
- `role: "web"`: Requires `"container"` and `"docroot"`. Configures Nginx FastCGI pass to PHP-FPM container on port 9000.
- `role: "node"`: Requires `"container"` and `"port"`. Configures standard HTTP / WebSocket reverse proxy pass.

---

## 7. Gateway Fallback Alert & AskQuestion Confirmation (Standalone Mode)

To accommodate developers who **do not have or do not use Central Docker Gateway**, `/build-env` MUST perform an interactive confirmation step before finalizing the configuration.

### A. Pre-Flight Infrastructure Alert
The Agent MUST clearly display the list of shared infrastructure services that are presumed to run centrally:
```text
[Gateway Infrastructure Check]
The standard FlowGrid environment assumes the following services run in Central Gateway:
• Shared Network: Configured in Gateway .env (e.g. GATEWAY_NETWORK_NAME=base_shared_net)
• Reverse Proxy: Nginx (port 80/443, wildcard *.local.com TLS)
• Databases: MySQL 8.4/8.0 (3306), PostgreSQL 17 (5432)
• Cache: Redis 7 (6379)
• Object Storage / S3 / SQS: LocalStack 3.7 (4566)
• Email Sandbox: Mailpit (1025 / 8025)
• Admin Portals: phpMyAdmin, pgAdmin, Redis Commander, StackPort
```

### B. Interactive Mode Selection (`AskQuestion`)
The Agent prompts the member:
- **Question:** *"Are you using Central Docker Gateway for shared infrastructure services?"*
- **Option 1 (Recommended):** `"(Recommended) Yes, use Central Gateway — Lean compose attached to GATEWAY_NETWORK_NAME + export docker/router.txt"`
- **Option 2:** `"No, build Full Standalone — Self-contained compose with local Nginx/ports, MySQL, Redis, and internal network"`

### C. Standalone Full-Build Execution (When Answer is "No")
If the member selects Standalone Full-Build mode:
1. **Internal Docker Network:** Replace `gateway-shared` with a dedicated internal bridge network:
   ```yaml
   networks:
     default:
       name: ${PROJECT_SLUG}_net
       driver: bridge
   ```
2. **Include Core Infrastructure Containers:**
   - Add a dedicated `mysql` (or `postgres`) container with persistent named volume (e.g. `${PROJECT_SLUG}_mysql_data:/var/lib/mysql`).
   - Add a dedicated `redis` container.
   - If mail testing is needed, add a standalone `mailpit` container.
3. **Port Mapping for Local Access:**
   - Either expose direct host ports (e.g., Backend on `8080`, Frontend on `3000`, MySQL on `3306`, Redis on `6379`).
   - Or provision a lightweight project-level Nginx container in `docker/nginx/`.
4. **Environment Configuration (`.env`):**
   - Point `DB_HOST=mysql`, `REDIS_HOST=redis` to internal service names.
5. **No `router.txt` Required:** Skip `docker/router.txt` generation as all traffic is accessed directly via mapped localhost ports.

### D. Post-Generation Instruction: Member Review & Adjustment
Immediately after writing files, the Agent MUST print a clear guidance message:
> "Docker environment generated successfully!
> Please review and adjust `docker/.env` to match your local setup:
> 1. Set `GATEWAY_NETWORK_NAME` to match your Gateway's actual shared network.
> 2. Verify `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`, and `AWS_BUCKET`.
> 3. Verify `GATEWAY_CERTS_DIR` if custom wildcard SSL certificates are mounted.
> 4. If using Gateway, copy `docker/router.txt` into your Gateway's `routes.json`.
> Then start containers with: `make up`"

---

## 8. Root Makefile Specification

The Agent MUST generate a clean `Makefile` strictly at the **workspace root** (pointing to `docker/docker-compose.yml` with `--env-file docker/.env`):

```makefile
DCX := docker compose -f docker/docker-compose.yml --env-file docker/.env

MAKEFLAGS += --no-print-directory

.PHONY: help up down restart ps logs build exec-backend exec-frontend

help:
	@echo "Available commands:"
	@echo "  make up            - Start project containers in background"
	@echo "  make down          - Stop and remove project containers"
	@echo "  make restart       - Restart project containers"
	@echo "  make ps            - List running project containers"
	@echo "  make logs          - Tail container logs"
	@echo "  make build         - Build or rebuild service images"
	@echo "  make exec-backend  - Open shell in backend container"
	@echo "  make exec-frontend - Open shell in frontend container"

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

## 9. Verification Checklist

- [ ] Codebase scanned for existing `Dockerfile` / `docker-compose.yml` before generating.
- [ ] NO dynamic scanning of host paths performed; pre-synthesized Gateway topology used.
- [ ] Comprehensive `docker/.env.example` and `docker/.env` generated with full enterprise parameters (matching external Docker standard).
- [ ] Explicit note added that `base_shared_net` is an example; member must align `GATEWAY_NETWORK_NAME` with their Gateway's `.env`.
- [ ] Member explicitly instructed that `docker/.env` is meant for self-adjustment before running `make up` (no zero-touch illusion).
- [ ] In Gateway Mode: No duplicate Gateway services (Nginx, MySQL, Redis, MinIO) generated in compose.
- [ ] In Standalone Mode: Self-contained compose generated with local DB/Redis and bridge network upon member confirmation.
- [ ] Node frontend mounts source code directly; NO named volume for `node_modules`.
- [ ] Ports for all services (FE, BE, Python, Java, .NET, Go) resolved via 2-tier priority: Priority 1 = existing code config (e.g. 5173, 3000, 8080), Priority 2 = framework conventions (Node: 3000/3001, PHP: 9000/80/8080, Python: 8000/8080, Java: 8080, .NET: 5000/8080).
- [ ] `frontend-dev.sh` detects package manager (`pnpm`/`yarn`/`npm`) and binds dev server to `0.0.0.0` on the resolved port (`${FRONTEND_DEV_PORT}`).
- [ ] Supplementary workers (queue, schedule, search) reuse images / official images and run strictly internal to the project network without Gateway routes.
- [ ] `Makefile` generated ONLY at workspace root; **NO `Makefile` inside `docker/`**.
- [ ] `docker/router.txt` generated with workspace key (`"${PROJECT_SLUG}": { ... }`) containing only public browser entry points (API + Web + Octane/Reverb).
- [ ] AskQuestion confirmation alert executed before finalizing environment mode.

