# CLI Tool

## Introduction

[Standard Ranklist CLI](https://github.com/algoux/standard-ranklist-cli) is a command-line tool for srk files. Its executable name is `srk`, and it is designed for local development, data maintenance, and CI workflows that need validation, diagnostics, patching, browser previews, static HTML rendering, and similar operations.

## Installation

```bash
npm install -g @algoux/standard-ranklist-cli
```

The CLI requires Node.js `>=22`.

## Commands

| Command | Purpose |
|---------|---------|
| `validate` | Quickly checks srk Schema fields, types, enum values, and formats |
| `diagnose` | Prints a data diagnostics report and can generate an `srk-patch` file for auto-fixable issues |
| `patch` | Applies an `srk-patch` file to srk |
| `preview` | Starts a local preview server for a single srk file or a directory tree |
| `render` | Renders a single srk file or a directory into static HTML for archives, publishing, and preview pages |

## Quick Usage

### Validate Structure

```bash
srk validate srk.json
```

`validate` is suitable as a lightweight CI structure check. It checks JSON syntax, required fields, field types, enum values, Schema formats, and similar structure constraints.

### Diagnose

```bash
srk diagnose srk.json
srk diagnose --format json srk.json
# Generate a patch file for auto-fixable suggested issues
srk diagnose --patch generated.patch.json srk.json
```

`diagnose` finds semantic issues in srk data. Diagnostics findings themselves do not make the command fail.

### Patch

```bash
srk patch srk.json fix.patch.json > fixed.srk.json
srk patch -o fixed.srk.json srk.json fix.patch.json
# Patch and overwrite the input file
srk patch --in-place srk.json fix.patch.json
```

### Preview Locally

```bash
srk preview srk.json
srk preview ./ranklists
srk preview -w -p 3003 ./ranklists
srk preview --git-diff-base main --git-diff-head HEAD ./ranklists
```

File mode renders the selected srk file directly. Directory mode allows access to all `*.srk.json` files inside the directory.

### Render Static HTML

```bash
srk render srk.json > ranklist.html
srk render -o ranklist.html srk.json
srk render -o ./review-site ./ranklists
srk render -o ./review-site --git-diff-base main --git-diff-head HEAD ./ranklists
```

Directory render mode generates `index.html` and a `data/` directory for static hosting. Git diff options can render only srk files changed in a branch or commit range.

## More Documentation

For complete option references and release history, see the project repository:

→ [algoux/standard-ranklist-cli](https://github.com/algoux/standard-ranklist-cli)
