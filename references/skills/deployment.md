# Skill: `/deployment`

## Name
`deployment`

## Usage (Command/Trigger)
- Call via slash command: `/deployment`
- Used to document system deployment topologies and CI/CD pipelines in Phase 0 / Phase 4 (`architecture/07-deployment-view.md`).

## Input
- Cloud provider details, containerization strategy, environment topologies (Dev, Staging, Prod).

## Output
- Arc42 deployment view documentation: Docker Compose setups, Kubernetes manifests, reverse proxy gateways, TLS certificates.

## Description
- Models physical and virtual infrastructure hosting the codebase.
- Details Central Gateway routing, environment variables, and network topologies.

---

## Example Prompt

```text
/deployment

Document Docker container topology for local development, connecting project containers to Central Docker Gateway network (base_shared_net).
```
