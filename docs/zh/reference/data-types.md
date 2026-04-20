# 数据类型速查

本页汇总 srk 规范中所有基础数据类型，供快速查阅。

## 时间相关

### DatetimeISOString

ISO 8601 格式的日期时间字符串。

```json
"2019-01-01T00:00:00Z"
"2019-01-01T08:00:00+08:00"
"2019-01-01T00:00:00.000Z"
```

### TimeUnit

时间单位枚举：

| 值 | 含义 |
|----|------|
| `"ms"` | 毫秒 |
| `"s"` | 秒 |
| `"min"` | 分钟 |
| `"h"` | 小时 |
| `"d"` | 天 |

### TimeDuration

时间长度，格式为 `[数值, 单位]`：

```json
[25, "ms"]
[120, "s"]
[60, "min"]
[5, "h"]
```

数值必须为非负有限数。可以是非整数（如 `[1.5, "h"]`），但建议使用整数。

## 文本与国际化

### Text

`string | I18NStringSet` — 支持纯文本或多语言文本。

```json
"Plain text"
```

```json
{
  "fallback": "English",
  "en-US": "English",
  "zh-CN": "中文"
}
```

### I18NStringSet

多语言字符串集合，`fallback` 字段必填，其他键为 IETF BCP 47 语言标签。

## 链接与图片

### Link

URL 字符串，建议使用绝对 URL。

```json
"https://example.com/"
```

### LinkWithTitle

带标题的链接：

```json
{
  "link": "https://example.com/",
  "title": "Example"
}
```

### Image

图片来源，支持三种形式：

| 形式 | 判断规则 | 示例 |
|------|---------|------|
| URL | 包含 `://` | `"https://example.com/img.png"` |
| Base64 Data URL | 以 `data:` 开头 | `"data:image/png;base64,..."` |
| 相对路径 <Badge text="Alpha" type="warning" /> | 其他情况 | `"assets/photo.jpg"` |

### ImageWithLink

可点击的图片：

```json
{
  "image": "https://example.com/banner.png",
  "link": "https://example.com/"
}
```

## 颜色与样式

### Color

通用颜色，支持三种格式：

| 格式 | 示例 |
|------|------|
| HEX | `"#FFFFFF"` |
| RGB | `"rgb(255, 255, 255)"` |
| RGBA | `"rgba(255, 255, 255, 0.75)"` |

### ThemeColor

亮暗主题适配颜色：

```json
"#FF5722"
```

```json
{
  "light": "#333333",
  "dark": "#CCCCCC"
}
```

### Style

视觉样式对象：

```json
{
  "textColor": "#333333",
  "backgroundColor": "#FFD700"
}
```

`textColor` 和 `backgroundColor` 均为 ThemeColor 类型，支持亮暗主题。

## 其他类型

### Contributor

贡献者字符串，格式为 `name <email> (url)`，其中 email 和 url 可选：

```json
"bLue <mail@example.com> (https://example.com/)"
"Alice"
"Bob <bob@example.com>"
```

### 结果类型

#### SolutionResultLite

精简结果集，用于 `RankProblemStatus.result`：

| 值 | 含义 |
|----|------|
| `"FB"` | First Blood |
| `"AC"` | Accepted |
| `"RJ"` | Rejected |
| `"?"` | Frozen |
| `null` | 未提交 |

#### SolutionResultFull

完整结果集，用于 `Solution.result`（包含 SolutionResultLite 的所有值）：

| 值 | 含义 |
|----|------|
| `"WA"` | Wrong Answer |
| `"PE"` | Presentation Error |
| `"TLE"` | Time Limit Exceeded |
| `"MLE"` | Memory Limit Exceeded |
| `"OLE"` | Output Limit Exceeded |
| `"RTE"` | Runtime Error |
| `"NOUT"` | No Output |
| `"CE"` | Compilation Error |
| `"UKE"` | Unknown Error |

此外，任何不在预定义列表中的字符串都被视为**自定义结果**。

> 完整定义请参阅 [数据类型规范](https://github.com/algoux/standard-ranklist/blob/master/specs/data-types.md)、[Solution Result 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#solution-result-types)
