# 版本与兼容性

## 版本格式

srk 遵循 [语义化版本 2.0.0](https://semver.org/lang/zh-CN/)，版本号格式为 `MAJOR.MINOR.PATCH`。

| 部分 | 变更含义 |
|------|---------|
| **MAJOR** | 不兼容的结构性变更 |
| **MINOR** | 向后兼容的新功能 |
| **PATCH** | 向后兼容的问题修复或文档澄清 |

## Pre-1.0 稳定性

当前 srk 仍处于 `0.x` 阶段，API 被视为**不稳定**：

- **次版本升级**（如 `0.3.x` → `0.4.0`）**可能**包含不兼容变更
- **补丁版本升级**（如 `0.3.11` → `0.3.12`）保证在同一次版本内**向后兼容**

## 版本历史

| 版本 | 主要变更 |
|------|---------|
| 0.3.12 | 添加 `RelativePath` 图片类型 |
| 0.3.11 | 添加 `photo` 和 `location` 用户字段 |
| 0.3.10 | 添加 JSON Schema |
| 0.3.9 | 添加 `byMarker` 筛选选项 |
| 0.3.8 | 添加 `scored` 分母选项 |
| 0.3.7 | 添加排名时间精度配置 |
| 0.3.6 | 添加 `markers` 字段，废弃 `marker` |
| 0.3.4 | 添加 `score` 排序器、`NOUT` 结果 |
| 0.3.3 | 添加 Series filter 选项 |
| 0.3.2 | 添加 `remarks`、时间精度配置 |
| 0.3.1 | 添加 `noTied` 选项 |
| 0.3.0 | 引入 `series[].rule`，移除 `rows[].ranks` |

完整变更日志请参阅 [CHANGELOG](https://github.com/algoux/standard-ranklist/blob/master/CHANGELOG.md)。
