# Rows

A ranklist row (RanklistRow) is the core data structure of the entire ranklist. Each row represents a participant's performance in the contest, sorted in the expected static ranking order.

Typically, it can be understood as the data in each row of a common Ranklist/Scoreboard table, containing the participant's basic information, total score (including penalty, if applicable), and the status of each problem.

## RanklistRow Structure

Each element in the `rows` array represents one row of ranking data:

```json
{
  "user": { "id": "team-1", "name": "Team Alpha" },
  "score": { "value": 1, "time": [60, "min"] },
  "statuses": [
    { "result": "AC", "time": [60, "min"], "tries": 1 },
    { "result": "RJ", "tries": 3 }
  ]
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `user` | Participant information | ✅ |
| `score` | Score | ✅ |
| `statuses` | Per-problem status (aligned with `problems`) | ✅ |

## RankScore

```json
{ "value": 2, "time": [150, "min"] }
```

| Field | Description | Required |
|-------|-------------|----------|
| `value` | Total score value | ✅ |
| `time` | Total time | ❌ |

The semantics of `value` depend on the contest format:
- **ICPC format**: Typically represents the number of problems solved
- **OI format**: Typically represents the total score

`time` in ICPC format typically represents the total penalty.

## RankProblemStatus (Problem Status)

Each element in the `statuses` array describes a participant's status on a specific problem.

### Basic Usage

```json
{
  "result": "AC",
  "time": [60, "min"],
  "tries": 1
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `result` | Result | ✅ |
| `score` | Score for this problem | ❌ |
| `time` | Acceptance time (relative to contest start) | ❌ |
| `tries` | Number of effective submissions | ❌ |
| `solutions` | Submission detail list | ❌ |

### Result Types (SolutionResultLite)

The `result` field uses a compact result set:

| Value | Meaning |
|-------|---------|
| `"FB"` | First Blood — first to solve this problem |
| `"AC"` | Accepted — solved |
| `"RJ"` | Rejected — not solved |
| `"?"` | Frozen — result hidden during scoreboard freeze |
| `null` | Not submitted |

### Meaning of tries

`tries` represents the **number of effective submissions**. For ICPC format, it only counts effective submissions up to and including the first AC. Effective submissions are determined by the sorter's `noPenaltyResults` configuration: results listed in `noPenaltyResults` (such as CE) are not counted as effective submissions.

For example, if a participant submitted WA, CE, WA, AC for problem A, and the default `noPenaltyResults` includes CE, then `tries` is 3 (WA + WA + AC; CE is not counted).

### Including Submission Details

The `solutions` array provides a complete submission history, sorted in ascending time order, and may include non-effective submissions:

```json
{
  "result": "AC",
  "time": [79, "min"],
  "tries": 3,
  "solutions": [
    { "result": "WA", "time": [30, "min"] },
    { "result": "WA", "time": [55, "min"] },
    { "result": "AC", "time": [79, "min"] }
  ]
}
```

::: info Relationship between result and solutions
- `result` is the **authoritative** final result status
- `solutions` is the detailed submission history, useful for replay (re-sorting) and similar features
:::

`solutions` uses a more detailed result set. In addition to `FB`, `AC`, `RJ`, and `?`, it can include specific results such as `WA`, `TLE`, `CE`, etc. (see [SolutionResultFull enumeration](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#solutionresultfull)).

## Complete Example

Ranking data with two participants and two problems:

```json
{
  "rows": [
    {
      "user": { "id": "team-1", "name": "Team Alpha" },
      "score": { "value": 2, "time": [269, "min"] },
      "statuses": [
        {
          "result": "FB",
          "time": [79, "min"],
          "tries": 1,
          "solutions": [
            { "result": "FB", "time": [79, "min"] }
          ]
        },
        {
          "result": "AC",
          "time": [150, "min"],
          "tries": 3,
          "solutions": [
            { "result": "WA", "time": [100, "min"] },
            { "result": "MLE", "time": [132, "min"] },
            { "result": "AC", "time": [150, "min"] }
          ]
        }
      ]
    },
    {
      "user": { "id": "team-2", "name": "Team Beta" },
      "score": { "value": 1, "time": [150, "min"] },
      "statuses": [
        {
          "result": "RJ",
          "tries": 1,
          "solutions": [
            { "result": "WA", "time": [1, "min"] }
          ]
        },
        {
          "result": "FB",
          "tries": 2,
          "solutions": [
            { "result": "CE", "time": [100, "min"] },
            { "result": "RTE", "time": [100, "min"] },
            { "result": "FB", "time": [130, "min"] }
          ]
        },
      ]
    }
  ]
}
```

> For complete field definitions, see the [RanklistRow Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#ranklistrow)
