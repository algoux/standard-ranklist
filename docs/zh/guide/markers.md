# 标记系统

## 什么是 Marker

**Marker（标记）** 用于标注和视觉区分特定用户群体。常见用途：

- 标记女队（Girls Team）
- 标记独立奖牌计算分组的参赛者
- 标记特殊来源或地域的参赛者

## 定义 Marker

在顶层 `markers` 数组中定义可用的标记：

```json
{
  "markers": [
    {
      "id": "girls-team",
      "label": "Girls Team",
      "style": "pink"
    },
    {
      "id": "provincial",
      "label": "Provincial Team",
      "style": "blue"
    }
  ]
}
```

每个 Marker 包含：

| 字段 | 说明 | 必填 |
|------|------|------|
| `id` | 唯一标识符 | ✅ |
| `label` | 显示标签 | ✅ |
| `style` | 视觉样式 | ✅ |

### 样式预设

`style` 可以使用预设颜色名称：

`"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"purple"`, `"pink"`

也可以使用自定义样式对象：

```json
{
  "id": "special",
  "label": "Special",
  "style": {
    "backgroundColor": "#4CAF50"
  }
}
```

### 国际化标签

`label` 支持国际化：

```json
{
  "id": "special",
  "label": {
    "fallback": "Special",
    "en": "Special",
    "zh-CN": "特别组"
  },
  "style": "green"
}
```

## 关联 User 与 Marker

在 User 对象的 `markers` 数组中引用 marker ID，来为用户添加标记：

```json
{
  "user": {
    "id": "team-gamma",
    "name": "Team Gamma",
    "markers": ["girls-team"]
  }
}
```

一个用户可以有多个标记：

```json
{
  "markers": ["girls-team", "special"]
}
```

::: warning 引用完整性
`user.markers` 数组中的每个 ID 必须对应到顶层 `Ranklist.markers` 中定义的 `id`。
:::

## 配合 Series 实现分组排名

Marker 的一个强大用法是配合 Series 的 filter 实现分组独立排名，常见于如「邀请赛排名」「省赛排名」等同一个比赛内展示多个排名列的场景。

例如，为省内队伍设置独立排名：

```json
{
  "markers": [
    { "id": "provincial", "label": "省内队伍", "style": "blue" }
  ],
  "series": [
    {
      "title": "Main Rank",
      "segments": [
        { "title": "Gold", "style": "gold" },
        { "title": "Silver", "style": "silver" },
        { "title": "Bronze", "style": "bronze" }
      ],
      "rule": {
        "preset": "ICPC",
        "options": { "ratio": { "value": [0.1, 0.2, 0.3] } }
      }
    },
    {
      "title": "Provincial Rank",
      "segments": [
        { "title": "Gold", "style": "gold" },
        { "title": "Silver", "style": "silver" },
        { "title": "Bronze", "style": "bronze" }
      ],
      "rule": {
        "preset": "ICPC",
        "options": {
          "count": { "value": [15, 30, 45] },
          "filter": { "byMarker": "provincial" }
        }
      }
    }
  ]
}
```

榜单会同时展示总排名和省内队伍独立排名。

> 完整字段定义请参阅 [Marker 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/markers.md)
