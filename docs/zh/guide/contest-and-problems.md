# 比赛信息与题目

## Contest 对象

`contest` 字段描述比赛的基本信息。

### 基本配置

一个最简的 Contest 只需要三个必填字段：

```json
{
  "title": "ACM ICPC World Finals 2018",
  "startAt": "2018-04-19T17:00:00+08:00",
  "duration": [5, "h"]
}
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `title` | 比赛标题 | ✅ |
| `startAt` | 开始时间（ISO 8601 格式） | ✅ |
| `duration` | 持续时间 | ✅ |
| `frozenDuration` | 封榜时间 | ❌ |
| `banner` | 横幅图片 | ❌ |
| `refLinks` | 参考链接 | ❌ |

### 时间格式

srk 使用 `[数值, 单位]` 的元组格式表示时间长度（TimeDuration）：

```json
[5, "h"]      // 5 小时
[300, "min"]  // 300 分钟
[18000, "s"]  // 18000 秒
```

支持的时间单位：`"ms"`（毫秒）、`"s"`（秒）、`"min"`（分钟）、`"h"`（小时）、`"d"`（天）。

### 封榜机制

`frozenDuration` 表示从比赛结束前多长时间开始封榜。封榜期间的提交不会揭露真实结果，而以 `?` 或正在评测的特殊占位符对外显示。

```json
{
  "title": "Example Contest",
  "startAt": "2025-01-01T09:00:00Z",
  "duration": [5, "h"],
  "frozenDuration": [1, "h"]
}
```

上面的配置表示比赛时长 5 小时，最后 1 小时封榜（即第 4 小时开始封榜）。

如果不设置 `frozenDuration`，默认为 `[0, "s"]`，不封榜。

### 参考链接

`refLinks` 可以添加与比赛相关的外部链接：

```json
{
  "title": "ACM ICPC World Finals 2018",
  "startAt": "2018-04-19T17:00:00+08:00",
  "duration": [5, "h"],
  "frozenDuration": [1, "h"],
  "refLinks": [
    {
      "title": "官方榜单",
      "link": "https://icpc.baylor.edu/scoreboard/"
    },
    {
      "title": "比赛官网",
      "link": "https://icpc.global/"
    }
  ]
}
```

### 横幅图片

`banner` 支持直接使用图片 URL 或带链接的图片：

```json
{
  "banner": "https://example.com/contest-banner.png"
}
```

```json
{
  "banner": {
    "image": "https://example.com/contest-banner.png",
    "link": "https://example.com/contest/"
  }
}
```

> 完整字段定义请参阅 [Contest 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#contest)

---

## Problem 对象

`problems` 是一个数组，按顺序列出比赛的所有题目。

### 基本配置

最简的 Problem 可以不含任何字段（空对象），渲染器会自动生成别名：

```json
{
  "problems": [
    {},
    {},
    {}
  ]
}
```

但通常更建议为每道题指定别名和标题：

```json
{
  "problems": [
    { "alias": "A", "title": "Catch the Plane" },
    { "alias": "B", "title": "Comma Sprinkler" },
    { "alias": "C", "title": "Conquer the World" }
  ]
}
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `alias` | 题目简称（如 A、B、C） | ❌ |
| `title` | 题目标题 | ❌ |
| `link` | 题目链接 | ❌ |
| `statistics` | 提交统计 | ❌ |
| `style` | 自定义列头样式 | ❌ |

### 题目统计

`statistics` 可以展示题目的提交和通过情况快照：

```json
{
  "alias": "A",
  "title": "Catch the Plane",
  "link": "https://open.kattis.com/problems/catch",
  "statistics": {
    "accepted": 111,
    "submitted": 268
  }
}
```

### 自定义样式

可以为题目列头设置背景色等样式，通常对应气球颜色：

```json
{
  "alias": "A",
  "title": "Catch the Plane",
  "style": {
    "backgroundColor": "#58a2d1"
  }
}
```

> 完整字段定义请参阅 [Problem 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#problem)
