import { SimpleKeyPathComponent } from '../src/path/simple-key-path-component';
import JSONHeroPath from '../src';

describe('Parsing tests', () => {
  test('Blank path should create a root path', () => {
    let pathString = '';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toEqual('$');
  });

  test('Simple parse test', () => {
    let pathString = '$.results.0.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toEqual(pathString);
  });

  test('Delimiter parse test', () => {
    let pathString = '$.resu\\.lts\\..0.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toEqual(4);
  });

  test('Single backslash test', () => {
    let pathString = '$.resu\\lts.0.key\\a';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Asterisk test', () => {
    let pathString = '$.results*.*.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Dollar test', () => {
    let pathString = '$.$re$ults$.*.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Adds $ if not included', () => {
    let pathString = 'results.*.key';
    let hero = JSONHeroPath.fromString(pathString);

    expect(hero.toString()).toEqual(`$.${pathString}`);
    expect(hero.components.length).toBe(4);
  });
});

describe('Simple path query tests', () => {
  test('First path query with objects', () => {
    let firstComponent = new SimpleKeyPathComponent('resultsList');
    let secondComponent = new SimpleKeyPathComponent('1');
    let thirdComponent = new SimpleKeyPathComponent('name');

    let jamesNameQuery = new JSONHeroPath([firstComponent, secondComponent, thirdComponent]);
    expect(jamesNameQuery.first(testObject1)).toBe('James');
  });

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

describe('Wildcard path query tests', () => {
  test('Array all elements', () => {
    let path = JSONHeroPath.fromString('resultsList.*');
    let results = path.all(testObject1);
    expect(results).toEqual(testObject1.resultsList);
  });

  test('Array first element', () => {
    let path = JSONHeroPath.fromString('resultsList.*');
    let results = path.first(testObject1);
    expect(results).toEqual(testObject1.resultsList[0]);
  });

  test('All array names', () => {
    let path = JSONHeroPath.fromString('resultsList.*.name');
    let results = path.all(testObject1);
    expect(results).toEqual(['Matt', 'James', 'Eric', 'Dan']);
  });

  test('All ages', () => {
    let path = JSONHeroPath.fromString('people.*.age');
    let results = path.all(testObject2);
    expect(results).toEqual([
      testObject2.people.Matt.age,
      testObject2.people.James.age,
      testObject2.people.Eric.age,
      testObject2.people.Dan.age,
    ]);
  });

  test('All favourite things', () => {
    let path = JSONHeroPath.fromString('people.*.favouriteThings.*');
    let results = path.all(testObject2).flat();
    let expected = testObject2.people.Matt.favouriteThings
      .concat(testObject2.people.James.favouriteThings)
      .concat(testObject2.people.Eric.favouriteThings)
      .concat(testObject2.people.Dan.favouriteThings);

    expect(results).toEqual(expected);
  });

  test('Original object', () => {
    let objectQuery = JSONHeroPath.fromString('$');
    let queryResult = objectQuery.all(testObject1);
    expect(queryResult).toEqual(testObject1);
  });

  test('Original array', () => {
    let objectQuery = JSONHeroPath.fromString('$');
    let queryResult = objectQuery.all(testArray1);
    expect(queryResult).toEqual(testArray1);
  });

  test('Original object with blank path', () => {
    let objectQuery = JSONHeroPath.fromString('');
    let queryResult = objectQuery.all(testObject1);
    expect(queryResult).toEqual(testObject1);
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

let testObject2 = {
  people: {
    Matt: {
      age: 36,
      favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park'],
    },
    James: {
      age: 93,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    },
    Eric: {
      age: 38,
      favouriteThings: ['Bitcoin'],
    },
    Dan: {
      age: 34,
      favouriteThings: ['Friday admin', 'Doing laundry', 'Frasier'],
    },
  },
};

let testArray1 = [
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
];
