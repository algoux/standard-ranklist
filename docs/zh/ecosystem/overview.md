# 工具链总览

srk 生态围绕数据格式规范提供了一系列工具，覆盖从数据生产到展示和分发的完整工作流。

## 生态项目一览

| 项目 | 用途 | npm 包 |
|------|------|--------|
| [Standard Ranklist](https://github.com/algoux/standard-ranklist) | 规范定义、类型和 Schema | `@algoux/standard-ranklist` |
| [Renderer Component](https://github.com/algoux/standard-ranklist-renderer-component) | Web 渲染组件 | `@algoux/standard-ranklist-renderer-component` |
| [Utils](https://github.com/algoux/standard-ranklist-utils) | 工具库 | `@algoux/standard-ranklist-utils` |
| [Convert-to](https://github.com/algoux/standard-ranklist-convert-to) | 格式转换工具 | `@algoux/standard-ranklist-convert-to` |

## 典型工作流示例

### 场景 1：在自己的应用中展示榜单

```
srk → Renderer Component → 你的应用
```

1. 准备 srk 数据或实现可输出 srk 的 API
2. 在 Web 应用中安装和使用 Renderer 组件
3. 将 srk 数据传入组件进行渲染

### 场景 2：导出为其他平台格式

```
srk → Convert-to → Codeforces Gym / Excel / VJ Replay
```

1. 准备 srk 数据
2. 使用 Convert-to 工具选择目标格式
3. 生成目标格式的文件
