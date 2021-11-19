import JSONHero from '../src';
import { SimpleKeyPathComponent } from '../src/path-components';

test('Simple path query', () => {
  let jamesNameQuery = new JSONHero([
    new SimpleKeyPathComponent('resultsList'),
    new SimpleKeyPathComponent('1'),
    new SimpleKeyPathComponent('name'),
  ]);

  expect(jamesNameQuery.query(testObject1)).toBe('James');

  let invalidArrayIndexQuery = new JSONHero([
    new SimpleKeyPathComponent('resultsList'),
    new SimpleKeyPathComponent('6'),
    new SimpleKeyPathComponent('name'),
  ]);

  expect(invalidArrayIndexQuery.query(testObject1)).toBe(null);
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
