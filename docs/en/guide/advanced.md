# Advanced Features

This page covers some advanced features of srk, suitable for further exploration after mastering the basics.

## Internationalization (i18n)

Many text fields in srk support internationalization. Their type is `Text`, i.e., `string | I18NStringSet`.

### Simple Text

Use a plain string:

```json
{
  "title": "ACM ICPC World Finals 2018"
}
```

### Multilingual Text

Use an I18NStringSet object, which must include a `fallback` field:

```json
{
  "title": {
    "fallback": "ACM ICPC World Finals 2018",
    "en-US": "ACM ICPC World Finals 2018",
    "zh-CN": "ACM ICPC 2018 全球总决赛"
  }
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `fallback` | Fallback text used when the renderer cannot determine the language | ✅ |
| `{language tag}` | Translation provided as an IETF BCP 47 language tag | ❌ |

Fields that support i18n include: `contest.title`, `problem.title`, `user.name`, `user.organization`, `marker.label`, `ranklist.remarks`, etc.

## Custom Styles

### Style Object

Style can set text color and background color:

```json
{
  "textColor": "#333333",
  "backgroundColor": "#FFD700"
}
```

### ThemeColor — Light/Dark Theme Adaptation

Color values support light/dark theme differentiation:

```json
{
  "textColor": {
    "light": "#333333",
    "dark": "#CCCCCC"
  },
  "backgroundColor": "#FFD700"
}
```

If only a single color value (non-object) is provided, the same color is used for both light and dark themes.

### Supported Color Formats

- HEX: `"#FFFFFF"`
- RGB: `"rgb(255, 255, 255)"`
- RGBA: `"rgba(255, 255, 255, 0.75)"`

## Custom Submission Results

The `result` field in `solutions` supports arbitrary custom result enumerations beyond the standard values (such as `AC`, `WA`, `CE`).

Renderers will first try to match predefined values; unmatched values are treated as custom results.

::: tip Recommendation
Custom results require specific renderer support. Only use custom results in special scenarios where standard enumeration values cannot cover your needs.
:::

## Image Types

Image fields in srk (such as `avatar`, `photo`, `banner`) support three sources:

1. **URL** — `"https://example.com/avatar.png"`
2. **Relative path** — `"assets/team-photo.jpg"` (relative to the srk bundle root, currently an internal feature)
3. **Base64 Data URL** — `"data:image/png;base64,iVBOR..."`

Discrimination rules: starts with `data:` → Data URL; contains `://` → URL; otherwise → relative path.

> For complete data type definitions, see the [Data Types Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/data-types.md)
