# Skill: `/deployment`

## 名称 (Name)
`deployment`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/deployment`
- Used to document system deployment topologies and CI/CD pipelines in Phase 0 / Phase 4 (`architecture/07-deployment-view.md`).

## 输入 (Input)
- Cloud provider details, containerization strategy, environment topologies (Dev, Staging, Prod).

## 输出 (Output)
- Arc42 deployment view documentation: Docker Compose setups, Kubernetes manifests, reverse proxy gateways, TLS certificates.

## 描述说明 (Description)
- 规范容器编排 (Docker/K8s)、多环境配置、网关反向代理、静态资源 CDN 缓存以及 CI/CD 交付流水线。
---

## 提示词调用示例 (Example Prompt)

```text
/deployment

Document Docker container topology for local development, connecting project containers to Central Docker Gateway network (base_shared_net).
```

