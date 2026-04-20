# standard-ranklist

Standard Ranklist (srk) is a json format to describe many kinds of ranklists like ICPC, OI, etc.

With srk, most of programming contest ranklists can be described in a standard format. It's easy to customize display style with different renderers and share everywhere.

Version: `0.3.12` (updated on 2026-02-03)

## Files

- [`specs/`](specs/): srk specification documents
- [`index.d.ts`](index.d.ts): srk type definition (can be used in TypeScript)
- [`schema.json`](schema.json): srk JSON Schema (can be used in JSON Schema validator)
- [`demo.ts`](demo.ts): json like demo

## Resources

- [Documentation](https://srk.algoux.org/)
- [Standard Ranklist Renderer Component](https://github.com/algoux/standard-ranklist-renderer-component): a modern web renderer component for srk (used in many CCPC official ranklist pages and [RankLand](https://rl.algoux.org))
- [Standard Ranklist Utils](https://github.com/algoux/standard-ranklist-utils): JavaScript/TypeScript utilities for srk
- [Standard Ranklist Convert-to](https://github.com/algoux/standard-ranklist-convert-to): a tool lib to convert srk format to other formats like Codeforces Gym, Excel, VJ Replay, etc
