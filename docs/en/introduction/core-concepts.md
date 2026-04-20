# Core Concepts

srk is a **static** ranklist data format. That is, it is a data format capable of fully describing a ranklist snapshot at a given point in time — rather than the traditional approach of storing separate "submissions", "participants", and "problems" for tools to compute dynamically.

This design has been validated through extensive real-world use. Beyond being computation-free and easy to parse and display, the "snapshot" philosophy is inherently compatible with data source conversion from HTML archives, PDFs, or screenshots, as well as incomplete ranklist data (e.g., data with only scores but no detailed submission records). It has virtually no limitations on applicable scenarios.

With utility tools, we can also easily convert a static ranklist into the traditional "time-series submission list" form for incremental updates and high-performance computation (in fact, the official srk toolchain handles dynamic insertion and re-sorting exactly this way).

Let's explore the srk data structure — this will help you build a holistic understanding before diving into individual modules.

## Top-Level Structure

An srk document is a JSON object (called a **Ranklist**) containing the following core fields:

```json
{
  "type": "general",
  "version": "0.3.12",
  "contest": { ... },
  "problems": [ ... ],
  "series": [ ... ],
  "rows": [ ... ],
  "markers": [ ... ],
  "sorter": { ... }
}
```

| Field | Description | Required |
|-------|-------------|----------|
| `type` | Format type, currently fixed as `"general"` | ✅ |
| `version` | Specification version | ✅ |
| `contest` | Contest information (title, time, etc.) | ✅ |
| `problems` | Problem list | ✅ |
| `rows` | Row data (ranklist rows) | ✅ |
| `series` | Rank series configuration | ✅ |
| `markers` | Participant marker configuration | ❌ |
| `sorter` | Sorting algorithm configuration | ❌ |

The following diagram shows the relationships between core objects:

```
Ranklist
├── contest ─────────── Contest info (title, start time, duration…)
├── problems[] ──────── Problem list
│   └── Problem ─────── Single problem (alias, title, statistics…)
├── rows[] ──────────── Ranklist rows (core data, one row per participant)
│   ├── user ────────── Participant (individual/team) info
│   ├── score ───────── Score
│   └── statuses[] ──── Per-problem status (aligned with problems[])
│       ├── result ──── Result (AC/RJ/FB/...)
│       ├── tries ───── Number of attempts
│       └── solutions[] Submission records
├── series[] ────────── Rank series
│   ├── segments[] ──── Segment configuration
│   └── rule ────────── Ranking rule
├── markers[] ───────── Participant marker configuration
│   └── Marker ──────── Single marker (ID, label, style)
└── sorter ──────────── Sorting algorithm (ICPC / score)
```

## Core Object Overview

### Contest
Describes basic contest information: title, start time, duration, freeze time, etc.

→ See [Contest & Problems](/en/guide/contest-and-problems)

### Problem
Describes a single problem: alias (e.g., A, B, C), title, link, submission statistics, etc.

→ See [Contest & Problems](/en/guide/contest-and-problems)

### User (Participant)
Describes a participant: ID, name, organization, official status, team members, etc.

→ See [Participants](/en/guide/participants)

### RanklistRow
A single row of ranking data containing participant info, total score, and per-problem status.

→ See [Rows](/en/guide/rows)

### RankSeries
Defines a ranking dimension, such as "Overall Rank", "School Rank", "Regional Rank", etc. Each series can have its own award allocation rules.

→ See [Series & Segments](/en/guide/series-and-segments)

### Sorter
Defines the sorting algorithm for rankings (e.g., ICPC rules or pure score sorting).

→ See [Sorting](/en/guide/sorter)

### Marker
Used to add metadata tags to participants (e.g., girls' team, provincial team), which can be combined with Series to implement group-specific independent rankings.

→ See [Markers](/en/guide/markers)

## Next Steps

Continue exploring:

- [Ecosystem](./ecosystem) — Learn about the srk toolchain and platform
- [Getting Started](/en/guide/getting-started) — Learn srk through data examples
