---
name: build-env
description: "/build-env — Automatically construct a Docker environment for running the codebase, relying on the common gateway for proxying and heavy services."
disable-model-invocation: true
---

> [!CRITICAL] MANDATORY PRE-FLIGHT
> **[MANDATORY]** Re-read this entire `SKILL.md` via file-read tool. STRICTLY FORBIDDEN to rely on memory. All harness skills MUST be authored in English only.

# /build-env — Local Code Runner Environment Construction

## 1. Context & Gateway Reliance
The user's environment relies on a central **Docker Gateway** (typically at `~/gateway`) which provides the Nginx proxy and common heavy services (e.g., MySQL, PostgreSQL, LocalStack, Mock Servers).
Therefore, individual projects **ONLY** need Docker containers to run the application code itself. However, the project may require multiple application services (e.g., a PHP 8.2 container for the main API, a PHP 7.4 container for legacy code, a Node 20 container for the frontend, and a Python 3.10 container for ML models). The Agent MUST build a dedicated service container for each unique code repository/module.

## 2. Tech Stack & Version Detection
- **[MANDATORY]** Before building the environment, the Agent MUST parse the dependency files (`package.json`, `composer.json`, `requirements.txt`, etc.) or read the Tech Stack Summary from `inition-inventory.md` (if available) across the entire workspace.
- The Agent MUST ensure each Dockerfile uses the EXACT matching version of the language/framework required by its respective project (e.g., `php-82`, `php-74`, `node-20`, `python-3.10`).
- The Agent MUST ensure required language/system extensions (e.g., PHP's `php-mbstring`, `pdo_mysql`, or Python's `opencv-python`) are explicitly installed inside the respective `Dockerfile` via `apt-get` or `docker-php-ext-install`. Official base images usually lack these. Note that services like Redis/MySQL are in the gateway, so we only install their *client extensions* in the code container, not the database services themselves.

## 3. Creating the Docker Environment
- **[MANDATORY]** The Agent MUST create a folder named `docker/` in the current workspace.
- The `docker/` folder MUST contain:
  1. `Dockerfile`s (one for each distinct code service, optionally organized into subfolders like `docker/php-82/`, `docker/python/`).
  2. `docker-compose.yml` (defining ALL the application code services required).
  - **[CRITICAL NETWORK RULE]**: The `docker-compose.yml` MUST connect the service to the gateway's external network.
    ```yaml
    networks:
      default:
        name: base_shared_net
        external: true
    ```
  
## 4. Re-using Existing Docker Configuration
- If the project already has an existing `docker-compose.yml` or `docker/` setup in its source code (e.g., inherited from a production repo like `~/webbeds/source-code`):
  - **[MANDATORY]** Extract and retain ALL the primary code-runner containers (e.g., `php-82`, `php-83`, `node`, `python`).
  - **[MANDATORY]** Strip out Nginx/Apache (if used as proxy) since the gateway handles it.
  - **[MANDATORY]** Strip out Database/Redis services.
  - **[WARNING]** If additional service containers (e.g., specific workers, external mailers like Mailpit, or crawler/Selenium) exist in the original setup, DO NOT automatically include them in the primary stack. Instead, **PRINT A WARNING** to the terminal listing these omitted services, asking the member to manually add them back if explicitly needed.

## 5. Gateway Router Configuration
- **[MANDATORY]** Once the Docker environment is created, the Agent MUST generate the routing configuration required by the gateway.
- Create a file `docker/router.txt` containing the JSON snippet that the member should paste into `~/gateway/routes.json` under the `projects` object.
  - If there are multiple code containers, output an array of `sites`. Example snippet format:
    ```json
    {
      "external": true,
      "sites": [
        {
          "host": "project-api.local.com",
          "role": "web", // or "node" for frontend
          "container": "dev_project_php_82", // must match exactly the container_name in docker-compose.yml
          "docroot": "/var/www/html/public" // required for "web" (PHP)
        },
        {
          "host": "project-frontend.local.com",
          "role": "node",
          "container": "dev_project_node",
          "port": 3001
        }
      ]
    }
    ```
- **[MANDATORY]** The Agent MUST print the contents of `docker/router.txt` to the terminal so the member can immediately copy and paste it.

## 6. Verification Checklist
- [ ] Tech stack versions accurately detected and applied to Dockerfile.
- [ ] `docker/` directory created with `Dockerfile` and `docker-compose.yml`.
- [ ] Only the code-running container is included (Nginx, databases excluded).
- [ ] Terminal warning printed if existing supplementary containers were omitted.
- [ ] `docker/router.txt` generated and printed to the terminal.
