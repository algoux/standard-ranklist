# Markers

## What is a Marker

**Marker** is used to tag and visually distinguish specific participant groups. Common uses include:

- Marking girls' teams
- Marking participants for independent segment allocation groups
- Marking participants from specific origins or regions

## Defining Markers

Define available markers in the top-level `markers` array:

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

Each Marker contains:

| Field | Description | Required |
|-------|-------------|----------|
| `id` | Unique identifier | ✅ |
| `label` | Display label | ✅ |
| `style` | Visual style | ✅ |

### Style Presets

`style` can use preset color names:

`"red"`, `"orange"`, `"yellow"`, `"green"`, `"blue"`, `"purple"`, `"pink"`

Custom style objects are also supported:

```json
{
  "id": "special",
  "label": "Special",
  "style": {
    "backgroundColor": "#4CAF50"
  }
}
```

### Internationalized Labels

`label` supports internationalization:

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

## Associating Users with Markers

Reference marker IDs in the User object's `markers` array to tag participants:

```json
{
  "user": {
    "id": "team-gamma",
    "name": "Team Gamma",
    "markers": ["girls-team"]
  }
}
```

A user can have multiple markers:

```json
{
  "markers": ["girls-team", "special"]
}
```

::: warning Referential Integrity
Each ID in the `user.markers` array must correspond to an `id` defined in the top-level `Ranklist.markers`.
:::

## Group Rankings with Series

A powerful use of Markers is combining them with Series filters to implement group-specific independent rankings. This is common in scenarios like "Invitational Rank" or "Provincial Rank" where multiple ranking columns are displayed within the same contest.

For example, setting up independent rankings for provincial teams:

```json
{
  "markers": [
    { "id": "provincial", "label": "Provincial Team", "style": "blue" }
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

The ranklist will display both the overall ranking and independent provincial team ranking.

> For complete field definitions, see the [Marker Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/markers.md)
