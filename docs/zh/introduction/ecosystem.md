# 生态概览

## 工具链

### Standard Ranklist

**仓库：** [algoux/standard-ranklist](https://github.com/algoux/standard-ranklist)

这是 srk 核心。包含：

- **规范文档**
- **TypeScript 类型定义**
- **JSON Schema**

对于开发者，它可以用来：

1. 引入类型声明，使用 TS 开发上层工具和应用：

```bash
npm install -D @algoux/standard-ranklist
```

```typescript
import type * as srk from '@algoux/standard-ranklist';

const myRanklist: srk.Ranklist = { ... };
```

2. 使用 JSON Schema 为 JSON 添加自动补全和验证，或搭配其他校验工具：

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://unpkg.com/@algoux/standard-ranklist@latest/schema.json",
  "contest": { ... },
  "problems": [ ... ],
  "series": [ ... ],
  "rows": [ ... ]
}
```

### Renderer Component

**仓库：** [algoux/standard-ranklist-renderer-component](https://github.com/algoux/standard-ranklist-renderer-component)

srk 的 Web 渲染组件，可以用它渲染榜单。它已被用于：

- 过往多届 CCPC 官方榜单页面
- RankLand

→ 详见 [Renderer 渲染组件](/zh/ecosystem/renderer)

### Utils

**仓库：** [algoux/standard-ranklist-utils](https://github.com/algoux/standard-ranklist-utils)

srk 实用工具库，提供 srk 数据处理的常用功能：

- 数据验证
- 排序和计算
- 静态榜单和提交记录列表的相互转换
- 其他实用工具函数

→ 详见 [Utils 工具库](/zh/ecosystem/utils)

### Convert-to

**仓库：** [algoux/standard-ranklist-convert-to](https://github.com/algoux/standard-ranklist-convert-to)

格式转换工具，可以将 srk 数据转换为其他平台和工具的格式，包括：

- Codeforces Gym 格式
- Excel 表格
- Virtual Judge Replay 格式

→ 详见 [格式转换工具](/zh/ecosystem/convert-to)

## 典型工作流

对开发者来说，很多场景都适合使用 srk 生态，如：

1. **生产** — 增强你的 OJ、工具或服务，只需使用原生或经过转换的 srk 数据格式
2. **渲染** — 使用 Renderer 组件在自己的应用中展示榜单
3. **分析** — 使用 Utils 和 Convert-to 工具对榜单数据进行提取和批处理

## 平台

### RankLand

**地址：** [https://rl.algoux.org/](https://rl.algoux.org/)

RankLand 是基于 srk 的数据分发平台。你可以轻松地：

- 浏览官方维护和社区贡献的历年竞赛榜单数据
- 通过 [Playground](https://rl.algoux.org/playground) 在线调试 srk 数据
- 接入你管理的比赛，获得稳定可靠的实时外榜分发服务和数据归档服务 <Badge type="warning" text="内测" />
- 使用 Kessoku Series 套件，为你的比赛提供直播导播能力，极大丰富比赛体验 <Badge type="warning" text="内测" />
