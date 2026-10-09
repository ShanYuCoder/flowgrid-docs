---
name: build-env
description: "/build-env — Automatically construct a Docker environment for running the codebase, relying on the common gateway for proxying and heavy services."
disable-model-invocation: true
---

> [!CRITICAL] MANDATORY PRE-FLIGHT
> **[MANDATORY]** Re-read this entire `SKILL.md` via file-read tool. STRICTLY FORBIDDEN to rely on memory. All harness skills MUST be authored in English only.

# /build-env — Local Code Runner Environment Construction

## 1. Context & Gateway Reliance
The environment relies on a **Central Docker Gateway** which provides the Nginx proxy and common heavy services (e.g., MySQL, PostgreSQL, LocalStack, Mock Servers).
Therefore, individual projects **ONLY** need Docker containers to run the application code for **Local Development**. The Agent MUST build a dedicated service container for each unique code repository/module (e.g., `php-82`, `node`, `python`).

## 2. Tech Stack & Version Detection
- **[MANDATORY]** Parse dependency files (`package.json`, `composer.json`, `requirements.txt`) or `inition-inventory.md`.
- Ensure each Dockerfile uses the EXACT matching version of the language/framework required (e.g., `php-82`, `node-20`, `python-3.10`).
- Ensure required language/system extensions (e.g., `php-mbstring`, `pdo_mysql`, `opencv-python`) are installed via `apt-get` or `docker-php-ext-install`.

## 3. Creating the Local Dev Docker Environment
- **[MANDATORY]** Create a folder named `docker/` containing:
  1. `Dockerfile`s for each distinct code service.
  2. `docker-compose.yml` defining ALL the application code services.
  3. `Makefile` containing operational commands (`up`, `down`, `logs`, `exec-*`).
  4. `.env.example` mapping necessary variables (`PROJECT_WORKSPACE`, `HOST_UID`).
  
### [CRITICAL] Realtime Hosting / Hot-Reloading Rule
Because this is a **Local Development** environment, containers MUST NOT run production build commands. They MUST run dev servers that watch for file changes:
- **Node.js (Vue/React/Next/Nuxt):** Command MUST be `npm run dev` or a dev script.
- **Python:** Command MUST include hot-reloading (e.g., `uvicorn main:app --reload`).
- **PHP:** `php-fpm -F` is sufficient.

### [CRITICAL] Advanced Docker-Compose Configurations
To mimic standard enterprise architectures (like `docker-external`), the `docker-compose.yml` MUST incorporate:
1. **User Permission Mapping:** Add `user: "${HOST_UID:-1000}:${HOST_GID:-1000}"` to all services to avoid root-owned files on the host.
2. **Gateway SSL Certificates:** Mount the Gateway's root CA to trust local HTTPS traffic.
   ```yaml
   volumes:
     - ${GATEWAY_CERTS_DIR:-~/gateway/certs}/dev-rootCA.crt:/opt/gateway-certs/dev-rootCA.crt:ro
   environment:
     - NODE_EXTRA_CA_CERTS=/opt/gateway-certs/dev-rootCA.crt
     - CURL_CA_BUNDLE=/opt/gateway-certs/dev-rootCA.crt
   ```
3. **Workspace Mounting:** Source code must be mounted. Use `${PROJECT_WORKSPACE}/repo-name:/var/www/repo-name`.
4. **Node Modules Optimization:** For Node.js services, use a named volume for `node_modules` to prevent slow syncs with the host OS.
   `- frontend_node_modules:/workspace/frontend/node_modules`

### [CRITICAL] Network Rule
The `docker-compose.yml` MUST connect all services to the gateway's external network:
```yaml
networks:
  default:
    name: ${BASE_SHARED_NETWORK_NAME:-base_shared_net}
    external: true
```

## 4. Re-using Existing Docker Configuration
- If inheriting from an existing legacy or production repository:
  - Retain ALL primary code-runner containers (e.g., `php-82`, `node`).
  - Strip out Nginx/Apache, Database, Redis.
  - **[WARNING]** Print a warning to the terminal for omitted supplementary services (e.g., workers, Selenium).

## 5. Gateway Router Configuration
- Generate `docker/router.txt` with JSON to be pasted into the Central Gateway's routing configuration file (e.g., `routes.json`).
- Must output an array of `sites` for multiple containers:
  ```json
  {
    "external": true,
    "sites": [
      {
        "host": "project-api.local.com",
        "role": "web", // "web" for PHP/FastCGI
        "container": "dev_project_php_82", 
        "docroot": "/var/www/html/public" 
      },
      {
        "host": "project-frontend.local.com",
        "role": "node", // "node" for apps with specific ports
        "container": "dev_project_node",
        "port": 3001
      }
    ]
  }
  ```

## 6. Makefile Generation Rule
- **[MANDATORY]** The Agent MUST generate a `docker/Makefile` with standard Devops commands:
  - `up`: Runs `docker compose up -d`
  - `down`: Runs `docker compose down`
  - `restart`: Runs `docker compose restart`
  - `ps`: Runs `docker compose ps -a`
  - `logs`: Runs `docker compose logs -f`
  - `exec-<service>`: Exec into the container (e.g., `exec-backend: \n\tdocker compose exec -it php-82 bash`)

## 7. Verification Checklist
- [ ] Tech stack versions accurately detected and applied to Dockerfile.
- [ ] `docker/` directory created with `Dockerfile` and `docker-compose.yml`.
- [ ] Only the code-running container is included (Nginx, databases excluded).
- [ ] Terminal warning printed if existing supplementary containers were omitted.
- [ ] `docker/router.txt` generated and printed to the terminal.
