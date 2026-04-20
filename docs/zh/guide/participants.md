# 参赛者

## User 对象

每行排名数据中的 `user` 字段描述一个参赛者（如个人选手或团队）。

### 基本配置

一个 User 至少需要 `id` 和 `name`：

```json
{
  "id": "team-alpha",
  "name": "Team Alpha"
}
```

| 字段 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `id` | 唯一标识符 | ✅ | — |
| `name` | 显示名称 | ✅ | — |
| `official` | 是否正式参赛 | ❌ | `true` |
| `organization` | 所属组织（如学校） | ❌ | — |
| `teamMembers` | 队伍成员列表 | ❌ | `[]` |
| `avatar` | 头像图片 | ❌ | — |
| `photo` | 照片 | ❌ | — |
| `location` | 现场位置（如座位号） | ❌ | — |
| `markers` | 标记 ID 列表 | ❌ | — |

### ID 唯一性

`id` 在整份 ranklist 中必须唯一，可用于去重、索引和交叉引用。

### 正式/非正式参赛

`official` 字段标记选手是否为正式参赛者（打星选手设为 `false`）：

```json
{
  "id": "guest-team",
  "name": "Guest Team",
  "official": false,
  "organization": "Some University"
}
```

::: warning 注意
`official` 字段本身不直接影响排名计算。它的效果取决于所使用的排名系列规则：
- **ICPC 预设**：默认仅正式选手参与奖区分配
- **Normal / UniqByUserField 预设**：通过 `includeOfficialOnly` 选项控制

无论 `official` 值如何，选手都会出现在榜单中，除非渲染器进行了过滤。
:::

### 团队信息

对于团队比赛，可以使用 `organization` 和 `teamMembers` 添加团队信息：

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

`teamMembers` 中的每个成员是一个 ExternalUser 对象：

| 字段 | 说明 | 必填 |
|------|------|------|
| `name` | 成员名称 | ✅ |
| `avatar` | 头像 | ❌ |
| `link` | 个人主页链接 | ❌ |

### 标记

通过 `markers` 字段可以给选手打上标记（如"女队"、"省内队伍"等），需要配合顶层 `markers` 定义使用：

```json
{
  "id": "team-gamma",
  "name": "Team Gamma",
  "markers": ["girls-team"]
}
```

→ 详见 [标记系统](./markers)

### 国际化名称

`name` 和 `organization` 这样的 i18n 字符串支持国际化：

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

→ 详见 [进阶特性 — 国际化](./advanced#国际化)

> 完整字段定义请参阅 [User 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/ranklist.md#user)
