import * as srk from '.';

const ranklist: srk.Ranklist = {
  type: 'general',
  version: '0.2.1',
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
