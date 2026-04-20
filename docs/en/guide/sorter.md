# Sorting

## Role of the Sorter

The `sorter` field defines the sorting algorithm for the ranklist. When a sorter is specified, the `rows` can be re-sorted and rankings computed according to the algorithm. This is typically used in scenarios where rankings are dynamically computed from complete submission records (e.g., replay/time machine, or incremental updates for live ranklists).

If `sorter` is not specified, renderers typically preserve the original order of `rows` and disable re-sorting functionality.

srk currently defines two sorting algorithms:

| Algorithm | Use Case |
|-----------|----------|
| `"ICPC"` | ICPC format (by problems solved descending, then penalty ascending) |
| `"score"` | Pure score format (by total score descending) |

## ICPC Sorter

### Basic Configuration

```json
{
  "sorter": {
    "algorithm": "ICPC",
    "config": {}
  }
}
```

#### Sorting Rules

1. **Problems solved descending** — More problems solved ranks higher
2. **Total penalty ascending** — With equal problems solved, less penalty ranks higher

Participants with the same number of problems solved and the same penalty **tie**.

### penalty

For each solved problem:

```
Problem penalty = Acceptance time + (extra wrong attempts × penalty per attempt)
```

- **Acceptance time**: Time of the AC submission (relative to contest start)
- **Extra wrong attempts**: Number of effective wrong submissions before AC
- **Penalty per attempt**: Value of `config.penalty` (default `[20, "min"]`)

**Total penalty = Sum of penalties for all solved problems** (unsolved problems do not contribute)

#### Custom Penalty

```json
{
  "sorter": {
    "algorithm": "ICPC",
    "config": {
      "penalty": [10, "min"]
    }
  }
}
```

#### Penalty Calculation Example

Configuration: `penalty: [20, "min"]`

| Problem | Result | Acceptance Time | tries | Penalty Calculation |
|---------|--------|----------------|-------|---------------------|
| A | AC | 79 min | 1 | 79 + 0×20 = **79** |
| B | AC | 150 min | 3 | 150 + 2×20 = **190** |
| C | RJ | — | 5 | Not counted |

**Total:** 2 problems solved, total penalty 79 + 190 = **269 minutes**

### noPenaltyResults

Configures result types that should not count as effective submissions, thereby affecting penalty calculation. The default results not counted as effective submissions are:

`["FB", "AC", "?", "NOUT", "CE", "UKE", null]`

For example, CE (Compilation Error) does not incur penalty by default. You can customize this list:

```json
{
  "config": {
    "noPenaltyResults": ["FB", "AC", "?", null]
  }
}
```

The configuration above makes CE, NOUT, and UKE also count toward penalty.

### Time Precision Configuration

#### timePrecision / timeRounding

These affect the precision of problem acceptance time calculations (when not configured, the most precise precision is used). That is, at what precision each acceptance time should be accumulated into the total penalty:

```json
{
  "config": {
    "timePrecision": "min",
    "timeRounding": "floor"
  }
}
```

Using the configuration above as an example, if a first AC submission time in the data is `[125, "s"]`, it is first converted to `[2, "min"]`, then accumulated with the problem's wrong attempt penalty and other problems' penalties.

#### rankingTimePrecision / rankingTimeRounding

These affect the precision used when comparing total penalties for ranking, to determine whether segment ties exist (when not configured, the most precise precision is used):

```json
{
  "config": {
    "rankingTimePrecision": "min",
    "rankingTimeRounding": "floor"
  }
}
```

Using the configuration above as an example, if two participants have total penalties of `[6000, "s"]` and `[6059, "s"]`, when computing rankings, the total penalties are converted to `[100, "min"]` and `[100, "min"]`, treated as a tie, which may affect segment allocation.

## Score Sorter

For pure score-based formats:

```json
{
  "sorter": {
    "algorithm": "score",
    "config": {}
  }
}
```

Sorts by `score.value` in descending order; equal scores result in a tie.

`config` currently has no defined options — keep it as an empty object.

> For complete field definitions, see the [Sorter Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/sorting.md)
