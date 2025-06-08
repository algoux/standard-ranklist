# CHANGELOG

## 0.3.7

- Feature: add `rankingTimePrecision` and `rankingTimeRounding` field for SorterICPC config

## 0.3.6

- Feature: add `markers` field for user and deprecate `marker` field

## 0.3.4

- Feature: support new sorter type `score`
- Feature: add new known solution result enum `NOUT` which means `No Output`

## 0.3.3

- Feature: add `filter` option for series preset `RankSeriesRulePresetICPC`
- Change: `contest.link` has been removed. Use `contest.refLinks` to declare all related external links

## 0.3.2

- Feature: add `remarks` field
- Feature: add ICPC sorter `sorter.config.timePrecision` and `sorter.config.timeRounding` for custom time precision and rounding

## 0.3.1

- Feature: add `noTied` sub options for series rule preset `ICPC`

## 0.3.0

- Feature: add `series[].rule` to describe the rule of the rank calculation, and removed `rows[].ranks`

## 0.2.4

- Feature: `User.id` is now required and must be string

## 0.2.3

- Feature: add `contributors` field

## 0.2.2

- Feature: add text i18n support
