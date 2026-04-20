# Toolchain Overview

The srk ecosystem provides a suite of tools around the data format specification, covering the complete workflow from data production to display and distribution.

## Ecosystem Projects

| Project | Purpose | npm Package |
|---------|---------|-------------|
| [Standard Ranklist](https://github.com/algoux/standard-ranklist) | Spec definition, types, and Schema | `@algoux/standard-ranklist` |
| [Renderer Component](https://github.com/algoux/standard-ranklist-renderer-component) | Web rendering component | `@algoux/standard-ranklist-renderer-component` |
| [Utils](https://github.com/algoux/standard-ranklist-utils) | Utility library | `@algoux/standard-ranklist-utils` |
| [Convert-to](https://github.com/algoux/standard-ranklist-convert-to) | Format conversion tool | `@algoux/standard-ranklist-convert-to` |

## Typical Workflow Examples

### Scenario 1: Displaying a Ranklist in Your Application

```
srk → Renderer Component → Your Application
```

1. Prepare srk data or implement an API that outputs srk
2. Install and use the Renderer component in your web application
3. Pass srk data to the component for rendering

### Scenario 2: Exporting to Other Platform Formats

```
srk → Convert-to → Codeforces Gym / Excel / VJ Replay
```

1. Prepare srk data
2. Use the Convert-to tool to select the target format
3. Generate the target format file
