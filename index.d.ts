/*! *****************************************************************************
Copyright (c) algoUX. All rights reserved. 

***************************************************************************** */

export type Type = 'general';
export type Version = '0.2.2';

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

/** URL. */
export type Link = string;

/**
 * Link with title.
 * @example
 * { link: 'https://icpc.baylor.edu/', title: 'ICPC Home Page' }
 */
export interface LinkWithTitle {
  link: Link;
  title: string;
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
export type ThemeColor = Color | {
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
 * i18n string set.
 * @example
 * { "en_US": 'English', "zh_CN": '中文', fallback: 'English' }
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
  id?: number | string;

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
   */
  marker?: string;
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
 * 'CE' means "Compilation error".
 * 'UKE' means "Unknown Error".
 */
export type SolutionResultFull = SolutionResultLite | 'WA' | 'PE' | 'TLE' | 'MLE' | 'OLE' | 'RTE' | 'CE' | 'UKE';

/** Solution result custom (allows any string). */
export type SolutionResultCustom = string;

export interface Solution {
  /** Result. */
  result: SolutionResultFull | SolutionResultCustom;

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
   * The link to view original contest.
   * @defaultValue Ignored by renderer.
   */
  link?: Link;

  /**
   * Reference links of contest.
   * @defaultValue Ignored by renderer.
   */
  refLinks?: LinkWithTitle[];
}

/** Rank series segment style preset. The style value will be determined by renderer. */
export type RankSeriesSegmentStylePreset = 'gold' | 'silver' | 'bronze' | 'iron';

export interface RankSeriesSegment {
  /**
   * Segment title.
   * @defaultValue Ignored by renderer.
   */
  title?: string;

  /**
   * Maximum user count in this segment. User's segment will be calculated automatically based on rank.
   * @defaultValue Use rank's segmentIndex property instead and it will be treated as 0 if auto-calculation triggered.
   */
  count?: number;

  /**
   * Custom style on ranklist table body.
   * @defaultValue Determined by renderer.
   */
  style?: Style | RankSeriesSegmentStylePreset;
}

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
}

export interface RankValue {
  /** Rank value initially. If the user is unofficial and rank value equals null, it will be rendered as unofficial mark such as '*'. */
  rank: number | null;

  /**
   * Series segment index which this rank belongs to initially. `null` means this rank does not belong to any segment. `undefined` means it will be calculated automatically (only if the segment's count property exists).
   * @defaultValue null
   */
  segmentIndex?: number | null;
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
  /** The list of rank value calculated. Each one corresponding to a rank series. */
  ranks: RankValue[];

  /** User info. */
  user: User;

  /** Score. */
  score: RankScore;

  /** Problem statuses. Each one corresponding to a problem. */
  statuses: RankProblemStatus[];
}

/** Marker style preset. The style value will be determined by renderer. */
export type MarkerStylePreset = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';

/** Marker to mark the specified user. */
export interface Marker {
  /** Marker id. */
  id: string;

  /** Marker label to display. */
  label: Text;

  /** Custom style for marker. */
  style: Style | MarkerStylePreset;
}

export interface SorterBase {
}

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
     * @defaultValue ['FB', 'AC', '?', 'CE', 'UKE', null]
     */
    noPenaltyResults?: SolutionResultFull[];
  };
}

/** Sorter type. */
export type Sorter = SorterICPC;

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

  /** Current time. Used for real-time ranklist. */
  _now?: DatetimeISOString;
}

//#endregion ranklist
