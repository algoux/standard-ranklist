# Versioning & Compatibility

## Version Format

srk follows [Semantic Versioning 2.0.0](https://semver.org/), with the format `MAJOR.MINOR.PATCH`.

| Part | Change Meaning |
|------|----------------|
| **MAJOR** | Incompatible structural changes |
| **MINOR** | Backward-compatible new features |
| **PATCH** | Backward-compatible bug fixes or documentation clarifications |

## Pre-1.0 Stability

srk is currently in the `0.x` stage, and the API is considered **unstable**:

- **Minor version upgrades** (e.g., `0.3.x` → `0.4.0`) **may** contain incompatible changes
- **Patch version upgrades** (e.g., `0.3.11` → `0.3.12`) are guaranteed to be **backward-compatible** within the same minor version

## Version History

| Version | Major Changes |
|---------|---------------|
| 0.3.12 | Added `RelativePath` image type |
| 0.3.11 | Added `photo` and `location` user fields |
| 0.3.10 | Added JSON Schema |
| 0.3.9 | Added `byMarker` filter option |
| 0.3.8 | Added `scored` denominator option |
| 0.3.7 | Added ranking time precision configuration |
| 0.3.6 | Added `markers` field, deprecated `marker` |
| 0.3.4 | Added `score` sorter, `NOUT` result |
| 0.3.3 | Added Series filter options |
| 0.3.2 | Added `remarks`, time precision configuration |
| 0.3.1 | Added `noTied` option |
| 0.3.0 | Introduced `series[].rule`, removed `rows[].ranks` |

For the complete changelog, see [CHANGELOG](https://github.com/algoux/standard-ranklist/blob/master/CHANGELOG.md).
