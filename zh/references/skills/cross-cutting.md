# Skill: `/cross-cutting`

## 名称 (Name)
`cross-cutting`

## 使用方式 (Command/Trigger)
- 调用 Slash 命令：`/cross-cutting`
- Used to document system-wide non-functional concepts in Phase 0 / Phase 4 (`architecture/08-crosscutting-concepts.md`).

## 输入 (Input)
- System requirements for logging, audit trails, multi-tenant isolation, caching, and rate-limiting.

## 输出 (Output)
- Cross-cutting concept specifications and architectural middleware definitions.

## 描述说明 (Description)
- 管理跨模块通用的横切架构规范：全局认证鉴权机制、分布式日志追踪、安全合规、错误码字典、配置加密。
---

## 提示词调用示例 (Example Prompt)

```text
/cross-cutting

Specify structured logging format with X-Correlation-ID tracing, JWT tenant claim extraction, and Redis rate limiting.
```

