# Toolchain Overview

The srk ecosystem provides a suite of tools around the data format specification, covering the complete workflow from data production to display and distribution.

## Ecosystem Projects

| Project | Purpose | Package |
|---------|---------|---------|
| [Standard Ranklist](https://github.com/algoux/standard-ranklist) | Spec definition, types, and Schema | `@algoux/standard-ranklist` |
| [Renderer Component](https://github.com/algoux/standard-ranklist-renderer-component) | Web rendering components | [Renderer Component](/en/ecosystem/renderer) |
| [CLI](https://github.com/algoux/standard-ranklist-cli) | Operate srk files with command-line workflows | `@algoux/standard-ranklist-cli` |
| [Utils](https://github.com/algoux/standard-ranklist-utils) | Utility library for JavaScript/TypeScript, Python, and Go | [Utils Library](/en/ecosystem/utils) |
| [Convert-to](https://github.com/algoux/standard-ranklist-convert-to) | Format conversion tool | `@algoux/standard-ranklist-convert-to` |

## Typical Workflow Examples

### Scenario 1: Displaying a Ranklist in Your Application

```
srk → Renderer Component → Your Application
```

1. Prepare srk data or implement an API that outputs srk
2. Use the Renderer Component in your web application
3. Pass srk data to the component for rendering

### Scenario 2: Exporting to Other Platform Formats

```
srk → Convert-to → Codeforces Gym / Excel / VJ Replay
```

1. Prepare srk data
2. Use the Convert-to tool to select the target format
3. Generate the target format file

### Scenario 3: Maintaining and Publishing srk Files

```
srk → CLI validate / diagnose / preview / render → CI / Static Pages
```

1. Use the CLI to validate srk file structure and find common data issues
2. Preview ranklists locally in the browser
3. Render static pages for archives, publishing, or PR review
