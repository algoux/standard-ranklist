# Participants

## User Object

The `user` field in each row describes a participant (individual or team).

### Basic Configuration

A User requires at least `id` and `name`:

```json
{
  "id": "team-alpha",
  "name": "Team Alpha"
}
```

| Field | Description | Required | Default |
|-------|-------------|----------|---------|
| `id` | Unique identifier | ✅ | — |
| `name` | Display name | ✅ | — |
| `official` | Whether officially participating | ❌ | `true` |
| `organization` | Organization (e.g., university) | ❌ | — |
| `teamMembers` | Team member list | ❌ | `[]` |
| `avatar` | Avatar image | ❌ | — |
| `photo` | Photo | ❌ | — |
| `location` | On-site location (e.g., seat number) | ❌ | — |
| `markers` | List of marker IDs | ❌ | — |

### ID Uniqueness

`id` must be unique within the entire ranklist and can be used for deduplication, indexing, and cross-referencing.

### Official / Unofficial Participation

The `official` field indicates whether a participant is officially competing (set to `false` for unofficial/unranked participants):

```json
{
  "id": "guest-team",
  "name": "Guest Team",
  "official": false,
  "organization": "Some University"
}
```

::: warning Note
The `official` field does not directly affect ranking computation. Its effect depends on the rank series rule being used:
- **ICPC preset**: By default, only official participants are included in segment allocation
- **Normal / UniqByUserField presets**: Controlled by the `includeOfficialOnly` option

Regardless of the `official` value, participants appear in the ranklist unless filtered by the renderer.
:::

### Team Information

For team competitions, use `organization` and `teamMembers` to add team details:

```json
{
  "id": "team-1",
  "name": "SDUT Team 1",
  "organization": "Shandong University of Technology",
  "teamMembers": [
    { "name": "Alice" },
    { "name": "Bob", "link": "https://codeforces.com/profile/bob" },
    { "name": "Ciallo" }
  ]
}
```

Each member in `teamMembers` is an ExternalUser object:

| Field | Description | Required |
|-------|-------------|----------|
| `name` | Member name | ✅ |
| `avatar` | Avatar | ❌ |
| `link` | Personal page link | ❌ |

### Markers

The `markers` field tags participants (e.g., "Girls Team", "Provincial Team"), used in conjunction with the top-level `markers` definitions:

```json
{
  "id": "team-gamma",
  "name": "Team Gamma",
  "markers": ["girls-team"]
}
```

→ See [Markers](./markers)

### Internationalized Names

`name` and `organization`, as i18n string fields, support internationalization:

```json
{
  "id": "pku",
  "name": {
    "fallback": "reborn as a vegetable dog",
    "zh-CN": "重生之我是菜狗"
  },
  "organization": {
    "fallback": "Peking University",
    "en": "Peking University",
    "zh-CN": "北京大学"
  }
}
```

→ See [Advanced — Internationalization](./advanced#internationalization-i18n)

> For complete field definitions, see the [User Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#user)
