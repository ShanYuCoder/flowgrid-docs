---
name: build-env
description: "/build-env — Automatically construct a Docker environment for running the codebase, relying on the common gateway for proxying and heavy services."
disable-model-invocation: true
---

> [!CRITICAL] MANDATORY PRE-FLIGHT
> **[MANDATORY]** Re-read this entire `SKILL.md` via file-read tool. STRICTLY FORBIDDEN to rely on memory. All harness skills MUST be authored in English only.

# /build-env — Local Code Runner Environment Construction

## 1. Context & Central Gateway Architecture
The local development environment strictly relies on a **Central Docker Gateway** (located at `~/gateway`, running on the external network `base_shared_net`), which handles Nginx reverse proxying, SSL wildcard certificates (`dev-rootCA.crt`), and common infrastructure services.

**[MANDATORY] Gateway-Provided Services:** The Agent MUST NOT build or declare containers in project compose for the following services, as they are already provided and maintained centrally by the Gateway:
- **HTTP/HTTPS & TLS Routing:** Nginx reverse proxy (`gateway-nginx` on port 80/443 with wildcard TLS).
- **Relational Databases:** MySQL 8.4 (`mysql`), MySQL 8.0 (`mysql-80`), PostgreSQL 17 (`postgres` / alias `saas-postgres`).
- **Cache & Key-Value:** Redis 7 (`redis` on port 6379).
- **Object Storage & Cloud Mock (S3 / SQS / SNS):** LocalStack 3.7 (`localstack` on port 4566) + StackPort UI (`stackport` on port 8080 / `https://stackport.local.com`). *Note: LocalStack provides S3 object storage; projects MUST NOT spin up redundant MinIO or S3 containers.*
- **Database Admin UIs:** phpMyAdmin (`phpmyadmin`), pgAdmin 4 (`pgadmin`), Redis Commander (`redis-commander`).
- **Testing & Mock Tools:** Mailpit (`mailpit` SMTP 1025 / UI `http://mail.local.com`), Mock API (`mock-api` on port 4000).

**Rule for Project Services:** Projects MUST ONLY build/run services internally if Central Gateway does NOT already provide them (e.g., application runtimes like PHP-FPM / Node.js, queue/schedule CLI workers, or project-specific datastores like Meilisearch).


---

## 2. Docker Archaeology: Re-using Existing Docker Configurations
**[CRITICAL MANDATORY RULE]** Before generating any new Docker configuration, the Agent MUST thoroughly inspect the project repository (e.g., in `local/`, `dev/`, `_docker/`, `prod/`, `docker/` subdirectories):
1. **Never invent Dockerfiles from scratch** if the codebase already contains an existing `Dockerfile` defining language versions, system dependencies, and PECL extensions (GD, Redis, Swoole, BCMath, Sockets, etc.).
2. **Re-use or adapt existing Dockerfiles:**
   - Either point `build.context` directly to the existing project docker folder (e.g., `context: ${PROJECT_WORKSPACE}/backend/_docker/php`).
   - Or adapt the existing Dockerfile into `docker/php/Dockerfile`: strip out Nginx/Supervisor/DB layers and retain ONLY the application runtime (e.g., PHP-FPM or Swoole).
3. **Preserve exact extensions & settings:** Match `php.ini`, `fpm-pool.conf` / `www.conf`, and required compilation flags from the project's golden sample.

---

## 3. Standard Environment Structure
The Agent MUST construct a self-contained `docker/` directory matching the enterprise standard seen in `~/docker-external` and `~/docker-webbeds`:

```text
<workspace>/
├── Makefile                    # Workspace root Makefile (convenient up/down from root)
└── docker/
    ├── docker-compose.yml      # Multi-service compose configuration
    ├── .env                    # Active local environment variables
    ├── .env.example            # Environment template
    ├── Makefile                # DevOps operational targets
    ├── router.txt              # Central Gateway route snippet (to paste into ~/gateway/routes.json)
    ├── node/
    │   └── frontend-dev.sh     # Node/Vite/Nuxt startup & auto-install script
    └── php/ (or python/, etc.)
        ├── Dockerfile          # Adapted runtime Dockerfile (if custom build needed)
        ├── php.ini             # Local PHP configuration overrides
        └── fpm-pool.conf       # PHP-FPM worker pool configuration (www.conf)
```

