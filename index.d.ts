/*! *****************************************************************************
Copyright (c) algoUX. All rights reserved. 

***************************************************************************** */

export type Type = 'general';
export type Version = '0.3.7';

//#region common

/**
 * ISO8601 String.
 * @example
 * '2019-01-01T00:00:00Z'
 * '2019-01-01T08:00:00+08:00'
 * '2019-01-01T00:00:00.000Z'
 */
export type DatetimeISOString = string;

/** Time unit. */
export type TimeUnit = 'ms' | 's' | 'min' | 'h' | 'd';

/**
 * Time duration.
 * @example
 * [25, 'ms'] // 25ms
 * [2, 's'] // 2s
 * [60, 's'] // 1m
 */
export type TimeDuration = [number, TimeUnit];

/**
 * i18n string set.
 * @example
 * { "en-US": 'English', "zh-CN": '中文', fallback: 'English' }
 */
export type I18NStringSet = {
  /** The fallback string if renderer cannot determine the language to use. */
  fallback: string;
  /** The key is the IETF BCP 47 language tag, and the value is the string for this language tag. */
  [key: string]: string;
};

/**
 * Text (i18n supported).
 */
export type Text = string | I18NStringSet;

/** URL. */
export type Link = string;

/**
 * Link with title.
 * @example
 * { link: 'https://icpc.baylor.edu/', title: 'ICPC Home Page' }
 */
export interface LinkWithTitle {
  link: Link;
  title: Text;
}

/** Base64 string. */
export type Base64 = string;

/** Image. */
export type Image = Link | Base64;

/** Image with link. */
export interface ImageWithLink {
  image: Image;
  link: Link;
}

/**
 * Color HEX.
 * @example
 * '#FFFFFF'
 */
export type ColorHEX = string;

/**
 * Color RGB.
 * @example
 * 'rgb(255, 255, 255)'
 */
export type ColorRGB = string;

/**
 * Color RGBA.
 * @example
 * 'rgba(255, 255, 255, 0.75)'
 */
export type ColorRGBA = string;

/** General color format. */
export type Color = ColorHEX | ColorRGB | ColorRGBA;

/** Theme color. If only one color (for light theme) provided, the color for dark theme will be same as the light. */
export type ThemeColor =
  | Color
  | {
      light: Color;
      dark: Color;
    };

export interface Style {
  /**
   * Text color.
   * @defaultValue Determined by renderer.
   */
  textColor?: ThemeColor;

  /**
   * Background color.
   * @defaultValue Determined by renderer.
   */
  backgroundColor?: ThemeColor;
}

/**
 * Contributor field. The email and url are optional.
 * @example
 * 'bLue <mail@example.com> (https://example.com/)'
 */
export type Contributor = string;

//#endregion common

//#region ranklist

export interface ExternalUser {
  /** Username. */
  name: Text;

  /**
   * User avatar.
   * @defaultValue Ignored by renderer.
   */
  avatar?: Image;

  /**
   * The link to view user.
   * @defaultValue Ignored by renderer.
   */
  link?: string;
}

export interface User {
  /** Unique ID for each user. */
  id: string;

  /** Username. */
  name: Text;

  /**
   * Determines whether the user is official. If it's false, the user's rank will not be calculated in ranklist.
   * @defaultValue true
   */
  official?: boolean;

  /**
   * User avatar.
   * @defaultValue Ignored by renderer.
   */
  avatar?: Image;

  /**
   * Organization.
   * @defaultValue Ignored by renderer.
   */
  organization?: Text;

  /**
   * Team members.
   * @defaultValue []
   */
  teamMembers?: ExternalUser[];

  /**
   * Marker id for this user.
   * @defaultValue Ignored by renderer.
   * @deprecated Use `markers` instead.
   */
  marker?: string;

  /**
   * Marker ids to which the user belongs.
   * @defaultValue Ignored by renderer.
   * @since 0.3.6
   */
  markers?: string[];
}

export interface ProblemStatistics {
  /** The number of accepted solutions totally. */
  accepted: number;

  /** The number of submitted solutions totally. */
  submitted: number;
}

export interface Problem {
  /**
   * Problem title.
   * @defaultValue Ignored by renderer.
   */
  title?: Text;

  /**
   * Specifies an alias for problem.
   * @defaultValue Determined by renderer.
   * @example
   * 'A'
   * 'B'
   * '1-1'
   */
  alias?: string;

  /**
   * The link to view problem.
   * @defaultValue Ignored by renderer.
   */
  link?: Link;

  /** Problem statistics. */
  statistics?: ProblemStatistics;

  /**
   * Custom style on ranklist table header.
   * @defaultValue Determined by renderer.
   */
  style?: Style;
}

/**
 * Solution result lite preset.
 * 'FB' means "First Blood", the first to solve.
 * 'AC' means accepted.
 * 'RJ' means rejected.
 * '?' means the result is frozen.
 * null means no solutions submitted yet.
 */
export type SolutionResultLite = 'FB' | 'AC' | 'RJ' | '?' | null;

