# Core Ranklist Object

This document defines the core `Ranklist` object and all its nested structures including contests, problems, users, solutions, and ranklist rows.

## Ranklist

The top-level object representing a complete ranklist.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `type` | `string` | Yes | — | The ranklist type identifier |
| `version` | `string` | Yes | — | The specification version |
| `contest` | [Contest](#contest) | Yes | — | Contest metadata |
| `problems` | `array<`[Problem](#problem)`>` | Yes | — | Ordered list of problems |
| `series` | `array<`[RankSeries](series.md#rankseries)`>` | Yes | — | Rank series definitions |
| `rows` | `array<`[RanklistRow](#ranklistrow)`>` | Yes | — | Ranklist data rows |
| `markers` | `array<`[Marker](markers.md#marker)`>` | No | `[]` | Available marker definitions |
| `sorter` | [Sorter](sorting.md#sorter) | No | — | Sorting algorithm configuration. If absent, renderer SHOULD disable any auto-sort features |
| `contributors` | `array<`[Contributor](data-types.md#contributor)`>` | No | — | List of data contributors |
| `remarks` | [Text](data-types.md#text) | No | — | General remarks or notes about the ranklist |
| `_now` | [DatetimeISOString](data-types.md#datetimeisostring) | No | — | Current time (internal/runtime field) |

### Type

The `type` field identifies the ranklist format type. This specification defines a single type:

- `"general"` — The general-purpose ranklist format described by this specification.

This field is **extensible**: future versions of this specification or third-party extensions MAY define additional type values. Implementations that encounter an unknown type value SHOULD report a warning and MAY attempt to process the document as `"general"`.

### Version

The `version` field MUST contain a valid [Semantic Version](https://semver.org/) string indicating which version of this specification the document conforms to. See [Versioning](README.md#versioning) for compatibility rules.

### Problems–Statuses Alignment

The `problems` array and each `rows[i].statuses` array MUST have the same length. The element at index `n` of a row's `statuses` array corresponds to the problem at index `n` of the `problems` array.

Formally: for every row `r` in `rows`, `r.statuses.length` MUST equal `problems.length`.

### Internal Field: `_now`

The `_now` field is an [internal/runtime field](README.md#internal-fields-convention). It represents the current time at the moment the ranklist was generated or transmitted, and is used exclusively for real-time ranklist scenarios (e.g., live contest scoreboards). See [Internal Fields Convention](README.md#internal-fields-convention).

### Example

```json
{
  "type": "general",
  "version": "0.3.12",
  "contest": {
    "title": "ACM ICPC World Finals 2018",
    "startAt": "2018-04-19T17:00:00+08:00",
    "duration": [5, "h"],
    "frozenDuration": [1, "h"]
  },
  "problems": [
    { "alias": "A", "title": "Catch the Plane" },
    { "alias": "B", "title": "Comma Sprinkler" }
  ],
  "series": [
    {
      "title": "Rank",
      "segments": [
        { "title": "Gold Medalist", "style": "gold" },
        { "title": "Silver Medalist", "style": "silver" }
      ],
      "rule": { "preset": "ICPC", "options": { "count": { "value": [4, 4] } } }
    }
  ],
  "rows": [
    {
      "user": { "id": "team-1", "name": "Team Alpha" },
      "score": { "value": 2, "time": [166, "min"] },
      "statuses": [
        { "result": "AC", "time": [79, "min"], "tries": 1 },
        { "result": "AC", "time": [87, "min"], "tries": 1 }
      ]
    }
  ],
  "markers": [],
  "sorter": { "algorithm": "ICPC", "config": {} },
  "contributors": ["bLue <mail@example.com> (https://example.com/)"],
  "remarks": "This is a demo ranklist."
}
```

---

## Contest

Metadata about the contest.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | [Text](data-types.md#text) | Yes | — | Contest title |
| `startAt` | [DatetimeISOString](data-types.md#datetimeisostring) | Yes | — | Contest start time |
| `duration` | [TimeDuration](data-types.md#timeduration) | Yes | — | Contest duration |
| `frozenDuration` | [TimeDuration](data-types.md#timeduration) | No | `[0, "s"]` | Frozen duration |
| `banner` | [Image](data-types.md#image) \| [ImageWithLink](data-types.md#imagewithlink) | No | — | Banner image |
| `refLinks` | `array<`[LinkWithTitle](data-types.md#linkwithtitle)`>` | No | Ignored by renderer | Reference links related to the contest |

### Frozen Duration

The `frozenDuration` field specifies the duration of the scoreboard freeze, measured **backward from the end of the contest**. During the frozen period, submissions are recorded but their results are hidden from the public scoreboard (displayed as `"?"`).

For example, if a contest has `duration: [5, "h"]` and `frozenDuration: [1, "h"]`, the scoreboard freezes at the 4-hour mark (1 hour before the contest ends).

A `frozenDuration` of `[0, "s"]` (the default) means no freeze.

### Example

```json
{
  "title": "ACM ICPC World Finals 2018",
  "startAt": "2018-04-19T17:00:00+08:00",
  "duration": [5, "h"],
  "frozenDuration": [1, "h"],
  "refLinks": [
    {
      "title": "Original Ranklist",
      "link": "https://icpc.baylor.edu/scoreboard/"
    }
  ]
}
```

---

## Problem

A contest problem definition.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `title` | [Text](data-types.md#text) | No | Ignored by renderer | Problem title |
| `alias` | `string` | No | Determined by renderer | Short identifier for the problem (e.g., `"A"`, `"B"`, `"1-1"`) |
| `link` | [Link](data-types.md#link) | No | Ignored by renderer | URL to view the problem |
| `statistics` | [ProblemStatistics](#problemstatistics) | No | — | Aggregate statistics for this problem |
| `style` | [Style](data-types.md#style) | No | Determined by renderer | Custom style for the problem column header |

When `alias` is absent, implementations SHOULD generate a default alias (e.g., sequential letters "A", "B", "C", ... or numbers "1", "2", "3", ...).

### Example

```json
{
  "title": "Catch the Plane",
  "alias": "A",
  "link": "https://open.kattis.com/problems/catch",
  "statistics": {
    "accepted": 111,
    "submitted": 268
  },
  "style": {
    "backgroundColor": "#58a2d1"
  }
}
```

## ProblemStatistics

Aggregate statistics for a problem across all submissions.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `accepted` | `integer` | Yes | — | Total number of accepted solutions |
| `submitted` | `integer` | Yes | — | Total number of submitted solutions |

Both values MUST be non-negative integers, and `accepted` MUST NOT exceed `submitted`.

---

## Solution Result Types

srk defines a hierarchy of solution result values used in different contexts.

### SolutionResultLite

A minimal set of result values used in [RankProblemStatus](#rankproblemstatus) to represent the current state of a problem for a user.

| Value | Meaning |
|-------|---------|
| `"FB"` | **First Blood** — the first accepted solution for this problem across all users |
| `"AC"` | **Accepted** — the solution is correct |
| `"RJ"` | **Rejected** — the solution is incorrect (general rejection) |
| `"?"` | **Frozen** — the result is hidden due to scoreboard freeze |
| `null` | No solution has been submitted for this problem |

### SolutionResultFull

An extended set of result values used in [Solution](#solution) objects that includes detailed rejection reasons.

Includes all values from [SolutionResultLite](#solutionresultlite) plus:

| Value | Meaning |
|-------|---------|
| `"WA"` | **Wrong Answer** |
| `"PE"` | **Presentation Error** |
| `"TLE"` | **Time Limit Exceeded** |
| `"MLE"` | **Memory Limit Exceeded** |
| `"OLE"` | **Output Limit Exceeded** |
| `"RTE"` | **Runtime Error** |
| `"NOUT"` | **No Output** |
| `"CE"` | **Compilation Error** |
| `"UKE"` | **Unknown Error** |

### SolutionResultCustom

Any `string` value not listed in [SolutionResultFull](#solutionresultfull) is treated as a custom result.

Custom results and predefined results share the same namespace. Implementations MUST first attempt to match a result string against the predefined values listed in [SolutionResultFull](#solutionresultfull). If no predefined value matches, the string is treated as a custom result.

Producers SHOULD use predefined values whenever applicable and only resort to custom values for contest-specific result types not covered by the predefined set.

---

## Solution

An individual submission to a problem.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `result` | `string` | Yes | — | The solution result (any [SolutionResultFull](#solutionresultfull) value except `null`, or a [SolutionResultCustom](#solutionresultcustom) value) |
| `score` | `number` | No | Ignored by renderer | The score for this solution |
| `time` | [TimeDuration](data-types.md#timeduration) | Yes | — | Submission time relative to contest start |
| `link` | [Link](data-types.md#link) | No | Ignored by renderer | URL to view the solution |

The `result` field MUST NOT be `null`. To represent "no submission", omit the solution from the solutions array entirely. The `null` value is only valid in [RankProblemStatus.result](#rankproblemstatus).

The `time` field represents the elapsed time from the contest start to the submission time.

### Example

```json
{
  "result": "AC",
  "score": 100,
  "time": [79, "min"],
  "link": "https://example.com/submission/12345"
}
```

---

## User

A contest participant (individual or team).

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `id` | `string` | Yes | — | Unique identifier for the user within this ranklist |
| `name` | [Text](data-types.md#text) | Yes | — | Display name |
| `official` | `boolean` | No | `true` | Whether the user is an official participant |
| `avatar` | [Image](data-types.md#image) | No | Ignored by renderer | User avatar image |
| `photo` | [Image](data-types.md#image) | No | Ignored by renderer | User photo (e.g., team photo) |
| `organization` | [Text](data-types.md#text) | No | Ignored by renderer | Organization or affiliation (e.g., university name) |
| `location` | `string` | No | Ignored by renderer | On-site physical location (e.g., seat number, room) |
| `teamMembers` | `array<`[ExternalUser](#externaluser)`>` | No | `[]` | Team member list (for team contests) |
| `marker` | `string` | No | Ignored by renderer | **Deprecated.** Single marker ID. Use `markers` instead |
| `markers` | `array<string>` | No | Ignored by renderer | Marker IDs to which the user belongs |

### Official Status

The `official` field is a declarative attribute indicating whether a user is an official contest participant. Users with `official` set to `false` are considered **unofficial** (sometimes called "out of competition" or "打星").

This field does NOT enforce any ranking behavior by itself. Its effect on rank series computations is determined entirely by the specific [rule preset](series.md#rule-presets):

- The **Normal** and **UniqByUserField** presets provide an `includeOfficialOnly` option. When `includeOfficialOnly` is `false` (the default), unofficial users participate in the series ranking normally. When `true`, unofficial users are excluded.
- The **ICPC** preset does not expose an `includeOfficialOnly` option. Per established ICPC convention, only official participants are considered for segment (medal) allocation.

Regardless of series behavior, unofficial users MUST still appear in the ranklist `rows` array.

When `official` is absent, implementations MUST treat it as `true`.

### Deprecated: `marker`

The `marker` field is **deprecated** since version 0.3.6. Use `markers` instead.

**Migration path:** A `marker` value of `"X"` is equivalent to `markers: ["X"]`.

When both `marker` and `markers` are present, `markers` takes precedence and `marker` MUST be ignored.

Implementations MUST support reading the deprecated `marker` field for backward compatibility.

### Markers Reference

Each string in the `markers` array MUST correspond to a [Marker](markers.md#marker) `id` defined in the top-level `Ranklist.markers` array. See [Markers](markers.md) for details.

### User ID Uniqueness

The `id` field MUST be unique across all users within a single ranklist. Implementations MAY use this field for deduplication, cross-referencing, or indexing.

### Example

```json
{
  "id": "moscow-state-university",
  "name": "Moscow State University",
  "official": true,
  "avatar": "https://example.com/msu-logo.png",
  "organization": "Moscow State University",
  "teamMembers": [
    { "name": "Alice" },
    { "name": "Bob", "link": "https://codeforces.com/profile/bob" }
  ],
  "markers": ["girls-team"]
}
```

## ExternalUser

A reference to an external user, typically used for team members.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | [Text](data-types.md#text) | Yes | — | Username or display name |
| `avatar` | [Image](data-types.md#image) | No | Ignored by renderer | User avatar image |
| `link` | `string` | No | Ignored by renderer | URL to the user's profile |

---

## RanklistRow

A single row in the ranklist, representing one user's contest results.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `user` | [User](#user) | Yes | — | The user for this row |
| `score` | [RankScore](#rankscore) | Yes | — | The user's total score |
| `statuses` | `array<`[RankProblemStatus](#rankproblemstatus)`>` | Yes | — | Per-problem statuses |

### Statuses Alignment

The `statuses` array MUST have the same length as the top-level `problems` array. The element at index `n` corresponds to the problem at `problems[n]`. See [Problems–Statuses Alignment](#problemsstatuses-alignment).

## RankScore

A user's total contest score.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `value` | `number` | Yes | — | The total score value |
| `time` | [TimeDuration](data-types.md#timeduration) | No | — | Total time used (e.g., total penalty time in ICPC contests) |

The semantics of `value` depend on the contest type:

- In ICPC-style contests, `value` typically represents the number of problems solved.
- In OI-style contests, `value` typically represents the total points earned.

## RankProblemStatus

The status of a specific problem for a specific user.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `result` | [SolutionResultLite](#solutionresultlite) | Yes | — | The latest confirmed result |
| `score` | `number` | No | — | The score for this problem |
| `time` | [TimeDuration](data-types.md#timeduration) | No | — | The time of the result (relative to contest start) |
| `tries` | `integer` | No | — | The number of effective submission attempts (see below) |
| `solutions` | `array<`[Solution](#solution)`>` | No | `[]` | Individual solutions, sorted by submission time in ascending order |

### Tries Semantics

The `tries` field represents the number of **effective** submission attempts for a problem. For ICPC-style contests, `tries` counts only submissions up to and including the first accepted solution (`"FB"` or `"AC"`). What constitutes an "effective" submission is determined by the sorter's [`noPenaltyResults`](sorting.md#no-penalty-results) configuration — submissions whose results appear in `noPenaltyResults` (excluding the accepted submission itself) are NOT counted as effective tries.

> **Example:** If a user submits WA, CE, WA, AC for a problem, and the default `noPenaltyResults` includes `"CE"`, then `tries` is `3` (WA + WA + AC; the CE submission is not an effective try).

### Result vs. Solutions

The `result` field represents the **summary status** of the problem for this user. It uses [SolutionResultLite](#solutionresultlite) which includes `null` (indicating no submission).

The `solutions` array, when present, provides the **detailed submission history**. The array MAY include all submissions regardless of result type — including submissions whose results match `noPenaltyResults` (e.g., `"CE"`, `"?"`, `null`). This array is not limited to effective submissions only; it serves as a complete record of all attempts.

If `solutions` is provided, implementations MAY use it to enable features such as submission timeline replay or animation. If `solutions` is absent or empty, auto-sort features based on solution data SHOULD be disabled.

When both `result` and `solutions` are present, the `result` field is authoritative for the summary status. Implementations MUST NOT derive the summary status solely from the `solutions` array, as the `result` may reflect post-contest adjustments (e.g., rejudging).

### Example

```json
{
  "result": "AC",
  "score": 100,
  "time": [79, "min"],
  "tries": 3,
  "solutions": [
    { "result": "WA", "time": [30, "min"] },
    { "result": "WA", "time": [55, "min"] },
    { "result": "AC", "time": [79, "min"] }
  ]
}
```
