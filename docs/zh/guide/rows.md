# 排名行

排名行（RanklistRow）是整个榜单中的核心数据结构，每行代表一个参赛者在比赛中的表现详情，按静态排名期望顺序排序。

通常，它可以被理解为常见 Ranklist/Scoreboard 表格中每一行的数据，包含了参赛者的基本信息、总得分（包括罚时，如有），以及每道题目的解题状态。

## RanklistRow 结构

`rows` 数组中的每个元素代表一行排名数据：

```json
{
  "user": { "id": "team-1", "name": "Team Alpha" },
  "score": { "value": 1, "time": [60, "min"] },
  "statuses": [
    { "result": "AC", "time": [60, "min"], "tries": 1 },
    { "result": "RJ", "tries": 3 }
  ]
}
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `user` | 参赛者信息 | ✅ |
| `score` | 成绩得分 | ✅ |
| `statuses` | 每道题的状态（与 `problems` 一一对应） | ✅ |

## RankScore

```json
{ "value": 2, "time": [150, "min"] }
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `value` | 总分值 | ✅ |
| `time` | 总用时 | ❌ |

`value` 的语义取决于赛制：
- **ICPC 赛制**：通常表示解题数
- **OI 赛制**：通常表示总得分

`time` 在 ICPC 赛制中通常表示总罚时。

## RankProblemStatus（题目状态）

`statuses` 数组中的每个元素描述选手在某道题上的状态。

### 基本用法

```json
{
  "result": "AC",
  "time": [60, "min"],
  "tries": 1
}
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `result` | 结果 | ✅ |
| `score` | 本题得分 | ❌ |
| `time` | 通过时间（相对于比赛开始） | ❌ |
| `tries` | 有效提交次数 | ❌ |
| `solutions` | 提交详情列表 | ❌ |

### 结果类型（SolutionResultLite）

`result` 字段使用精简结果集：

| 值 | 含义 |
|-----|------|
| `"FB"` | First Blood — 全场第一个通过此题 |
| `"AC"` | Accepted — 通过 |
| `"RJ"` | Rejected — 未通过 |
| `"?"` | Frozen — 封榜期间，结果隐藏 |
| `null` | 未提交 |

### tries 的含义

`tries` 表示**有效提交次数**，对于 ICPC 赛制，它只计算到第一次 AC 为止的有效提交。有效提交由排序器的 `noPenaltyResults` 配置决定：出现在 `noPenaltyResults` 列表中的结果枚举（如 CE）不计为有效提交。

例如，某选手对 A 题提交了 WA、CE、WA、AC，默认 `noPenaltyResults` 包含 CE，则 `tries` 为 3（WA + WA + AC，CE 不计）。

### 携带提交详情

通过 `solutions` 数组可以提供完整的提交历史，按时间升序排列，可以包含非有效提交：

```json
{
  "result": "AC",
  "time": [79, "min"],
  "tries": 3,
  "solutions": [
    { "result": "WA", "time": [30, "min"] },
    { "result": "WA", "time": [55, "min"] },
    { "result": "AC", "time": [79, "min"] }
  ]
}
```

::: info result 与 solutions 的关系
- `result` 是**权威的**最终结果状态
- `solutions` 是详细的提交历史，可用于回放（重排序）等功能
:::

`solutions` 可使用使用详细的结果集枚举。除了 `FB`、`AC`、`RJ`、`?` 之外还可以包括 `WA`、`TLE`、`CE` 等具体结果（参考 [SolutionResultFull 枚举值](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#solutionresultfull)）。

## 完整示例

一份包含两位选手、两道题的排名数据：

```json
{
  "rows": [
    {
      "user": { "id": "team-1", "name": "Team Alpha" },
      "score": { "value": 2, "time": [269, "min"] },
      "statuses": [
        {
          "result": "FB",
          "time": [79, "min"],
          "tries": 1,
          "solutions": [
            { "result": "FB", "time": [79, "min"] }
          ]
        },
        {
          "result": "AC",
          "time": [150, "min"],
          "tries": 3,
          "solutions": [
            { "result": "WA", "time": [100, "min"] },
            { "result": "MLE", "time": [132, "min"] },
            { "result": "AC", "time": [150, "min"] }
          ]
        }
      ]
    },
    {
      "user": { "id": "team-2", "name": "Team Beta" },
      "score": { "value": 1, "time": [150, "min"] },
      "statuses": [
        {
          "result": "RJ",
          "tries": 1,
          "solutions": [
            { "result": "WA", "time": [1, "min"] }
          ]
        },
        {
          "result": "FB",
          "tries": 2,
          "solutions": [
            { "result": "CE", "time": [100, "min"] },
            { "result": "RTE", "time": [100, "min"] },
            { "result": "FB", "time": [130, "min"] }
          ]
        },
      ]
    }
  ]
}
```

> 完整字段定义请参阅 [RanklistRow 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#ranklistrow)
