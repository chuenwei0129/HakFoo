# CLAUDE.md

这是写给 Claude Code 的项目说明书——让 Claude 知道这个仓库是干嘛的、怎么用。

Codex 对应的说明在根目录的 `AGENTS.md`。两份文档应该尽量保持同一套仓库事实，不要各写各的。

## 这个仓库做什么

HakFoo 是一套个人 Claude Code 技能库。每个技能就是一份"做事方法"——比如提交代码时怎么写说明、怎么检查 PR、遇到 bug 怎么排查。

你可以把 Claude Code 想象成一个人，skill 就是交给它的任务手册。 Claude 看了就知道：哦，遇到这种情况，我该按这几步走。

## 东西都放在哪

```
├── README.md                    # 项目理念（中文写的）
├── AGENTS.md                    # 给 Codex 看的仓库说明
├── .claude-plugin/
│   └── marketplace.json         # Claude 市场需要的注册表
├── .codex-plugin/
│   └── plugin.json              # Codex 插件元数据
└── skills/
    └── {skill-name}/
        ├── SKILL.md             # 真正的技能文件
        └── agents/
            └── openai.yaml      # Codex 的 UI 元数据（推荐）
```

`SKILL.md` 是核心。其他都是配套。

## skill 文件长什么样

每份 skill 都是一个 Markdown 文件，最上面有一段 YAML 配置：

```yaml
---
name: skill-name
description: "什么时候触发这个技能——用中文写"
metadata:
  version: "0.0.1"
---
```

下面才是正文，分成几块：

- **Scope** —— 什么时候用，什么时候别用
- **Red Lines** —— 必须遵守的规则，按重要程度排
- **Toolbox** —— 可选的技巧，类比、故事、提问都行
- **Execution** —— 具体怎么一步步做
- **Acceptance** —— 怎么算做得好

## 怎么让 skill 进 Claude 市场

`.claude-plugin/marketplace.json` 是一个注册表。每个 skill 目录作为一个插件，skills 数组指向下面的子目录。

格式参考 Claude Code 市场的官方 schema，链接在文件里。

## 加一个 skill 需要几步

1. 建目录：`mkdir skills/技能名`
2. 写文件：`skills/技能名/SKILL.md`，带上 YAML 头
3. 可选：补 `skills/技能名/agents/openai.yaml`，给 Codex 更好的展示和默认调用提示
4. Claude 侧注册：去 `.claude-plugin/marketplace.json` 里加一条
5. 改完跑 `bun scripts/validate_repo.ts`

## 设计理念（来自 README）

- **有招必有名** —— 每个技能必须有清晰的名字。名字都想不好，说明你没想明白这个技能到底是干嘛的
- **招式是用来传承的** —— 先写"为什么要这么做"，再写"怎么做"
- **红线优先于工具** —— 必须守的规则排在前面，技巧排在后面。先保底，再加分
- **形式自由** —— 输出格式由内容决定，不强套模板

## 没有传统构建，但有最小校验

这个仓库没有编译、打包和单元测试，但现在有一个最小校验脚本。

改完之后至少检查这几件事：

- 技能的 YAML 头是不是完整
- `marketplace.json` 和 `plugin.json` 能不能解析
- 关键路径是不是存在

命令：

```bash
bun scripts/validate_repo.ts
```
