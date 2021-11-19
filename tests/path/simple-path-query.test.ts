import { JSONHeroPath } from '../../src';
import { SimpleKeyPathComponent } from '../../src/path/path-components';

test('First path query', () => {
  let jamesNameQuery = new JSONHeroPath([
    new SimpleKeyPathComponent('resultsList'),
    new SimpleKeyPathComponent('1'),
    new SimpleKeyPathComponent('name'),
  ]);

  expect(jamesNameQuery.first(testObject1)).toBe('James');
});

test('Missing element path query', () => {
  let invalidArrayIndexQuery = new JSONHeroPath([
    new SimpleKeyPathComponent('resultsList'),
    new SimpleKeyPathComponent('6'),
    new SimpleKeyPathComponent('name'),
  ]);

  expect(invalidArrayIndexQuery.first(testObject1)).toBe(null);
});

test('Object result', () => {
  let jamesNameQuery = new JSONHeroPath([new SimpleKeyPathComponent('resultsList')]);
  let queryResult = jamesNameQuery.first(testObject1);
  expect(queryResult).toBe(testObject1.resultsList);
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
