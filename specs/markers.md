# Marker System

This document defines the marker system used to annotate and visually distinguish specific users in a ranklist.

## Overview

Markers provide a mechanism to tag users with labels and visual styles, enabling renderers to highlight specific groups. Common use cases include:

- Identifying all-female teams
- Distinguishing teams from specific schools or regions
- Highlighting teams with special status (e.g., pre-qualified)
- Mark the group for the independent ranking related to grouping users

Markers are an OPTIONAL feature. A ranklist without markers is fully valid.

---

## Marker

A marker definition, declared in the top-level `Ranklist.markers` array.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | Unique identifier for this marker |
| `label` | [Text](data-types.md#text) | Yes | — | Display label for the marker |
| `style` | [Style](data-types.md#style) \| [MarkerStylePreset](#style-presets) | Yes | — | Visual style for the marker |

### ID Uniqueness

The `id` field MUST be unique across all markers within a single ranklist. Implementations MAY use the marker ID for indexing and cross-referencing with user records.

### Style Presets

The `style` field MAY be a preset string instead of a [Style](data-types.md#style) object. The following presets are defined:

| Preset | Intended Color |
|--------|---------------|
| `"red"` | Red |
| `"orange"` | Orange |
| `"yellow"` | Yellow |
| `"green"` | Green |
| `"blue"` | Blue |
| `"purple"` | Purple |
| `"pink"` | Pink |

The actual visual appearance of style presets is determined by the renderer implementation. The preset names indicate the intended color family but do not specify exact color values.

### Example

```json
{
  "id": "girls-team",
  "label": "Girls Team",
  "style": "pink"
}
```

```json
{
  "id": "pre-qualified",
  "label": {
    "fallback": "Pre-qualified",
    "en-US": "Pre-qualified",
    "zh-CN": "已晋级"
  },
  "style": {
    "textColor": "#FFFFFF",
    "backgroundColor": "#4CAF50"
  }
}
```

---

## User–Marker Association

Users reference markers through the `markers` field on the [User](ranklist.md#user) object.

### Association Rules

- Each string in `User.markers` MUST correspond to a `Marker.id` defined in the top-level `Ranklist.markers` array.
- A user MAY have zero, one, or multiple markers.
- The order of marker IDs in the `markers` array MAY be significant for display purposes (implementations MAY display markers in the given order).

### Referential Integrity

If a `User.markers` array contains an ID that does not match any `Marker.id` in `Ranklist.markers`, implementations SHOULD report a warning and SHOULD ignore the unresolved reference. Implementations MUST NOT fail or reject the entire document due to an unresolved marker reference.

### Deprecated `marker` Field

The single-value `User.marker` field is deprecated since version 0.3.6. See [User — Deprecated: marker](ranklist.md#deprecated-marker) for migration details.

---

## Markers in Series Rules

Markers can be used as a filter criterion in [ICPC series rules](series.md#filter).

The `filter.byMarker` option in `RankSeriesRulePresetICPC` accepts a marker ID string. When specified, only users whose `markers` array contains that ID (exact string match) are included in the series computation.

### Example: Filtered Series

```json
{
  "title": "Girls Team Rank",
  "segments": [
    { "title": "1st Place", "style": "gold" },
    { "title": "2nd Place", "style": "silver" },
    { "title": "3rd Place", "style": "bronze" }
  ],
  "rule": {
    "preset": "ICPC",
    "options": {
      "count": { "value": [1, 1, 1] },
      "filter": {
        "byMarker": "girls-team"
      }
    }
  }
}
```

This series computes a separate ranking considering only users marked with `"girls-team"`, awarding gold, silver, and bronze to the top 3 among them.

---

## Complete Example

A ranklist with markers:

```json
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "Example Contest",
    "startAt": "2024-01-01T09:00:00Z",
    "duration": [5, "h"]
  },
  "problems": [
    { "alias": "A" },
    { "alias": "B" }
  ],
  "markers": [
    {
      "id": "girls-team",
      "label": "Girls Team",
      "style": "pink"
    },
    {
      "id": "guest",
      "label": "Guest",
      "style": "blue"
    }
  ],
  "series": [
    {
      "title": "Overall Rank",
      "segments": [
        { "title": "Gold", "style": "gold" },
        { "title": "Silver", "style": "silver" }
      ],
      "rule": {
        "preset": "ICPC",
        "options": {
          "count": { "value": [3, 3] }
        }
      }
    }
  ],
  "rows": [
    {
      "user": {
        "id": "team-alpha",
        "name": "Team Alpha",
        "markers": ["girls-team"]
      },
      "score": { "value": 2, "time": [200, "min"] },
      "statuses": [
        { "result": "AC", "time": [60, "min"], "tries": 1 },
        { "result": "AC", "time": [120, "min"], "tries": 2 }
      ]
    },
    {
      "user": {
        "id": "team-beta",
        "name": "Team Beta",
        "markers": ["guest"],
        "official": false
      },
      "score": { "value": 2, "time": [150, "min"] },
      "statuses": [
        { "result": "AC", "time": [45, "min"], "tries": 1 },
        { "result": "AC", "time": [105, "min"], "tries": 1 }
      ]
    }
  ],
  "sorter": {
    "algorithm": "ICPC",
    "config": {}
  }
}
```