---

## 4. Docker-Compose Specifications

To mimic standard enterprise architectures (`~/docker-external` & `~/docker-webbeds`), `docker/docker-compose.yml` MUST follow these exact conventions:

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
- Containers MUST follow the naming pattern: `${PROJECT_NAME:-dev}_${PROJECT_SLUG}_<service>` (e.g., `dev_hktv_php_83`, `dev_hktv_node`, `dev_hktv_octane`).

### B. Shared Gateway Network
All services MUST connect to the gateway's external shared network:
```yaml
networks:
  base-shared:
    name: ${BASE_SHARED_NETWORK_NAME:-base_shared_net}
    external: true
```
Every service definition in compose MUST specify:
```yaml
    networks:
      - base-shared
```

### C. Node.js Frontend Service
- **NO custom Dockerfile:** Do NOT create a `node/Dockerfile`. Directly use the official Node LTS image:
  ```yaml
  frontend-node:
    image: ${NODE_IMAGE:-node:18.19-bookworm} # or node:20-bookworm matching project
    container_name: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_frontend_node
    working_dir: /workspace/${FRONTEND_REPO}
    command: ["/bin/sh", "/opt/dev/frontend-dev.sh"]
    environment:
      <<: *dev-ca-env
      CHOKIDAR_USEPOLLING: "true"
    volumes:
      - ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}
      - ./node/frontend-dev.sh:/opt/dev/frontend-dev.sh:ro
      - ${GATEWAY_CERTS_DIR:-/home/vutv/gateway/certs}/dev-rootCA.crt:/opt/gateway-certs/dev-rootCA.crt:ro
    networks:
      - base-shared
  ```
- **[CRITICAL] DO NOT Separate `node_modules` Volume:**
  - **STRICTLY FORBIDDEN** to create named volumes like `frontend_node_modules:/.../node_modules`.
  - Simply mount the entire frontend source repository directly:
    `- ${PROJECT_WORKSPACE}/${FRONTEND_REPO}:/workspace/${FRONTEND_REPO}`
  - Mounting the whole source directory already includes `node_modules`. This keeps host IDE and container 100% in sync, eliminates file lock issues, and avoids useless named volumes.

### D. Package Manager Detection in `frontend-dev.sh`
The wrapper script `docker/node/frontend-dev.sh` MUST detect and support the project's actual package manager (`pnpm`, `yarn`, `npm`):
```sh
#!/bin/sh
set -eu
cd /workspace/${FRONTEND_REPO}

# Auto-detect package manager from lockfiles
if [ -f pnpm-lock.yaml ]; then
  if ! command -v pnpm >/dev/null 2>&1; then
    corepack enable
    corepack prepare pnpm@latest --activate
  fi
  if [ ! -d node_modules ]; then
    pnpm install
  fi
  exec pnpm run dev -- --host 0.0.0.0 --port 3000
elif [ -f yarn.lock ]; then
  if [ ! -d node_modules ]; then
    yarn install
  fi
  exec yarn dev --host 0.0.0.0 --port 3000
else
  if [ ! -d node_modules ]; then
    npm install
  fi
  exec npm run dev -- --host 0.0.0.0 --port 3000
fi
```
- **[CRITICAL] Port Rule:** Frontend dev server MUST bind to `0.0.0.0:3000`. **Port 5173 is STRICTLY FORBIDDEN** (reserved exclusively for VitePress docs tooling).

---

## 5. Supplementary Services: Keep Them Internal & Minimal
Supplementary workers and project-specific services MUST follow these strict rules:

1. **Services Already in Gateway (NEVER build locally):**
   - **Database & Cache:** MySQL (`mysql:3306`), Postgres (`postgres:5432`), Redis (`redis:6379`).
   - **Object Storage / S3 / SQS:** Handled by Gateway's `localstack:4566`. **NEVER spin up a local MinIO container!** The project's `.env` should point `AWS_ENDPOINT=http://localstack:4566` (viewable via StackPort UI `https://stackport.local.com`).
   - **Email:** Handled by Gateway's `mailpit:1025` (UI: `http://mail.local.com`).

