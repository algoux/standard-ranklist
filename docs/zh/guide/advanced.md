# 进阶特性

本页介绍 srk 的一些进阶功能，适合在掌握了基本用法之后进一步了解。

## 国际化（i18n）

srk 中许多文本字段支持国际化，它们的类型是 `Text`，即 `string | I18NStringSet`。

### 简单文本

直接使用字符串：

```json
{
  "title": "ACM ICPC World Finals 2018"
}
```

### 多语言文本

使用 I18NStringSet 对象，必须包含 `fallback` 字段：

```json
{
  "title": {
    "fallback": "ACM ICPC World Finals 2018",
    "en-US": "ACM ICPC World Finals 2018",
    "zh-CN": "ACM ICPC 2018 全球总决赛"
  }
}
```

| 字段 | 说明 | 必填 |
|------|------|------|
| `fallback` | 当渲染器无法确定语言时使用的回退文本 | ✅ |
| `{语言标签}` | 按 IETF BCP 47 语言标签提供的翻译 | ❌ |

支持 i18n 的字段包括：`contest.title`、`problem.title`、`user.name`、`user.organization`、`marker.label`、`ranklist.remarks` 等。

## 自定义样式

### Style 对象

Style 可以设置文字颜色和背景色：

```json
{
  "textColor": "#333333",
  "backgroundColor": "#FFD700"
}
```

### ThemeColor — 亮暗主题适配

颜色值支持亮暗主题差异化：

```json
{
  "textColor": {
    "light": "#333333",
    "dark": "#CCCCCC"
  },
  "backgroundColor": "#FFD700"
}
```

如果只提供一个颜色值（非对象），亮暗主题使用相同颜色。

### 支持的颜色格式

- HEX：`"#FFFFFF"`
- RGB：`"rgb(255, 255, 255)"`
- RGBA：`"rgba(255, 255, 255, 0.75)"`

## 自定义提交结果

`solutions` 中的 `result` 字段支持除了标准枚举值（如 `AC`、`WA`、`CE`）之外的任意自定义结果枚举。

渲染器会优先匹配预定义值，无法匹配时作为自定义结果处理。

::: tip 建议
自定义结果意味着需要特定渲染器支持。只在标准枚举值无法覆盖的特殊场景下才使用自定义结果。
:::

## 图片类型

srk 中的图片字段（如 `avatar`、`photo`、`banner`）支持三种来源：

1. **URL** — `"https://example.com/avatar.png"`
2. **相对路径** — `"assets/team-photo.jpg"`（其相对于 srk bundle 根目录，当前为内部特性）
3. **Base64 Data URL** — `"data:image/png;base64,iVBOR..."`

区分规则：以 `data:` 开头为 Data URL，包含 `://` 为 URL，其余为相对路径。

> 完整数据类型定义请参阅 [数据类型规范](https://github.com/algoux/standard-ranklist/blob/master/specs/data-types.md)
