# 排序算法

## Sorter 的作用

`sorter` 字段定义 ranklist 的排序算法。当指定了 sorter 时，可以根据算法对 `rows` 进行重排序并计算排名。这通常适用于根据完整提交记录动态计算排名的场景（如回放/时光机，或实时榜单的增量更新）。

如果不指定 `sorter`，通常渲染器会保持 `rows` 的原始顺序，并禁用重排序功能。

srk 目前定义了两种排序算法：

| 算法 | 适用场景 |
|------|---------|
| `"ICPC"` | ICPC 赛制（按解题数降序，罚时升序） |
| `"score"` | 纯分数赛制（按总分降序） |

## ICPC 排序器

### 基本配置

```json
{
  "sorter": {
    "algorithm": "ICPC",
    "config": {}
  }
}
```

#### 排序规则

1. **解题数降序** — 解题多的排名靠前
2. **总罚时升序** — 解题数相同时，罚时少的排名靠前

解题数和罚时都相同的选手**并列**。

### penalty

对于每道已解出的题目：

```
题目罚时 = 通过时间 + (额外错误次数 × 每次罚时)
```

- **通过时间**：AC 提交的时间（相对于比赛开始）
- **额外错误次数**：AC 之前的有效错误提交次数
- **每次罚时**：`config.penalty` 的值（默认 `[20, "min"]`）

**总罚时 = 所有已解出题目的罚时之和**（未解出的题目不计罚时）

#### 自定义罚时

```json
{
  "sorter": {
    "algorithm": "ICPC",
    "config": {
      "penalty": [10, "min"]
    }
  }
}
```

#### 罚时计算示例

配置：`penalty: [20, "min"]`

| 题目 | 结果 | 通过时间 | tries | 罚时计算 |
|------|------|---------|-------|---------|
| A | AC | 79 min | 1 | 79 + 0×20 = **79** |
| B | AC | 150 min | 3 | 150 + 2×20 = **190** |
| C | RJ | — | 5 | 不计 |

**总计：** 解题 2 道，总罚时 79 + 190 = **269 分钟**

### noPenaltyResults

允许配置不计入有效提交的结果类型，从而影响罚时计算。默认不计有效提交的结果包括：

`["FB", "AC", "?", "NOUT", "CE", "UKE", null]`

例如，CE（编译错误）默认不计罚时。你可以自定义这个列表：

```json
{
  "config": {
    "noPenaltyResults": ["FB", "AC", "?", null]
  }
}
```

上面的配置会让 CE、NOUT、UKE 也计入罚时。

### 时间精度配置

#### timePrecision/timeRounding

它们影响题目通过时间的计算精度（未配置时，取最精确的精度）。也即每个通过时间要按怎样的精度累加进总罚时：

```json
{
  "config": {
    "timePrecision": "min",
    "timeRounding": "floor"
  }
}
```

以上面的配置为例，如果数据中的首次 AC 提交时间为 `[125, "s"]`，则先转换为 `[2, "min"]`，再和本题错误尝试罚时以及其他题目的罚时进行累加。

#### rankingTimePrecision/rankingTimeRounding

它们影响计算排名时应该按怎样的精度进行比较，以确定是否存在 segment 并列（未配置时，取最精确的精度）：

```json
{
  "config": {
    "rankingTimePrecision": "min",
    "rankingTimeRounding": "floor"
  }
}
```

以上面的配置为例，如果两名选手的总罚时分别为 `[6000, "s"]` 和 `[6059, "s"]`，则在计算排名时，总罚时会被转换为 `[100, "min"]` 和 `[100, "min"]`，视为并列排名，这可能会影响奖区分配。

## Score 排序器

适用于纯分数赛制：

```json
{
  "sorter": {
    "algorithm": "score",
    "config": {}
  }
}
```

按 `score.value` 降序排列，分数相同则并列。

`config` 目前未定义具体选项，保留为空对象即可。

> 完整字段定义请参阅 [Sorter 规范](https://github.com/algoux/standard-ranklist/blob/master/specs/sorting.md)
