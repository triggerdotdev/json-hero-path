import { JSONHeroQuery } from '../../src';

describe('Wildcard path query tests', () => {
  test('Simple older than query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'operator',
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

  test('Simple favourite things query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
      },
      {
        path: 'favouriteThings',
      },
      {
        path: '*',
        filters: [
          {
            type: 'operator',
            operatorType: 'startsWith',
            value: 'Far Cry',
          },
        ],
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual(testObject1.resultsList[1].favouriteThings);
  });

  test('Sub path equal query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'subPath',
            path: 'favouriteThings.*',
            operatorType: '==',
            value: 'Rocket League',
          },
        ],
      },
      {
        path: 'name',
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual(['Matt', 'Eric']);
  });

  test('Sub path contains query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'subPath',
            path: 'favouriteThings.*',
            operatorType: 'startsWith',
            value: 'Far Cry',
          },
        ],
      },
      {
        path: 'name',
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual(['James']);
  });

  test('Multiple filters query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'subPath',
            path: 'favouriteThings.*',
            operatorType: '==',
            value: 'Rocket League',
          },
          {
            type: 'subPath',
            path: 'favouriteThings.*',
            operatorType: '==',
            value: 'Monzo',
          },
        ],
      },
      {
        path: 'name',
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual(['Matt']);
  });

  test('Or filter query', () => {
    let queryConfig = [
      {
        path: 'resultsList',
      },
      {
        path: '*',
        filters: [
          {
            type: 'or',
            subFilters: [
              {
                type: 'subPath',
                path: 'favouriteThings.*',
                operatorType: '==',
                value: 'Rocket League',
              },
              {
                type: 'subPath',
                path: 'favouriteThings.*',
                operatorType: '==',
                value: 'Monzo',
              },
              {
                type: 'subPath',
                path: 'favouriteThings.*',
                operatorType: '==',
                value: 'Frasier',
              },
            ],
          },
        ],
      },
      {
        path: 'name',
      },
    ];

    let query = JSONHeroQuery.fromObject(queryConfig);
    let results = query.all(testObject1);

    expect(results).toEqual(['Matt', 'Eric', 'Dan']);
  });
});

let testObject1 = {
  resultsList: [
    {
      name: 'Matt',
      age: 36,
      favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park', 'Rocket League'],
    },
    {
      name: 'James',
      age: 93,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    },
    {
      name: 'Eric',
      age: 38,
      favouriteThings: ['Bitcoin', 'Rocket League'],
    },
    {
      name: 'Dan',
      age: 34,
      favouriteThings: ['Friday admin', 'Doing laundry', 'Frasier'],
    },
  ],
  count: 4,
};
