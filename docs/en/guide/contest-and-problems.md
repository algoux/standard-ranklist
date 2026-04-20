# Contest & Problems

## Contest Object

The `contest` field describes basic contest information.

### Basic Configuration

A minimal Contest requires only three fields:

```json
{
  "title": "ACM ICPC World Finals 2018",
  "startAt": "2018-04-19T17:00:00+08:00",
  "duration": [5, "h"]
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `title` | Contest title | ✅ |
| `startAt` | Start time (ISO 8601 format) | ✅ |
| `duration` | Duration | ✅ |
| `frozenDuration` | Freeze duration | ❌ |
| `banner` | Banner image | ❌ |
| `refLinks` | Reference links | ❌ |

### Time Format

srk uses a `[value, unit]` tuple format to represent time durations (TimeDuration):

```json
[5, "h"]      // 5 hours
[300, "min"]  // 300 minutes
[18000, "s"]  // 18000 seconds
```

Supported time units: `"ms"` (milliseconds), `"s"` (seconds), `"min"` (minutes), `"h"` (hours), `"d"` (days).

### Scoreboard Freeze

`frozenDuration` specifies how long before the contest end to start the scoreboard freeze. During the freeze period, submission results are not revealed publicly and are displayed as `?` or a special judging placeholder.

```json
{
  "title": "Example Contest",
  "startAt": "2025-01-01T09:00:00Z",
  "duration": [5, "h"],
  "frozenDuration": [1, "h"]
}
```

The configuration above means the contest lasts 5 hours with the last 1 hour frozen (freeze starts at hour 4).

If `frozenDuration` is not set, it defaults to `[0, "s"]` (no freeze).

### Reference Links

`refLinks` adds external links related to the contest:

```json
{
  "title": "ACM ICPC World Finals 2018",
  "startAt": "2018-04-19T17:00:00+08:00",
  "duration": [5, "h"],
  "frozenDuration": [1, "h"],
  "refLinks": [
    {
      "title": "Official Scoreboard",
      "link": "https://icpc.baylor.edu/scoreboard/"
    },
    {
      "title": "Contest Website",
      "link": "https://icpc.global/"
    }
  ]
}
```

### Banner Image

`banner` supports either a direct image URL or an image with a link:

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

> For complete field definitions, see the [Contest Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#contest)

---

## Problem Object

`problems` is an array that lists all contest problems in order.

### Basic Configuration

A minimal Problem can be an empty object — the renderer will auto-generate aliases:

```json
{
  "problems": [
    {},
    {},
    {}
  ]
}
```

However, it's generally recommended to specify an alias and title for each problem:

```json
{
  "problems": [
    { "alias": "A", "title": "Catch the Plane" },
    { "alias": "B", "title": "Comma Sprinkler" },
    { "alias": "C", "title": "Conquer the World" }
  ]
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `alias` | Problem short name (e.g., A, B, C) | ❌ |
| `title` | Problem title | ❌ |
| `link` | Problem link | ❌ |
| `statistics` | Submission statistics | ❌ |
| `style` | Custom column header style | ❌ |

### Problem Statistics

`statistics` displays a snapshot of the problem's submission and acceptance data:

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

### Custom Styles

You can set background colors and other styles for problem column headers, typically corresponding to balloon colors:

```json
{
  "alias": "A",
  "title": "Catch the Plane",
  "style": {
    "backgroundColor": "#58a2d1"
  }
}
```

> For complete field definitions, see the [Problem Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#problem)
