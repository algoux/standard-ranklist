# Sorter Algorithms

This document defines the sorting algorithms used to order ranklist rows and compute rankings.

## Overview

The `sorter` field on the top-level [Ranklist](ranklist.md#ranklist) object specifies how rows are sorted.

When a sorter is defined, producers MUST ensure that the `rows` array is already sorted according to the specified algorithm. Consumers MAY rely on this ordering without re-sorting.

When no `sorter` is specified, the `rows` array order is producer-defined. Consumers MUST preserve the original order of `rows` as provided in the data. Any auto-sort features SHOULD be disabled.

## Sorter

**Type:** `SorterICPC | SorterScore`

The `algorithm` field determines which sorter type is in use.

| Algorithm Value | Sorter Type | Description |
|-----------------|-------------|-------------|
| `"ICPC"` | [SorterICPC](#sortericpc) | ICPC-style sorting (solved count, then penalty time) |
| `"score"` | [SorterScore](#sorterscore) | Score-based sorting |

Implementations that encounter an unknown `algorithm` value SHOULD ignore the sorter and preserve the original row order.

---

## SorterICPC

The ICPC sorter orders users by the classic ICPC ranking rules: first by the number of problems solved (descending), then by total penalty time (ascending).

```json
{
  "algorithm": "ICPC",
  "config": {
    "penalty": [20, "min"]
  }
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `algorithm` | `"ICPC"` | Yes | — | Algorithm identifier |
| `config` | `object` | Yes | — | Algorithm configuration |

### Config Fields

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `penalty` | [TimeDuration](data-types.md#timeduration) | No | `[20, "min"]` | Penalty time added per extra try before the first accepted solution |
| `noPenaltyResults` | `array<`[SolutionResultFull](ranklist.md#solutionresultfull) `\| null>` | No | `["FB", "AC", "?", "NOUT", "CE", "UKE", null]` | Solution results that do NOT incur penalty. Values MUST be from the [SolutionResultFull](ranklist.md#solutionresultfull) enumeration or `null` |
| `timePrecision` | [TimeUnit](data-types.md#timeunit) | No | — | Time unit precision for penalty calculation |
| `timeRounding` | `string` | No | `"floor"` | Rounding method for time precision conversion |
| `rankingTimePrecision` | [TimeUnit](data-types.md#timeunit) | No | — | Time unit precision for ranking comparison |
| `rankingTimeRounding` | `string` | No | `"floor"` | Rounding method for ranking time precision conversion |

### Sorting Order

Users are sorted by the following criteria in order of priority:

1. **Number of problems solved** — descending (more solved = better rank)
2. **Total penalty time** — ascending (less penalty = better rank)

Users with equal solved count and equal penalty time are considered **tied** and MUST receive the same rank.

### Penalty Time Calculation

For each problem that a user has solved (result is `"FB"` or `"AC"`), the penalty time is calculated as:

```
problem_penalty = acceptance_time + (extra_tries × penalty_per_try)
```

Where:

- `acceptance_time` is the time of the accepted submission (from [RankProblemStatus.time](ranklist.md#rankproblemstatus) or the accepted [Solution.time](ranklist.md#solution)).
- `extra_tries` is the number of submissions with results that are NOT in the `noPenaltyResults` list, made before the first accepted submission.
- `penalty_per_try` is the value from `config.penalty` (default: 20 minutes).

The **total penalty time** is the sum of `problem_penalty` for all solved problems.

Unsolved problems do not contribute to the total penalty time.

> **Note:** The `tries` field in [RankProblemStatus](ranklist.md#rankproblemstatus) counts effective submissions only (excluding those matching `noPenaltyResults`, except the accepted one). Therefore, for a solved problem, `extra_tries` equals `tries - 1`. However, when the `solutions` array is available, implementations SHOULD use it directly to determine which submissions incur penalty, as it provides complete submission history including non-effective submissions.

### No-Penalty Results

The `noPenaltyResults` array specifies which solution results do NOT count as penalty-incurring tries. By default:

- `"FB"` — First Blood (accepted)
- `"AC"` — Accepted
- `"?"` — Frozen (result unknown)
- `"NOUT"` — No Output
- `"CE"` — Compilation Error
- `"UKE"` — Unknown Error
- `null` — No submission

Any submission whose result appears in this list is excluded from the penalty try count.

### Time Precision

The ICPC penalty calculation involves two optional time precision stages. The full computation pipeline is:

```
Step 1: Time Conversion (if timePrecision is set)
   For each solved problem:
     a. Convert acceptance_time to timePrecision unit, applying timeRounding
     b. Convert config.penalty to timePrecision unit (exact conversion, no rounding)

Step 2: Penalty Calculation
   For each solved problem:
     problem_penalty = converted_acceptance_time + (extra_tries × converted_penalty_per_try)
   total_penalty = sum of all problem_penalty values
   (This is the "display penalty" stored in RankScore.time)

Step 3: Ranking Conversion (if rankingTimePrecision is set)
   ranking_penalty = convert total_penalty to rankingTimePrecision unit,
                     applying rankingTimeRounding
   (Used ONLY for ranking comparison, NOT for display)

Step 4: Sorting
   Sort users by: solved count (desc), then ranking_penalty (asc)
   Users with equal solved count and equal ranking_penalty are tied
```

#### `timePrecision` and `timeRounding`

These fields control the time unit conversion applied to individual submission times **before** penalty calculation.

When `timePrecision` is specified:
- Each submission's acceptance time is converted to the target unit using `timeRounding` (default: `"floor"`). Each time value is rounded independently.
- The `config.penalty` TimeDuration is converted to the same target unit using **exact arithmetic** (no rounding). For example, `[20, "min"]` converts to `[1200, "s"]` exactly.

For example, if raw submission times are in seconds (`"s"`) and `timePrecision` is `"min"`:
- A submission at `[125, "s"]` (125 seconds) becomes `[2, "min"]` with `"floor"` rounding, or `[3, "min"]` with `"ceil"` rounding.

When `timePrecision` is absent, all calculations use the raw time values at their original precision with **no rounding applied**. Implementations MUST convert all time values to a common unit using exact arithmetic before performing additions. Producers SHOULD ensure that submission times and `config.penalty` use compatible units.

#### `rankingTimePrecision` and `rankingTimeRounding`

*Since version 0.3.7.*

These fields control an **additional** time precision conversion applied to the **total penalty time** after penalty calculation, but **only for the purpose of ranking comparison**.

This means two users whose total penalty times differ only at a precision finer than `rankingTimePrecision` will be treated as tied.

> **Example:** If total penalties are 301 minutes and 299 minutes, and `rankingTimePrecision` is `"h"`, both round to 5 hours with `"floor"`, resulting in a tie.

When `rankingTimePrecision` is absent, the total penalty time is compared at its full precision with **no rounding applied**.

These fields do NOT affect the displayed penalty time — only the ranking order.

### Penalty Calculation Example

Given the following configuration and data:

**Config:**
```json
{
  "algorithm": "ICPC",
  "config": {
    "penalty": [20, "min"]
  }
}
```

**User's problem statuses:**

| Problem | Result | Time | Tries |
|---------|--------|------|-------|
| A | AC | 79 min | 1 |
| B | AC | 150 min | 3 |
| C | RJ | — | 5 |

**Calculation:**

- Problem A: `79 + (0 × 20) = 79` minutes (1 try, 0 extra penalty tries)
- Problem B: `150 + (2 × 20) = 190` minutes (3 tries, 2 extra penalty tries before AC)
- Problem C: Not solved, no penalty contribution

**Total:** Solved = 2, Penalty = 79 + 190 = **269 minutes**

---

## SorterScore

The score sorter orders users by their total score value.

```json
{
  "algorithm": "score",
  "config": {}
}
```

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `algorithm` | `"score"` | Yes | — | Algorithm identifier |
| `config` | `object` | Yes | — | Algorithm configuration (currently unspecified) |

### Sorting Order

Users are sorted by `RankScore.value` in **descending** order (higher score = better rank).

Users with equal scores are considered tied and MUST receive the same rank.

### Config

The `config` object for the score sorter is currently **unspecified** and reserved for future extension. Implementations SHOULD accept any valid JSON object for this field and ignore unknown properties.

Producers SHOULD provide an empty object `{}` for the `config` field.
