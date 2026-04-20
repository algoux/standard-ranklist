# What is Standard Ranklist?

**Standard Ranklist (srk)** is a **static** data format designed to standardize the description of competitive programming ranklist data. It is easy to parse, highly extensible, and archive-friendly.

The core srk specification uses JSON, so the recommended file extension is `.srk.json`, although srk itself is agnostic to any particular serialization format.

## What Problem Does It Solve

In the competitive programming world, various contest systems (such as DOMjudge, Codeforces, etc.) each have their own internal ranklist data structures. When you need to:

- Display a mirrored contest ranklist on your own website
- Migrate ranklist data from one system to another
- Perform unified analysis and processing on ranklist data
- Archive and share contest ranklists

The drawbacks of disparate data formats become apparent — we often need to write custom adapters and scrapers for each system.

**srk was created to solve these problems.** It provides a unified format to describe any ranklist data, compatible with ICPC, OI, and extended contest formats, along with a unified open-source community toolchain for generating, parsing, converting, and rendering ranklist data.

## Positioning of srk

Think of srk as the "universal interchange standard" for ranklist data. We aim to build it as part of the foundational infrastructure for the competitive programming ecosystem. This allows more community contributors to focus on higher-level creativity, avoiding repetitive low-level work and enjoying the benefits of open collaboration.

srk has been initiated and maintained by the algoUX team since 2019. A data distribution platform called [RankLand](https://rl.algoux.org/) has been built around it, making it easy for the community to share and consume srk data. The relationship between srk and RankLand is like that between git and GitHub.

As of 2026, the platform hosts hundreds of srk datasets maintained by the algoUX team, along with dozens of community contributions. Advanced features such as "self-service contest hosting" and "live broadcast director suite" are gradually being opened to all users.

## Current Version

- **Specification version:** `0.3.12`
- **Status:** Draft
- **Versioning strategy:** Follows [Semantic Versioning 2.0.0](https://semver.org/)

## Learn More

- [Core Concepts](./core-concepts) — Understand the srk data structure
- [Spec](https://github.com/algoux/standard-ranklist/blob/master/specs/README.md) — Read the formal specification