2. **Queue & Schedule Workers (Internal to Project):**
   - **DO NOT build separate Dockerfiles:** Dedicated worker containers MUST directly re-use the application's existing PHP image (e.g., `image: ${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php`).
   - Simply override the execution command:
     - Queue: `command: ["php", "artisan", "queue:work"]`
     - Schedule: `command: ["php", "artisan", "schedule:work"]`
   - **Internal-Only:** These workers run background CLI tasks and do NOT receive HTTP traffic. NEVER expose them to Central Gateway or `router.txt`.

3. **Missing Services (e.g., Meilisearch, Selenium/Crawler):**
   - If the codebase strictly requires a datastore or tool NOT present in Gateway (e.g., `meilisearch`), declare it internally in project compose using the official image directly (`image: getmeili/meilisearch:v1.15.2`). **DO NOT create a custom Dockerfile!**
   - Backend containers communicate with it internally via Docker network alias (e.g., `http://meilisearch:7700`). Do NOT expose to Central Gateway.

4. **Laravel Octane / Reverb (if present):**
   - If Octane is used as the primary HTTP server instead of PHP-FPM, it serves API traffic on port 8000.
   - If Reverb is used, it handles WebSocket connections on port 6001.


---

## 6. Gateway Routing Configuration (`docker/router.txt`)
The Central Gateway (`~/gateway/routes.json`) ONLY needs routing for **public entry points accessible from the developer's browser**:
- **Backend API:** 1 route pointing to the PHP-FPM container (FastCGI `role: "web"`) or Octane (HTTP `role: "node"`, port 8000).
- **Frontend Web:** 1 route pointing to the Node dev server (HTTP `role: "node"`, port 3000).
- *(Optional)* WebSocket: Only if browser connects directly to a WebSocket server like Reverb.
- **NEVER include internal background services** (Queue, Schedule, Meilisearch, Redis, DB) in `router.txt`!

Example clean `docker/router.txt`:
```json
"${PROJECT_SLUG}": {
  "external": true,
  "sites": [
    {
      "host": "${PROJECT_SLUG}-api.local.com",
      "role": "web",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_php",
      "docroot": "/var/www/html/public"
    },
    {
      "host": "${PROJECT_SLUG}.local.com",
      "role": "node",
      "container": "${PROJECT_NAME:-dev}_${PROJECT_SLUG}_frontend_node",
      "port": 3000
    }
  ]
}
```
*Note on Gateway Roles:*
- `role: "web"` with `docroot`: For PHP-FPM FastCGI proxying (port 9000).
- `role: "node"` with `port`: For any HTTP/WebSocket reverse proxying (Frontend dev servers, Octane, Reverb).

---

## 7. Makefile Generation Rule
The Agent MUST generate a `Makefile` at the **workspace root** (pointing to `docker/docker-compose.yml` with `--env-file docker/.env`), and a matching `docker/Makefile`:

```makefile
DCX := docker compose -f docker/docker-compose.yml --env-file docker/.env

MAKEFLAGS += --no-print-directory

.PHONY: help up down restart ps logs build

help:
	@echo "  make up | down | restart | ps | logs | build"

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

## 8. Verification Checklist
- [ ] Existing codebase scanned for existing `Dockerfile` / `docker-compose.yml` before generating.
- [ ] No Gateway services (Nginx, MySQL, Redis) generated in compose.
- [ ] Node frontend mounts source code directly; NO named volume for `node_modules`.
- [ ] Node frontend uses official Node LTS image directly (NO custom `node/Dockerfile`).
- [ ] `frontend-dev.sh` detects `pnpm` / `yarn` / `npm` and binds to `0.0.0.0:3000` (NOT 5173).
- [ ] Supplementary workers (queue, schedule, search) reuse images / official images and run strictly internal to the project network without Gateway routes.
- [ ] All services join external network `base-shared` (`BASE_SHARED_NETWORK_NAME`).
- [ ] Gateway CA certificate (`dev-rootCA.crt`) mounted with `NODE_EXTRA_CA_CERTS` & `CURL_CA_BUNDLE`.
- [ ] `Makefile` generated at workspace root and inside `docker/`.
- [ ] `docker/router.txt` generated with only public browser entry points (API + Web), matching `~/gateway/routes.json` schema.

