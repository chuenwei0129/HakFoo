# HakFoo `fe-*` Skill System

## 目标

这套系统不是为了堆更多 skill，而是为了把前端学习和沉淀变成一条固定流水线：

`读材料 -> 搞懂 -> 讲清楚 -> 写回笔记 -> 做最小实验`

v1 只做 6 个 skill，先让这条链跑起来。

## v1 Skills

| Skill | 角色 | 解决什么问题 |
| --- | --- | --- |
| `fe-read` | 输入层 | 带着读博客、源码、RFC、文档，先给结构和热点 |
| `fe-book` | 输入层 | 拆技术书骨架，先抓作者的问题和框架 |
| `fe-learn` | 理解层 | 从七个方向切开一个前端概念 |
| `fe-plain` | 理解层 | 把复杂概念讲成人话，检验是否真懂 |
| `fe-note` | 重构层 | 把旧笔记、旧结论升级成可复用知识模块 |
| `fe-code` | 实践层 | 给知识点设计最小实验，验证猜想 |

## 知识单元标准

这套系统最终要产出的不是零散回答，而是可复用知识单元。

一条合格的知识单元，最少包含：

- `Title`
- `Problem`
- `Model`
- `Mechanism`
- `Boundaries`
- `Connections`
- `Example Or Experiment`
- `Open Questions`

各个 skill 的职责分工是：

- `fe-read`、`fe-book` 负责把外部材料整理成结构化中间层
- `fe-learn`、`fe-plain` 负责生成概念层理解
- `fe-note` 负责把理解压成最终知识单元
- `fe-code` 负责给知识单元补上实验锚点

## 默认工作流

### 1. 从材料进入

- 读博客、源码、文档：先用 `fe-read`
- 读一本书或某一章：先用 `fe-book`
- 已经有一条旧笔记：直接用 `fe-note`

### 2. 从理解分流

- 需要追到底层原理：用 `fe-learn`
- 需要把话讲清楚、讲成人话：用 `fe-plain`

### 3. 落地与验证

- 需要沉淀长期笔记：用 `fe-note`
- 需要把判断做成地面真相：用 `fe-code`

## Quick Routing

| 用户说什么 | 应该先用哪个 |
| --- | --- |
| “带我读这篇博客/这段源码” | `fe-read` |
| “帮我拆这本 JS 书” | `fe-book` |
| “彻底搞懂事件循环” | `fe-learn` |
| “用大白话讲清楚闭包” | `fe-plain` |
| “帮我把这条旧笔记重写一下” | `fe-note` |
| “给这个知识点配一个最小代码实验” | `fe-code` |

## Skill 边界

- `fe-read` vs `fe-book`
  - `fe-read` 处理博客、源码、RFC、文档和书籍片段
  - `fe-book` 处理一本书或一章，重点是作者问题、假设和长期资产

- `fe-learn` vs `fe-plain`
  - `fe-learn` 处理“为什么会这样”的概念深挖
  - `fe-plain` 处理“我还是没有模型”的解释问题

- `fe-learn` vs 未来的 `fe-rank`
  - `fe-learn` 是切深一个概念
  - `fe-rank` 会是压缩一个领域

- `fe-note` vs 未来的 `fe-write`
  - `fe-note` 重写旧理解，产出知识模块
  - `fe-write` 会组织成对外文章

- `fe-code` vs 正常开发
  - `fe-code` 只做最小实验
  - 不做产品功能，也不做大 demo

## 沉淀节奏

- 每次读完博客、源码、文档后，至少沉淀一条 `fe-note`
- 每学到一个“听说如此”的机制后，尽量补一个 `fe-code`
- 每周或双周回看最近新增的 `fe-note`
- 每月更新一次知识地图，标出盲区和待补实验
- 每次遇到新框架或新范式时，都回写它替代了谁、解决了什么、代价是什么

## 工程素材入口

优先素材来源：

- 项目代码
- bug 复盘
- 架构变更 PR
- 源码阅读记录
- 技术方案文档
- 历史笔记和踩坑记录

默认入口：

- 看源码、文章、RFC：`fe-read`
- 看一本书、一章书：`fe-book`
- 看旧笔记、旧总结、踩坑记录：`fe-note`
- 看一个工程现象但解释不清：`fe-learn`
- 想确认一个判断是否成立：`fe-code`

## Wave 2 优先级

第二波优先补这 4 个：

- `fe-rank`
- `fe-qa`
- `fe-arch`
- `fe-history`

理由：

- `fe-rank` 补抽象层
- `fe-qa` 补长期记忆接口
- `fe-arch` 补工程视角
- `fe-history` 补演化视角

之后再考虑：

- `fe-think`
- `fe-write`
- `fe-map`
- `fe-present`
- `fe-push`

顺序原则是：先补“抽象能力、记忆接口、工程视角、演化视角”，再补“表达和分发”。
