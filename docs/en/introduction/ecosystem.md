# Ecosystem

## Toolchain

### Standard Ranklist

**Repository:** [algoux/standard-ranklist](https://github.com/algoux/standard-ranklist)

This is the srk core. It includes:

- **Specification documents**
- **TypeScript type definitions**
- **JSON Schema**

For developers, it can be used to:

1. Import type declarations for building tools and applications in TypeScript:

```bash
npm install -D @algoux/standard-ranklist
```

```typescript
import type * as srk from '@algoux/standard-ranklist';

const myRanklist: srk.Ranklist = { ... };
```

2. Use the JSON Schema for autocompletion and validation in JSON files, or integrate with other validation tools:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "https://unpkg.com/@algoux/standard-ranklist@latest/schema.json",
  "contest": { ... },
  "problems": [ ... ],
  "series": [ ... ],
  "rows": [ ... ]
}
```

### Renderer Component

**Repository:** [algoux/standard-ranklist-renderer-component](https://github.com/algoux/standard-ranklist-renderer-component)

A web rendering component for srk that renders ranklists. It has been used in:

- Multiple past editions of the CCPC official ranklist pages
- RankLand

→ See [Renderer Component](/en/ecosystem/renderer)

### Utils

**Repository:** [algoux/standard-ranklist-utils](https://github.com/algoux/standard-ranklist-utils)

A utility library for srk that provides common data processing functions:

- Data validation
- Sorting and computation
- Bidirectional conversion between static ranklists and submission record lists
- Other utility functions

→ See [Utils Library](/en/ecosystem/utils)

### Convert-to

**Repository:** [algoux/standard-ranklist-convert-to](https://github.com/algoux/standard-ranklist-convert-to)

A format conversion tool that converts srk data into formats used by other platforms and tools, including:

- Codeforces Gym format
- Excel spreadsheets
- Virtual Judge Replay format

→ See [Format Conversion](/en/ecosystem/convert-to)

## Typical Workflows

For developers, many scenarios are well-suited for the srk ecosystem, such as:

1. **Production** — Enhance your OJ, tools, or services by using native or converted srk data
2. **Rendering** — Use the Renderer component to display ranklists in your own applications
3. **Analysis** — Use Utils and Convert-to tools to extract and batch-process ranklist data

## Platform

### RankLand

**URL:** [https://rl.algoux.org/](https://rl.algoux.org/)

RankLand is a data distribution platform built on srk. You can easily:

- Browse officially maintained and community-contributed contest ranklist data from past years
- Debug srk data online via the [Playground](https://rl.algoux.org/playground)
- Connect your managed contests to receive stable, reliable live external ranklist distribution and data archiving services <Badge type="warning" text="Beta" />
- Use the Kessoku Series suite to provide live broadcast directing capabilities for your contests, greatly enriching the competition experience <Badge type="warning" text="Beta" />
