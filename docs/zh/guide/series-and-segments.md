# 排名系列与奖区

## 什么是 RankSeries

**排名系列（RankSeries）** 代表一个独立的排名维度。一份 ranklist 可以包含多个系列，各自独立计算排名。

常见的使用场景：

- **正式排名（#）** — 使用 ICPC 金银铜规则分配奖牌的排名
- **总排名（R#）** — 所有选手在榜单上的绝对排名
- **学校排名（S#）** — 每所学校只取最高排名的队伍

```json
{
  "series": [
    {
      "title": "Official Rank",
      "segments": [...],
      "rule": { "preset": "ICPC", ... }
    },
    {
      "title": "Overall Rank",
      "rule": { "preset": "Normal", ... }
    },
    {
      "title": "School Rank",
      "rule": { "preset": "UniqByUserField", ... }
    }
  ]
}
```

## RankSeriesSegment（奖区分段）

每个系列可以定义多个 segment，从高到低排列：

```json
{
  "segments": [
    { "title": "Gold Medalist", "style": "gold" },
    { "title": "Silver Medalist", "style": "silver" },
    { "title": "Bronze Medalist", "style": "bronze" }
  ]
}
```

提供样式预设：`"gold"`、`"silver"`、`"bronze"`、`"iron"`，也可以使用自定义样式：

```json
{
  "title": "Special Award",
  "style": {
    "backgroundColor": "#4CAF50"
  }
}
```

## 规则预设

`rule` 字段定义排名的计算规则，提供三种预设。

### Normal — 简单排名

直接按分数降序排名，分数相同则并列：

```json
{
  "title": "Rank",
  "rule": { "preset": "Normal" }
}
```

可选项：
- `includeOfficialOnly`：设为 `true` 时，仅包含 `user.official` 不为 `false` 的参赛者

```json
{
  "rule": {
    "preset": "Normal",
    "options": { "includeOfficialOnly": true }
  }
}
```

::: info 注意
Normal 预设只计算排名，不会将选手分配到 segment 中。如需自动分配奖区，请使用 ICPC 预设。
:::

### UniqByUserField — 按字段去重

按指定字段去重，每个唯一值只保留排名最高的选手。典型用途是「学校排名」：

```json
{
  "title": "School Rank",
  "rule": {
    "preset": "UniqByUserField",
    "options": {
      "field": "organization"
    }
  }
}
```

可用的去重字段：`"id"`、`"name"`、`"organization"`。

### ICPC

标准 ICPC 规则预设。支持按比例或固定数量分配奖区，以及用户筛选：

```json
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
      "count": { "value": [4, 4, 4] }
    }
  }
}
```

#### 固定数量（count）

指定每个 segment 的固定人数：

```json
{
  "count": { "value": [4, 4, 4] }
}
```

上述示例表示：4 金、4 银、4 铜。

`noTied` 选项可强制不并列，按 `rows` 数组顺序决定计算时归入哪个奖区：

```json
{
  "count": { "value": [4, 4, 4], "noTied": true }
}
```

:::warning 注意
谨慎使用 noTied 选项，因为它可能导致排名不公平。建议仅在确定需要绝对奖牌数量的比赛中使用。
:::

#### 按比例（ratio）

按总人数的比例分配（适用于绝大多数 ICPC 系列比赛）：

```json
{
  "ratio": {
    "value": [0.1, 0.2, 0.3],
    "rounding": "ceil"
  }
}
```

表示：10% 金、20% 银、30% 铜。若有 248 人，则 25 金、50 银、74 铜。

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `rounding` | 取整方式：`"floor"` / `"ceil"` / `"round"` | `"ceil"` |
| `denominator` | 分母计算方式：`"all"` / `"submitted"` / `"scored"` | `"all"` |
| `noTied` | 是否强制不并列 | `false` |

#### 同时使用 ratio 和 count

两者可以同时指定，取**交集**：

```json
{
  "ratio": { "value": [0.1, 0.2, 0.3] },
  "count": { "value": [20, 40, 60] }
}
```

若 ratio 计算得金牌 25 人，count 限制 20 人，最终金牌为 20 人。

#### Filter（筛选器）

可以按用户字段或标记筛选参与排名计算的选手：

```json
{
  "preset": "ICPC",
  "options": {
    "count": { "value": [1, 1, 1] },
    "filter": {
      "byMarker": "girls-team"
    }
  }
}
```

也可以按用户字段正则匹配筛选：

```json
{
  "filter": {
    "byUserFields": [
      { "field": "organization", "rule": "^SDUT" }
    ]
  }
}
```

> 完整字段定义请参阅 [RankSeries 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/series.md)
