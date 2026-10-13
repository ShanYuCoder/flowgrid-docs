# Skill: `/deployment`

## スキル名 (Name)
`deployment`

## 使用方法 (Command/Trigger)
- スラッシュコマンド実行：`/deployment`
- Used to document system deployment topologies and CI/CD pipelines in Phase 0 / Phase 4 (`architecture/07-deployment-view.md`).

## 入力 (Input)
- Cloud provider details, containerization strategy, environment topologies (Dev, Staging, Prod).

## 出力 (Output)
- Arc42 deployment view documentation: Docker Compose setups, Kubernetes manifests, reverse proxy gateways, TLS certificates.

## 説明・役割 (Description)
- コンテナ設計 (Docker/K8s)、環境定義、API ゲートウェイ、CDN キャッシュ戦略、CI/CD デプロイパイプラインを定義。
---

## プロンプト実行例 (Example Prompt)

```text
/deployment

Document Docker container topology for local development, connecting project containers to Central Docker Gateway network (base_shared_net).
```

