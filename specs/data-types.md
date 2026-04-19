# Common Data Types

This document defines the common and primitive data types used throughout the srk specification. These types are referenced by the object definitions in other specification documents.

## DatetimeISOString

A `string` conforming to [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time format.

Implementations MUST support the following forms:

- Date with time and UTC offset: `2019-01-01T00:00:00Z`
- Date with time and timezone offset: `2019-01-01T08:00:00+08:00`
- Date with time and fractional seconds: `2019-01-01T00:00:00.000Z`

Implementations SHOULD preserve the original timezone information when re-serializing.

**Examples:**

```json
"2019-01-01T00:00:00Z"
"2019-01-01T08:00:00+08:00"
"2018-04-19T17:00:00.000+08:00"
```

## TimeUnit

A `string` enumeration representing a unit of time.

| Value | Meaning |
|-------|---------|
| `"ms"` | Milliseconds |
| `"s"` | Seconds |
| `"min"` | Minutes |
| `"h"` | Hours |
| `"d"` | Days |

## TimeDuration

A two-element JSON array representing a duration of time.

**Format:** `[number, TimeUnit]`

- The first element is a `number` representing the magnitude. It MUST be a non-negative finite number.
- The second element is a [TimeUnit](#timeunit) string representing the unit.

**Examples:**

```json
[25, "ms"]
[120, "s"]
[60, "min"]
[5, "h"]
[1, "d"]
```

> **Note:** The numeric value MAY be a non-integer (e.g., `[1.5, "h"]`), but implementations SHOULD prefer integer values for precision.

## I18NStringSet

A JSON `object` providing internationalized string values.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `fallback` | `string` | Yes | — | The fallback string used when the renderer cannot determine which language to use |
| *`{languageTag}`* | `string` | No | — | A localized string. The key MUST be a valid [IETF BCP 47](https://www.rfc-editor.org/info/bcp47) language tag |

The `fallback` field MUST always be present. Implementations SHOULD use the value corresponding to the user's preferred language tag if available, falling back to the `fallback` value otherwise.

**Example:**

```json
{
  "fallback": "English",
  "en-US": "English",
  "zh-CN": "中文"
}
```

## Text

A union type representing displayable text with optional internationalization support.

**Type:** `string | I18NStringSet`

- If the value is a JSON `string`, it is treated as plain text with no language annotation.
- If the value is a JSON `object`, it is treated as an [I18NStringSet](#i18nstringset).

Implementations MUST distinguish between the two forms by checking the JSON value type.

**Examples:**

```json
"ACM ICPC World Finals 2018"
```

```json
{
  "fallback": "ACM ICPC World Finals 2018",
  "en-US": "ACM ICPC World Finals 2018",
  "zh-CN": "ACM ICPC 2018 全球总决赛"
}
```

## Link

A `string` containing a URL.

The value SHOULD be a valid URL as defined by [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986). Both absolute and relative URLs are permitted, though absolute URLs are RECOMMENDED for interoperability.

**Example:**

```json
"https://icpc.baylor.edu/scoreboard/"
```

## LinkWithTitle

A JSON `object` representing a hyperlink with an associated display title.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `link` | [Link](#link) | Yes | — | The URL |
| `title` | [Text](#text) | Yes | — | The display title for the link |

**Example:**

```json
{
  "link": "https://icpc.baylor.edu/scoreboard/",
  "title": "Original Ranklist"
}
```

## RelativePath

A `string` containing a file path relative to the bundled root directory.

The "bundled root" is the root directory of the distribution package that contains the srk document. Implementations that support bundled srk documents (e.g., a ZIP archive containing a ranklist JSON and associated assets) MUST resolve relative paths against this root.

The path separator MUST be `/` (forward slash), regardless of the operating system.

**Example:**

```json
"assets/image.png"
```

## DataURLBase64

A `string` containing a [Data URL](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URLs) with Base64-encoded content.

The value MUST conform to the format: `data:[<mediatype>];base64,<data>`

**Example:**

```json
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
```

## Image

A union type representing an image source.

**Type:** `Link | RelativePath | DataURLBase64`

Implementations MUST distinguish between the three forms using the following rules:

1. If the string starts with `data:`, it is a [DataURLBase64](#dataurlbase64).
2. If the string contains `://` (i.e., has a URI scheme), it is a [Link](#link) (URL).
3. Otherwise, it is a [RelativePath](#relativepath).

**Examples:**

```json
"https://example.com/avatar.png"
"assets/team-photo.jpg"
"data:image/png;base64,iVBORw0KGgo..."
```

## ImageWithLink

A JSON `object` representing an image that is also a hyperlink.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `image` | [Image](#image) | Yes | — | The image source |
| `link` | [Link](#link) | Yes | — | The URL that the image links to |

**Example:**

```json
{
  "image": "https://example.com/banner.png",
  "link": "https://example.com/"
}
```

## Color Types

### ColorHEX

A `string` containing a hexadecimal color value.

The value MUST be in the format `#RRGGBB` where `RR`, `GG`, and `BB` are two-digit hexadecimal values (case-insensitive).

**Example:** `"#FFFFFF"`

### ColorRGB

A `string` containing an RGB color value.

The value MUST be in the format `rgb(R, G, B)` where `R`, `G`, and `B` are integers in the range 0–255.

**Example:** `"rgb(255, 255, 255)"`

### ColorRGBA

A `string` containing an RGBA color value with alpha channel.

The value MUST be in the format `rgba(R, G, B, A)` where `R`, `G`, `B` are integers in the range 0–255 and `A` is a decimal number in the range 0–1.

**Example:** `"rgba(255, 255, 255, 0.75)"`

### Color

A union type for general color representation.

**Type:** `ColorHEX | ColorRGB | ColorRGBA`

Implementations MUST support all three color formats.

## ThemeColor

A type representing a color that may vary between light and dark themes.

**Type:** `Color | { light: Color, dark: Color }`

- If the value is a `Color` string, the same color is used for both light and dark themes.
- If the value is an object, the `light` field specifies the color for light themes and the `dark` field specifies the color for dark themes.

**Examples:**

```json
"#FF5722"
```

```json
{
  "light": "#333333",
  "dark": "#CCCCCC"
}
```

## Style

A JSON `object` representing visual styling properties.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `textColor` | [ThemeColor](#themecolor) | No | Determined by renderer | Text foreground color |
| `backgroundColor` | [ThemeColor](#themecolor) | No | Determined by renderer | Background color |

When a default is "Determined by renderer", the implementation is free to choose an appropriate value based on its own design and theme.

## Contributor

A `string` identifying a contributor to the ranklist data.

The format follows the convention: `name <email> (url)`

- `name` is REQUIRED.
- `<email>` is OPTIONAL.
- `(url)` is OPTIONAL.

**Examples:**

```json
"bLue <mail@example.com> (https://example.com/)"
"Alice"
"Bob <bob@example.com>"
"Charlie (https://charlie.dev)"
```
