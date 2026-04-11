# AGENTS.md

这是写给 Codex 的项目说明书。目的很简单：让 Codex 知道这个仓库不是应用代码仓库，而是一套可复用的技能库。

## 这个仓库做什么

HakFoo 是一套个人技能库。每个技能都是一个带 YAML 头的 `SKILL.md`，描述一种可反复使用的做事方法。

这里的重点不是“写多少代码”，而是把方法写清楚、写稳定、写得能传承。

## 目录结构

```text
├── README.md                         # 面向人的项目说明
├── CLAUDE.md                         # 面向 Claude Code 的仓库说明
├── AGENTS.md                         # 面向 Codex 的仓库说明
├── .claude-plugin/
│   └── marketplace.json              # Claude Code 插件注册表
├── .codex-plugin/
│   └── plugin.json                   # Codex 插件元数据
├── skills/
│   └── {skill-name}/
│       ├── SKILL.md                  # 技能主体
│       └── agents/
│           └── openai.yaml           # Codex UI 元数据（推荐）
└── scripts/
    └── validate_repo.ts              # 最小校验脚本（Bun）
```

## 技能约定

- 每个技能目录必须包含 `SKILL.md`
- `SKILL.md` 必须带 YAML 头，至少包含 `name` 和 `description`
- 技能正文优先写清楚适用范围、红线、执行方式和验收标准
- `skills/<skill-name>/agents/openai.yaml` 不是强制项，但推荐补上，方便 Codex 展示和调用

## 维护规则

- 改动技能时，优先保持 `README.md`、`CLAUDE.md`、`AGENTS.md` 三份说明的一致性
- Claude Code 的注册信息在 `.claude-plugin/marketplace.json`
- Codex 的插件信息在 `.codex-plugin/plugin.json`
- 改完后运行 `bun scripts/validate_repo.ts`，确保路径、JSON 和技能头信息都没坏

## 设计理念

- **有招必有名**：名字想不清，往往说明技能边界还没想清
- **招式是用来传承的**：先写为什么，再写怎么做
- **红线优先于工具**：先把不能错的事写死，再谈技巧
- **形式服务内容**：不同技能可以有不同写法，不强套模板
