# Standard Ranklist (srk) Specification

## Abstract

Standard Ranklist (srk) is a JSON-based data format for describing competitive programming contest ranklists. It provides a standardized structure to represent contests, problems, users, solutions, rankings, and associated metadata, enabling interoperability between ranklist producers (contest systems, data converters) and consumers (renderers, analyzers, archivers).

srk is designed primarily for ICPC-style and OI-style programming contests but is extensible to other contest formats.

## Status

- **Specification Version:** 0.3.12
- **Status:** Draft
- **Last Updated:** 2026-02-03

## Table of Contents

This specification is organized into the following documents:

| Document | Description |
|----------|-------------|
| [README.md](README.md) (this document) | Overview, conventions, and versioning |
| [data-types.md](data-types.md) | Common and primitive data types |
| [ranklist.md](ranklist.md) | Core Ranklist object and nested structures |
| [series.md](series.md) | Rank series, segments, and rule presets |
| [sorting.md](sorting.md) | Sorter algorithms and ranking computation |
| [markers.md](markers.md) | Marker system for user annotation |

## Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "NOT RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [BCP 14](https://www.rfc-editor.org/bcp/bcp14) \[[RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119)\] \[[RFC 8174](https://datatracker.ietf.org/doc/html/rfc8174)\] when, and only when, they appear in capitalized form, as shown here.

## Notational Conventions

### Canonical Format

JSON \[[RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)\] is the canonical serialization format for srk. All examples in this specification use JSON. Implementations MAY support other serialization formats (such as YAML, TOML, or XML) by mapping the abstract data model to the target format; such mappings are outside the scope of this specification.

### Type Notation

This specification uses the following type notation to describe fields:

| Notation | JSON Type | Description |
|----------|-----------|-------------|
| `string` | String | A JSON string |
| `number` | Number | A JSON number |
| `integer` | Number | A JSON number with no fractional part |
| `boolean` | Boolean | A JSON boolean (`true` or `false`) |
| `array<T>` | Array | A JSON array where each element is of type `T` |
| `object` | Object | A JSON object |
| `null` | Null | The JSON `null` value |
| `T \| U` | (varies) | A union type: the value is either of type `T` or type `U` |

### Field Tables

Each object type is described by a field table with the following columns:

| Column | Meaning |
|--------|---------|
| **Field** | The JSON property name |
| **Type** | The value type using the notation above |
| **Required** | Whether the field MUST be present. "Yes" means REQUIRED; "No" means OPTIONAL |
| **Default** | The default value when the field is absent. "—" means no default (either required or ignored when absent) |
| **Description** | Semantic description of the field |

When a field is marked as OPTIONAL and its default is listed as "Ignored by renderer", this means the field carries no rendering semantics when absent, and implementations SHOULD simply omit the corresponding UI element.

## Versioning

### Version Format

srk follows [Semantic Versioning 2.0.0](https://semver.org/) with the version string format `MAJOR.MINOR.PATCH`.

- **MAJOR** version changes indicate incompatible structural changes.
- **MINOR** version changes indicate new functionality added in a backward-compatible manner.
- **PATCH** version changes indicate backward-compatible bug fixes or documentation clarifications.

### Pre-1.0 Stability

While the major version is `0` (i.e., `0.x.y`), the API is considered unstable:

- MINOR version increments (e.g., `0.3.x` → `0.4.0`) MAY contain breaking changes.
- PATCH version increments (e.g., `0.3.11` → `0.3.12`) MUST remain backward-compatible within the same minor version.

### Backward Compatibility

A change is considered **backward-compatible** if:

- New OPTIONAL fields are added to existing objects.
- New enumeration values are added to existing union types.
- Documentation or descriptions are clarified without changing semantics.

A change is considered **breaking** if:

- A REQUIRED field is added, removed, or renamed.
- The type of an existing field is changed.
- The semantics of an existing field are altered in a way that would change the behavior of conforming implementations.

### Implementation Guidance

- Implementations MUST include the `version` field in every srk document.
- Implementations SHOULD check the `version` field and report a warning if the version is higher than the latest version they support.
- Implementations MUST NOT reject a document solely because it contains unknown fields. Unknown fields SHOULD be preserved if the implementation re-serializes the document, and SHOULD be silently ignored otherwise.

## Internal Fields Convention

Fields with a leading underscore prefix (e.g., `_now`) are **internal/runtime fields**. These fields:

- Are NOT part of the persistent data model.
- MUST NOT be written to persistent storage (files, databases) under normal circumstances.
- Are intended for transient use cases such as real-time ranklist streaming.
- Implementations SHOULD strip internal fields when serializing a ranklist for storage or archival.

## Deprecated Fields Convention

Fields marked as **deprecated** in this specification:

- Are still formally defined and part of the data model.
- Implementations MUST support reading deprecated fields from existing data.
- Producers SHOULD NOT use deprecated fields when creating new data; the replacement field SHOULD be used instead.
- Where both a deprecated field and its replacement are present, the replacement field takes precedence.
- Each deprecated field definition includes a migration path indicating the replacement.

## License

This specification is licensed under the [MIT License](../LICENSE).
