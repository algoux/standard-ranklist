# Getting Started

This section walks you through building a minimal srk JSON file from scratch and previewing it in the Playground.

## Minimal Example

A valid srk file requires at least the following fields:

```json
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "My First Contest",
    "startAt": "2019-01-01T09:00:00+08:00",
    "duration": [5, "h"]
  },
  "problems": [
    { "alias": "A" },
    { "alias": "B" },
    { "alias": "C" }
  ],
  "series": [],
  "rows": []
}
```

This is already a valid srk document! Although it has no ranking data yet, the structure is complete.

## Adding Participant Data

Next, let's add ranking configuration and data for two teams:

```json{14-49}
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "My First Contest",
    "startAt": "2019-01-01T09:00:00+08:00",
    "duration": [5, "h"]
  },
  "problems": [
    { "alias": "A", "title": "Easy Problem" },
    { "alias": "B", "title": "Hard Problem" },
    { "alias": "C", "title": "Preventing AK Problem" }
  ],
  "series": [
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
          "count": { "value": [1, 1, 1] }
        }
      }
    }
  ],
  "rows": [
    {
      "user": { "id": "team-alpha", "name": "Team Alpha" },
      "score": { "value": 2, "time": [238, "min"] },
      "statuses": [
        { "result": "AC", "time": [128, "min"], "tries": 1 },
        { "result": "FB", "time": [90, "min"], "tries": 2 },
        { "result": "RJ", "tries": 3 }
      ]
    },
    {
      "user": { "id": "team-beta", "name": "Team Beta" },
      "score": { "value": 1, "time": [160, "min"] },
      "statuses": [
        { "result": "FB", "time": [120, "min"], "tries": 3 },
        { "result": "RJ", "tries": 5 },
        { "result": null }
      ]
    }
  ],
  "sorter": {
    "algorithm": "ICPC",
    "config": {}
  }
}
```

In this example:

- **Team Alpha** solved 2 problems with a total penalty of 238 minutes, ranked first (Gold)
- **Team Beta** solved 1 problem with a total penalty of 160 minutes, ranked second (Silver)
- The `statuses` array has 3 elements, corresponding to the status of each of the 3 problems; unsubmitted problems have a status of `null`
- `series` defines one ranking column with segment configuration `[1, 1, 1]` (one Gold, one Silver, one Bronze)

::: tip Key Rule
Each row's `statuses` array must have the same length as the `problems` array — they correspond by index.
:::

## Preview in the Playground

Copy the JSON above into the srk online Playground to see a live rendered preview:

**👉 [Open Playground](https://rl.algoux.org/playground)**

In the Playground you can:

- Edit JSON in real time and see the rendered result
- Validate the correctness of srk data
- Modify different fields and observe how the rendering changes

## Using Type Definitions in Your Project

If you produce or consume srk data in a TypeScript project, install the official type definition package:

```bash
npm install -D @algoux/standard-ranklist
```

Then use it in your code:

```typescript
import type * as srk from '@algoux/standard-ranklist'

const ranklist: srk.Ranklist = {
  type: 'general',
  version: '0.3.12',
  contest: {
    title: 'My Contest',
    startAt: '2019-01-01T09:00:00+08:00',
    duration: [5, 'h'],
  },
  problems: [{ alias: 'A' }],
  series: [],
  rows: [],
}
```

This gives you full type hints and validation in your editor.

## Validating with JSON Schema

srk also provides a JSON Schema (`schema.json`). You can configure it in editors that support JSON Schema for real-time validation:

```json
{
  "$schema": "https://raw.githubusercontent.com/algoux/standard-ranklist/master/schema.json"
}
```

:::tip Tip
You can also use JSON Schema-compatible tools to generate field configurations and validation code for other languages.
:::

## Next Steps

Now you understand the basic structure of srk. Continue exploring:

- [Contest & Problems](./contest-and-problems) — Learn about Contest and Problem configuration in detail
