# 快速上手

本节将带你从零构建一份最小的 srk JSON 文件，并在 Playground 中查看效果。

## 最小示例

一份有效的 srk 文件至少需要包含以下字段：

```json
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "My First Contest",
    "startAt": "2019-01-01T09:00:00+08:00",
    "duration": [5, "h"]
  },
  "problems": [
    { "alias": "A" },
    { "alias": "B" },
    { "alias": "C" }
  ],
  "series": [],
  "rows": []
}
```

这就是一个合法的 srk 文档了！虽然它还没有排名数据，但结构已经完整。

## 添加选手数据

接下来，让我们为这场比赛添加排名配置和两位选手的数据：

```json{14-49}
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "My First Contest",
    "startAt": "2019-01-01T09:00:00+08:00",
    "duration": [5, "h"]
  },
  "problems": [
    { "alias": "A", "title": "Easy Problem" },
    { "alias": "B", "title": "Hard Problem" },
    { "alias": "C", "title": "Preventing AK Problem" }
  ],
  "series": [
    {
      "title": "Rank",
      "segments": [
        { "title": "Gold", "style": "gold" },
        { "title": "Silver", "style": "silver" },
        { "title": "Bronze", "style": "bronze" }
      ],
      "rule": {
        "preset": "ICPC",
        "options": {
          "count": { "value": [1, 1, 1] }
        }
      }
    }
  ],
  "rows": [
    {
      "user": { "id": "team-alpha", "name": "Team Alpha" },
      "score": { "value": 2, "time": [238, "min"] },
      "statuses": [
        { "result": "AC", "time": [128, "min"], "tries": 1 },
        { "result": "FB", "time": [90, "min"], "tries": 2 },
        { "result": "RJ", "tries": 3 }
      ]
    },
    {
      "user": { "id": "team-beta", "name": "Team Beta" },
      "score": { "value": 1, "time": [160, "min"] },
      "statuses": [
        { "result": "FB", "time": [120, "min"], "tries": 3 },
        { "result": "RJ", "tries": 5 },
        { "result": null }
      ]
    }
  ],
  "sorter": {
    "algorithm": "ICPC",
    "config": {}
  }
}
```

在这个示例中：

- **Team Alpha** 解出 2 题，总罚时 238 分钟，排名第一（金牌）
- **Team Beta** 解出 1 题，总罚时 160 分钟，排名第二（银牌）
- `statuses` 数组有 3 个元素，分别对应 3 道题目的状态，未提交的题目状态为 `null`
- `series` 定义了一个排名列，奖区配置为 `[1, 1, 1]`（金、银、铜各一名）

::: tip 关键规则
每行的 `statuses` 数组长度必须与 `problems` 数组长度相同，它们按索引对应。
:::

## 在 Playground 中预览

将上面的 JSON 复制到 srk 在线 Playground，即可实时预览渲染效果：

**👉 [打开 Playground](https://rl.algoux.org/playground)**

在 Playground 中你可以：

- 实时编辑 JSON 并查看渲染结果
- 验证 srk 数据的正确性
- 尝试修改不同的字段，观察渲染变化

## 在项目中使用类型定义

如果你在 TypeScript 项目中生产或消费 srk 数据，可以安装官方类型定义包：

```bash
npm install -D @algoux/standard-ranklist
```

然后在代码中使用：

```typescript
import type * as srk from '@algoux/standard-ranklist'

const ranklist: srk.Ranklist = {
  type: 'general',
  version: '0.3.12',
  contest: {
    title: 'My Contest',
    startAt: '2019-01-01T09:00:00+08:00',
    duration: [5, 'h'],
  },
  problems: [{ alias: 'A' }],
  series: [],
  rows: [],
}
```

这样就可以在编辑器中获得完整的类型提示和校验。

## 使用 JSON Schema 验证

srk 还提供了 JSON Schema（`schema.json`），你可以在支持 JSON Schema 的编辑器中配置它来获得实时验证：

```json
{
  "$schema": "https://raw.githubusercontent.com/algoux/standard-ranklist/master/schema.json"
}
```

:::tip 提示
也可以使用支持 JSON Schema 的工具来生成其他语言的字段配置和校验代码。
:::

## 下一步

现在，你已经了解了 srk 的基本结构。继续探索：

- [比赛信息与题目](./contest-and-problems) — 详细了解 Contest 和 Problem 配置
