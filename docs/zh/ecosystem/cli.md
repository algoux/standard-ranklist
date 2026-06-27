# CLI 命令行工具

## 简介

[Standard Ranklist CLI](https://github.com/algoux/standard-ranklist-cli) 是面向 srk 文件的命令行工具，命令名为 `srk`。它适合在本地开发、数据维护和 CI 流程中完成校验、诊断、修补、浏览器预览和静态页面渲染等操作。

## 安装

```bash
npm install -g @algoux/standard-ranklist-cli
```

CLI 需要 Node.js `>=22`。

## 命令一览

| 命令 | 用途 |
|------|------|
| `validate` | 快速检查 srk 的 Schema 字段、类型、枚举值和格式 |
| `diagnose` | 输出数据诊断报告，并可生成可自动修复问题的 `srk-patch` 文件 |
| `patch` | 将 `srk-patch` 补丁应用到 srk |
| `preview` | 启动本地预览服务，在浏览器中查看单个 srk 文件或目录树 |
| `render` | 将单个 srk 文件或目录渲染为静态 HTML，可用于归档、发布和预览页面 |

## 简要用法

### 校验文件结构

```bash
srk validate srk.json
```

`validate` 适合放在 CI 中作为轻量级结构检查。它只检查 JSON 语法、必需字段、字段类型、枚举值和 Schema 格式等。

### 诊断

```bash
srk diagnose srk.json
srk diagnose --format json srk.json
# 生成可自动修复建议问题的补丁文件
srk diagnose --patch generated.patch.json srk.json
```

`diagnose` 用于发现 srk 数据中的语义问题。诊断结果本身不会让命令以失败状态退出。

### 修补

```bash
srk patch srk.json fix.patch.json > fixed.srk.json
srk patch -o fixed.srk.json srk.json fix.patch.json
# 修补并直接覆盖原文件
srk patch --in-place srk.json fix.patch.json
```

### 本地预览

```bash
srk preview srk.json
srk preview ./ranklists
srk preview -w -p 3003 ./ranklists
srk preview --git-diff-base main --git-diff-head HEAD ./ranklists
```

文件模式会直接渲染指定 srk 文件；目录模式可允许访问目录内的所有 `*.srk.json` 文件。

### 渲染静态页面

```bash
srk render srk.json > ranklist.html
srk render -o ranklist.html srk.json
srk render -o ./review-site ./ranklists
srk render -o ./review-site --git-diff-base main --git-diff-head HEAD ./ranklists
```

目录渲染模式会生成 `index.html` 和 `data/` 目录，适合部署到静态文件服务。使用 Git diff 参数可以只渲染某个分支或提交范围内变化过的 srk 文件。

## 更多文档

关于完整的参数说明和发布历史，请参考项目仓库：

→ [algoux/standard-ranklist-cli](https://github.com/algoux/standard-ranklist-cli)