/**
 * Solution result full preset.
 * 'WA' means "Wrong Answer".
 * 'PE' means "Presentation Error".
 * 'TLE' means "Time Limit Exceeded".
 * 'MLE' means "Memory Limit Exceeded".
 * 'OLE' means "Output Limit Exceeded".
 * 'RTE' means "Runtime Error".
 * 'NOUT' means "No Output".
 * 'CE' means "Compilation error".
 * 'UKE' means "Unknown Error".
 */
export type SolutionResultFull =
  | SolutionResultLite
  | 'WA'
  | 'PE'
  | 'TLE'
  | 'MLE'
  | 'OLE'
  | 'RTE'
  | 'NOUT'
  | 'CE'
  | 'UKE';

/** Solution result custom (allows any string). */
export type SolutionResultCustom = string;

export interface Solution {
  /** Result. */
  result: Exclude<SolutionResultFull, null> | SolutionResultCustom;

  /**
   * The score.
   * @defaultValue Ignored by renderer.
   */
  score?: number;

  /** Submission time. */
  time: TimeDuration;

  /**
   * The link to view solution.
   * @defaultValue Ignored by renderer.
   */
  link?: Link;
}

export interface Contest {
  /** Contest title. */
  title: Text;

  /** Start time. */
  startAt: DatetimeISOString;

  /** Contest duration. */
  duration: TimeDuration;

  /**
   * Ranklist frozen duration.
   * @defaultValue [0, 's']
   */
  frozenDuration?: TimeDuration;

  /** Banner image. */
  banner?: Image | ImageWithLink;

  /**
   * Reference links of contest.
   * @defaultValue Ignored by renderer.
   */
  refLinks?: LinkWithTitle[];
}

/** Rank series segment style preset. The style value will be determined by renderer. */
export type RankSeriesSegmentStylePreset =
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'iron';

export interface RankSeriesSegment {
  /**
   * Segment title.
   * @defaultValue Ignored by renderer.
   */
  title?: string;

  /**
   * Custom style on ranklist table body.
   * @defaultValue Determined by renderer.
   */
  style?: Style | RankSeriesSegmentStylePreset;
}

/**
 * A series preset which is used to generate rank without any special process.
 * This preset will directly assign rank to each user in ascending order if their scores are different.
 */
export interface RankSeriesRulePresetNormal {
  preset: 'Normal';
  options?: {
    /**
     * Whether to include official users only.
     * @defaultValue false
     */
    includeOfficialOnly?: boolean;
  };
}

/**
 * A series preset which is used to generate rank by unique user field value.
 * This preset will pick a subset of users with different specified user field values to assign rank in scending order.
 * If multiple users have the same value of the field, only the first one will be picked.
 */
export interface RankSeriesRulePresetUniqByUserField {
  preset: 'UniqByUserField';
  options: {
    /**
     * Specify the field name of `user`.
     * @example 'organization'
     */
    field: keyof User;
    /**
     * Whether to include official users only.
     * @defaultValue false
     */
    includeOfficialOnly?: boolean;
  };
}

/**
 * A series preset which is used to generate rank by ICPC rules.
 * This preset will calculate rank by classic ICPC rules.
 */
export interface RankSeriesRulePresetICPC {
  preset: 'ICPC';
  options: {
    /**
     * Use ratio algorithm to calculate rank.
     * This algorithm will assign rank based on ratio.
     *
     * For example, if there are 240 users and the medal segment size are 10%, 20%, 30% of total user number,
     * then the rank of the first 24 users will win gold medal (the first segment),
     * the rank of the next 48 users will win silver medal (the second segment), and so on.
     *
     * Note that if multi algorithms specified, the segment will only be assigned if all algorithms are satisfied.
     */
    ratio?: {
      /**
       * The ratio size of each segment.
       * @example [0.1, 0.2, 0.3]
       */
      value: number[];

      /**
       * The rounding method.
       *
       * For example, if their are 248 users and the ratio values are 10%, 20%, 30%,
       * then there should be 24.8 users assigned the first segment.
       * If the rounding method is 'ceil', actually the first 25 users will be assigned the first segment.
       * If the rounding method is 'floor', actually the first 24 users will be assigned the first segment.
       * If the rounding method is 'round', actually the first 25 users will be assigned the first segment.
       * @defaultValue 'ceil'
       */
      rounding?: 'floor' | 'ceil' | 'round';

      /**
       * Specify how to count the denominator (total user number).
       * If the value is 'all', the denominator will be the total user number.
       * If the value is 'submitted', the denominator will be number of users which have submitted at least one solution.
       * @defaultValue 'all'
       */
      denominator?: 'all' | 'submitted';

      /**
       * Whether force no tied for rank segments calculation.
       * For example, if the tied ranks are [1, 1, 3, 4] and the option is true, the ranks will be fixed to [1, 2, 3, 4] then calculate.
       */
      noTied?: boolean
    };

    /**
     * Use count algorithm to calculate rank.
     * This algorithm will assign rank based on fixed number, i.e. each segment will have the fixed size.
     */
    count?: {
      /**
       * The fixed size of each segment.
       * @example [24, 48, 72]
       */
      value: number[];

      /**
       * Whether force no tied for rank segments calculation.
       * For example, if the tied ranks are [1, 1, 3, 4] and the option is true, the ranks will be fixed to [1, 2, 3, 4] then calculate.
       */
      noTied?: boolean;
    };

    /**
     * Use filter to determine users to be included.
     * Only if the user matches all filter options, it will be included as denominator.
     */
    filter?: {
      byUserFields?: {
        /**
         * The field name of `user` to be filtered.
         * @example 'organization'
         */
        field: keyof User;

        /**
         * The field match rule (RegExp constructor string) of `user` to be filtered.
         * @example 'SDUT'
         */
        rule: string;
      }[];
    },
  };
}

