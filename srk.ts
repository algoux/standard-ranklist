/*! *****************************************************************************
Copyright (c) OJ Standards Committee. All rights reserved. 

***************************************************************************** */

type Type = 'standard';
type Version = '0.1.0';

//#region common

/**
 * ISO8601 String.
 * @example
 * '2019-01-01T00:00:00Z'
 * '2019-01-01T08:00:00+08:00'
 * '2019-01-01T00:00:00.000Z'
 */
type DatetimeISOString = string;

/** Time unit. */
type TimeUnit = 'ms' | 's' | 'min' | 'h' | 'd';

/**
 * Time duration.
 * @example
 * [25, 'ms'] // 25ms
 * [2, 's'] // 2s
 * [60, 's'] // 1m
 */
type TimeDuration = [number, TimeUnit];

/** URL. */
type Link = string;

/** Base64 string. */
type Base64 = string;

/** Image. */
type Image = Link | Base64;

/** Image with link. */
type ImageWithLink = [Image, Link];

/**
 * Set an item to Dual Theme item. The first param used for light theme, and the second used for dark theme.
 * @example 
 * const example: DualThemeItem<string> = ['light', 'dark']
 */
type DualThemeItem<T> = [T, T];

/**
 * Color HEX.
 * @example
 * '#FFFFFF'
 */
type ColorHEX = string;

/**
 * Color RGBA.
 * @example
 * [0, 0, 0, 0.5]
 */
type ColorRGBA = [number, number, number, number];

/** General color format. */
type Color = ColorHEX | ColorRGBA;

/** Theme color. If only one color provided, the second color will inherit from the first one. */
type ThemeColor = Color | DualThemeItem<Color>;

interface Style {
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

//#endregion common

//#region ranklist

interface ExternalUser {
  /** Username. */
  name: string;

  /**
   * The link to view the user.
   * @defaultValue Ignored by renderer.
   */
  link?: string;
}

interface User {
  /** Unique ID for each user. */
  id?: number | string;

  /** Username. */
  name: string;

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
  organization?: string;

  /**
   * Team members.
   * @defaultValue []
   */
  teamMembers?: ExternalUser[];
}

interface ProblemStatistics {
  /** The number of accepted solutions totally. */
  accepted: number;

  /** The number of submitted solutions totally. */
  submitted: number;
}

interface Problem {
  /**
   * Problem title.
   * @defaultValue Ignored by renderer.
   */
  title?: string;

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
type SolutionResultLite = 'FB' | 'AC' | 'RJ' | '?' | null;

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
type SolutionResultFull = SolutionResultLite | 'WA' | 'PE' | 'TLE' | 'MLE' | 'OLE' | 'RTE' | 'CE' | 'UKE';

/** Solution result custom (allows any string). */
type SolutionResultCustom = string;

interface Solution {
  /** Result. */
  result: SolutionResultFull | SolutionResultCustom;

  /** The score. */
  score?: number;

  /** Submission time. */
  time: TimeDuration;

  /**
   * The link to view the solution.
   * @defaultValue Ignored by renderer.
   */
  link?: Link;
}

interface Contest {
  /** Contest title. */
  title: string;

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
   * The link to view the original contest.
   * @defaultValue Ignored by renderer.
   */
  link?: string;
}

/** Rank series segment style preset. The style value will be determined by renderer. */
type RankSeriesSegmentStylePreset = 'gold' | 'silver' | 'bronze' | 'iron'

interface RankSeriesSegment {
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

interface RankSeries {
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

interface RankValue {
  /** Rank value initially. If the user is unofficial and rank value equals null, it will be rendered as unofficial mark such as '*'. */
  rank: number | null;

  /**
   * Series segment index which this rank belongs to initially. Null means this rank does not belong to any segment. Undefined means it will be calculated automatically (only if the segment's count property exists).
   * @defaultValue null
   */
  segmentIndex?: number | null;
}

interface RankScore {
  /** The total score value. */
  value: number;

  /** Time used totally. */
  time?: TimeDuration;
}

interface RankProblemStatus {
  /** Latest confirmed result. */
  result: SolutionResultLite;

  /** The score. */
  score?: number;

  /** The time of result. */
  time?: TimeDuration;

  /** The tries count. */
  tries?: number;

  /**
   * Solutions for this problem.
   * @defaultValue []
   */
  solutions?: Solution[];
}

interface RanklistRow {
  /** The list of rank value calculated. Each one corresponding to a rank series. */
  ranks: RankValue[];

  /** User info. */
  user: User;

  /** Score. */
  score: RankScore;

  /** Problem statuses. Each one corresponding to a problem. */
  statuses: RankProblemStatus[];
}

interface SorterBase {
  /** Sorter algorithm. */
  algorithm: string;

  /** Config for this sorter. */
  config: Record<string, any>;
}

interface SorterICPC extends SorterBase {
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
type Sorter = SorterICPC | SorterBase;

interface Ranklist {
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

  /** Sorter. If no sorter specified, any extra auto-sort feature will be disabled by renderer. */
  sorter?: Sorter;

  /** Current time. Used for real-time ranklist. */
  _now?: DatetimeISOString;
}

//#endregion ranklist

//#region demo

const ranklist: Ranklist = {
  type: 'standard',
  version: '0.1.0',
  contest: {
    title: 'ACM ICPC World Finals 2018',
    startAt: '2018-04-19T09:51:00+08:00',
    duration: [5, 'h'],
    frozenDuration: [1, 'h'],
    link: 'https://icpc.baylor.edu/scoreboard/',
  },
  problems: [
    {
      title: 'Catch the Plane',
      alias: 'A',
      link: 'https://open.kattis.com/problems/catch',
      statistics: {
        accepted: 111,
        submitted: 268,
      },
      style: {
        backgroundColor: '#58a2d1',
      },
    },
    {
      title: 'Comma Sprinkler',
      alias: 'B',
      link: 'https://open.kattis.com/problems/comma',
      statistics: {
        accepted: 152,
        submitted: 265,
      },
      style: {
        backgroundColor: '#fc6d3e',
      },
    },
  ],
  series: [
    {
      title: 'Rank',
      segments: [
        {
          title: 'Gold Medalist',
          count: 4,
          style: 'gold',
        },
        {
          title: 'Silver Medalist',
          count: 4,
          style: 'silver',
        },
        {
          title: 'Bronze Medalist',
          count: 4,
          style: 'bronze',
        },
      ],
    }
  ],
  rows: [
    {
      ranks: [
        {
          rank: 1,
          segmentIndex: 0,
        },
      ],
      user: {
        name: 'Moscow State University',
        avatar: '',
      },
      score: {
        value: 9,
        time: [1427, 'min'],
      },
      statuses: [
        {
          result: 'AC',
          time: [79, 'min'],
          tries: 1,
        },
        {
          result: 'AC',
          time: [87, 'min'],
          tries: 1,
        },
      ],
    },
  ],
  sorter: {
    algorithm: 'ICPC',
    config: {},
  },
};

//#endregion demo
