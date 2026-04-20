# Series & Segments

## What is RankSeries

**RankSeries** represents an independent ranking dimension. A ranklist can contain multiple series, each computing rankings independently.

Common use cases:

- **Official Rank (#)** — Rankings with ICPC Gold/Silver/Bronze segment allocation
- **Overall Rank (R#)** — Absolute ranking of all participants on the ranklist
- **School Rank (S#)** — Only the highest-ranked team per school

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

## RankSeriesSegment

Each series can define multiple segments, ordered from highest to lowest:

```json
{
  "segments": [
    { "title": "Gold Medalist", "style": "gold" },
    { "title": "Silver Medalist", "style": "silver" },
    { "title": "Bronze Medalist", "style": "bronze" }
  ]
}
```

Style presets are available: `"gold"`, `"silver"`, `"bronze"`, `"iron"`. Custom styles can also be used:

```json
{
  "title": "Special Award",
  "style": {
    "backgroundColor": "#4CAF50"
  }
}
```

## Rule Presets

The `rule` field defines the ranking computation rule, with three presets available.

### Normal — Simple Ranking

Ranks directly by score in descending order; ties share the same rank:

```json
{
  "title": "Rank",
  "rule": { "preset": "Normal" }
}
```

Options:
- `includeOfficialOnly`: When set to `true`, only includes participants whose `user.official` is not `false`

```json
{
  "rule": {
    "preset": "Normal",
    "options": { "includeOfficialOnly": true }
  }
}
```

::: info Note
The Normal preset only computes rankings — it does not assign participants to segments. For automatic segment allocation, use the ICPC preset.
:::

### UniqByUserField — Deduplicate by Field

Deduplicates by a specified field, keeping only the highest-ranked participant for each unique value. A typical use case is "School Rank":

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

Available deduplication fields: `"id"`, `"name"`, `"organization"`.

### ICPC

The standard ICPC rule preset. Supports segment allocation by ratio or fixed count, as well as user filtering:

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

#### Fixed Count (count)

Specifies a fixed number of participants for each segment:

```json
{
  "count": { "value": [4, 4, 4] }
}
```

The example above means: 4 Gold, 4 Silver, 4 Bronze.

The `noTied` option enforces no ties, using the `rows` array order to determine segment placement:

```json
{
  "count": { "value": [4, 4, 4], "noTied": true }
}
```

:::warning Caution
Use the noTied option carefully, as it may lead to unfair rankings. It is recommended only for contests that require an absolute medal count.
:::

#### By Ratio (ratio)

Allocates by proportion of total participants (applicable to the vast majority of ICPC-series contests):

```json
{
  "ratio": {
    "value": [0.1, 0.2, 0.3],
    "rounding": "ceil"
  }
}
```

This means: 10% Gold, 20% Silver, 30% Bronze. With 248 participants, that's 25 Gold, 50 Silver, 74 Bronze.

| Option | Description | Default |
|--------|-------------|---------|
| `rounding` | Rounding method: `"floor"` / `"ceil"` / `"round"` | `"ceil"` |
| `denominator` | Denominator calculation: `"all"` / `"submitted"` / `"scored"` | `"all"` |
| `noTied` | Whether to enforce no ties | `false` |

#### Using Both ratio and count

Both can be specified simultaneously — the **intersection** (i.e., the minimum range agreed upon by both algorithms) is used:

```json
{
  "ratio": { "value": [0.1, 0.2, 0.3] },
  "count": { "value": [20, 40, 60] }
}
```

If ratio calculates 25 Gold winners but count limits to 20, the final Gold count is 20.

#### Filter

Participants can be filtered by user fields or markers for ranking computation:

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

Filtering by user field with regex matching is also supported:

```json
{
  "filter": {
    "byUserFields": [
      { "field": "organization", "rule": "^SDUT" }
    ]
  }
}
```

> For complete field definitions, see the [RankSeries Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/series.md)