export type RankSeriesRulePreset =
  | RankSeriesRulePresetNormal
  | RankSeriesRulePresetUniqByUserField
  | RankSeriesRulePresetICPC;

export interface RankSeries {
  /**
   * Series title on ranklist table header.
   * @defaultValue Generated by renderer.
   */
  title?: string;

  /**
   * Series segments.
   * @defaultValue []
   */
  segments?: RankSeriesSegment[];

  /**
   * Calculation rule for this series.
   */
  rule?: RankSeriesRulePreset;
}

export interface RankScore {
  /** The total score value. */
  value: number;

  /** Time used totally. */
  time?: TimeDuration;
}

export interface RankProblemStatus {
  /** Latest confirmed result. */
  result: SolutionResultLite;

  /** The score. */
  score?: number;

  /** The time of result. */
  time?: TimeDuration;

  /** The tries count. */
  tries?: number;

  /**
   * Solutions for this problem (sorted by submission time in ascending order).
   * If no solutions provided, auto-sort feature will be disabled.
   * @defaultValue []
   */
  solutions?: Solution[];
}

export interface RanklistRow {
  /** User info. */
  user: User;

  /** Score. */
  score: RankScore;

  /** Problem statuses. Each one corresponding to a problem. */
  statuses: RankProblemStatus[];
}

/** Marker style preset. The style value will be determined by renderer. */
export type MarkerStylePreset =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink';

/** Marker to mark the specified user. */
export interface Marker {
  /** Marker id. */
  id: string;

  /** Marker label to display. */
  label: Text;

  /** Custom style for marker. */
  style: Style | MarkerStylePreset;
}

export interface SorterBase {}

export interface SorterICPC extends SorterBase {
  algorithm: 'ICPC';

  config: {
    /**
     * Penalty time per extra tries before the first accepted solution.
     * @defaultValue [20, 'min']
     */
    penalty?: TimeDuration;

    /**
     * No penalty solution result list.
     * @defaultValue ['FB', 'AC', '?', 'NOUT', 'CE', 'UKE', null]
     */
    noPenaltyResults?: SolutionResultFull[];

    /**
     * Time precision when calculating ranklist.
     * 
     * For example, if the time unit of raw statuses is 's' (second) and the target time unit is 'min' (minute),
     * then the time will be converted to minutes before calculating ranklist.
     * @defaultValue No converting, based on raw precision of statuses data
     */ 
    timePrecision?: TimeUnit;

    /**
     * The rounding method when converting time unit to specified time precision.
     * @defaultValue 'floor'
     */
    timeRounding?: 'floor' | 'ceil' | 'round';

    /**
     * Time precision when calculating rankings.
     *
     * This will only affect the rankings.
     *
     * It is equivalent to converting the final total time to the target precision before calculating rankings of series.
     *
     * Using lower precision means there is a higher probability of ranking ties.
     * @defaultValue No converting, based on raw total time after calculating ranklist
     * @since 0.3.7
     */ 
    rankingTimePrecision?: TimeUnit;

    /**
     * The rounding method of converting time unit to specified time precision when calculating rankings.
     * @defaultValue 'floor'
     * @since 0.3.7
     */
    rankingTimeRounding?: 'floor' | 'ceil' | 'round';
  };
}

export interface SorterScore extends SorterBase {
  algorithm: 'score';

  config: any;
}

/** Sorter type. */
export type Sorter = SorterICPC | SorterScore;

export interface Ranklist {
  /** Ranklist type. */
  type: Type | string;

  /** Ranklist version for current type. */
  version: Version | string;

  /** Contest info. */
  contest: Contest;

  /** Problems info. */
  problems: Problem[];

  /** Rank series. */
  series: RankSeries[];

  /** Ranklist data. */
  rows: RanklistRow[];

  /**
   * Available markers.
   * @defaultValue []
   */
  markers?: Marker[];

  /** Sorter. If no sorter specified, any extra auto-sort feature will be disabled by renderer. */
  sorter?: Sorter;

  /** Contributors. */
  contributors?: Contributor[];

  /** Remarks of the ranklist. */
  remarks?: Text;

  /** Current time. Used for real-time ranklist. */
  _now?: DatetimeISOString;
}

//#endregion ranklist
