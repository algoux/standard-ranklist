import * as srk from '.';

const ranklist: srk.Ranklist = {
  type: 'general',
  version: '0.3.8',
  remarks: 'This is a demo ranklist.',
  contributors: ['bLue <mail@example.com> (https://example.com/)'],
  contest: {
    title: 'ACM ICPC World Finals 2018',
    startAt: '2018-04-19T17:00:00+08:00',
    duration: [5, 'h'],
    frozenDuration: [1, 'h'],
    refLinks: [
      {
        title: 'Original Ranklist',
        link: 'https://icpc.baylor.edu/scoreboard/',
      },
    ],
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
          style: 'gold',
        },
        {
          title: 'Silver Medalist',
          style: 'silver',
        },
        {
          title: 'Bronze Medalist',
          style: 'bronze',
        },
      ],
      rule: {
        preset: 'ICPC',
        options: {
          count: {
            value: [4, 4, 4],
          },
        },
      },
    },
  ],
  rows: [
    {
      user: {
        id: 'Moscow State University',
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
