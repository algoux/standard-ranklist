# Data Types

This page summarizes all basic data types in the srk specification for quick reference.

## Time-Related

### DatetimeISOString

Date-time string in ISO 8601 format.

```json
"2019-01-01T00:00:00Z"
"2019-01-01T08:00:00+08:00"
"2019-01-01T00:00:00.000Z"
```

### TimeUnit

Time unit enumeration:

| Value | Meaning |
|-------|---------|
| `"ms"` | Milliseconds |
| `"s"` | Seconds |
| `"min"` | Minutes |
| `"h"` | Hours |
| `"d"` | Days |

### TimeDuration

Time duration, in the format `[value, unit]`:

```json
[25, "ms"]
[120, "s"]
[60, "min"]
[5, "h"]
```

The value must be a non-negative finite number. It can be non-integer (e.g., `[1.5, "h"]`), but integers are recommended.

## Text & Internationalization

### Text

`string | I18NStringSet` — Supports plain text or multilingual text.

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

Multilingual string set. The `fallback` field is required; other keys are IETF BCP 47 language tags.

## Links & Images

### Link

URL string. Absolute URLs are recommended.

```json
"https://example.com/"
```

### LinkWithTitle

Link with a title:

```json
{
  "link": "https://example.com/",
  "title": "Example"
}
```

### Image

Image source, supporting three forms:

| Form | Discrimination Rule | Example |
|------|---------------------|---------|
| URL | Contains `://` | `"https://example.com/img.png"` |
| Base64 Data URL | Starts with `data:` | `"data:image/png;base64,..."` |
| Relative path <Badge text="Alpha" type="warning" /> | Everything else | `"assets/photo.jpg"` |

### ImageWithLink

Clickable image:

```json
{
  "image": "https://example.com/banner.png",
  "link": "https://example.com/"
}
```

## Colors & Styles

### Color

General color, supporting three formats:

| Format | Example |
|--------|---------|
| HEX | `"#FFFFFF"` |
| RGB | `"rgb(255, 255, 255)"` |
| RGBA | `"rgba(255, 255, 255, 0.75)"` |

### ThemeColor

Light/dark theme adaptive color:

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

Visual style object:

```json
{
  "textColor": "#333333",
  "backgroundColor": "#FFD700"
}
```

Both `textColor` and `backgroundColor` are ThemeColor types, supporting light/dark themes.

## Other Types

### Contributor

Contributor string, format: `name <email> (url)`, where email and url are optional:

```json
"bLue <mail@example.com> (https://example.com/)"
"Alice"
"Bob <bob@example.com>"
```

### Result Types

#### SolutionResultLite

Compact result set, used for `RankProblemStatus.result`:

| Value | Meaning |
|-------|---------|
| `"FB"` | First Blood |
| `"AC"` | Accepted |
| `"RJ"` | Rejected |
| `"?"` | Frozen |
| `null` | Not submitted |

#### SolutionResultFull

Full result set, used for `Solution.result` (includes all SolutionResultLite values):

| Value | Meaning |
|-------|---------|
| `"WA"` | Wrong Answer |
| `"PE"` | Presentation Error |
| `"TLE"` | Time Limit Exceeded |
| `"MLE"` | Memory Limit Exceeded |
| `"OLE"` | Output Limit Exceeded |
| `"RTE"` | Runtime Error |
| `"NOUT"` | No Output |
| `"CE"` | Compilation Error |
| `"UKE"` | Unknown Error |

Additionally, any string not in the predefined list is treated as a **custom result**.

> For complete definitions, see the [Data Types Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/data-types.md), [Solution Result Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#solution-result-types)
