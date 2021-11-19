import { JSONHeroPath } from '../../src';
import { SimpleKeyPathComponent } from '../../src/path/simple-key-path-component';

describe('Parsing tests', () => {
  test('Simple parse test', () => {
    let pathString = 'results.0.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
  });

  test('Delimiter parse test', () => {
    let pathString = 'resu\\.lts\\..0.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(3);
  });

  test('Single backslash test', () => {
    let pathString = 'resu\\lts.0.key\\a';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(3);
  });
});

describe('Simple path query tests', () => {
  test('First path query', () => {
    let jamesNameQuery = JSONHeroPath.fromString('resultsList.1.name');
    expect(jamesNameQuery.first(testObject1)).toBe('James');
  });

  test('Missing element path query', () => {
    let invalidArrayIndexQuery = JSONHeroPath.fromString('resultsList.6.name');
    expect(invalidArrayIndexQuery.first(testObject1)).toBe(null);
  });

  test('Object result', () => {
    let objectQuery = JSONHeroPath.fromString('resultsList');
    let queryResult = objectQuery.first(testObject1);
    expect(queryResult).toBe(testObject1.resultsList);
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
