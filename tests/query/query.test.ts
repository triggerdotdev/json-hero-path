import { JSONHeroQuery } from '../../src';

describe('Wildcard path query tests', () => {
  test('Simple number test', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'childKey',
            key: 'age',
            operatorType: '>=',
            value: 36,
          },
        ],
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual([testObject1.resultsList[0], testObject1.resultsList[1], testObject1.resultsList[2]]);
  });
});

let testObject1 = {
  resultsList: [
    {
      name: 'Matt',
      age: 36,
      favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park'],
    },
    {
      name: 'James',
      age: 93,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    },
    {
      name: 'Eric',
      age: 38,
      favouriteThings: ['Bitcoin'],
    },
    {
      name: 'Dan',
      age: 34,
      favouriteThings: ['Friday admin', 'Doing laundry', 'Frasier'],
    },
  ],
  count: 4,
};
