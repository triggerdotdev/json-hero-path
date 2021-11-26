import { SimpleKeyPathComponent } from '../src/path/simple-key-path-component';
import { JSONHeroPath } from '../src';

describe('Parsing tests', () => {
  test('Blank path should create a root path', () => {
    let pathString = '';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toEqual('$');
  });

  test('Simple parse test', () => {
    let pathString = '$.results.0.key';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toEqual(pathString);
  });

  test('Delimiter parse test', () => {
    let pathString = '$.resu\\.lts\\..0.key';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toEqual(4);
  });

  test('Single backslash test', () => {
    let pathString = '$.resu\\lts.0.key\\a';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Asterisk test', () => {
    let pathString = '$.results*.*.key';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Dollar test', () => {
    let pathString = '$.$re$ults$.*.key';
    let hero = new JSONHeroPath(pathString);

    expect(hero.toString()).toBe(pathString);
    expect(hero.components.length).toBe(4);
  });

  test('Adds $ if not included', () => {
    let pathString = 'results.*.key';
    let hero = new JSONHeroPath(pathString);

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
    let jamesNameQuery = new JSONHeroPath('resultsList.1.name');
    expect(jamesNameQuery.first(testObject1)).toEqual('James');
  });

  test('Simple all query with one result', () => {
    let jamesNameQuery = new JSONHeroPath('resultsList.1.name');
    expect(jamesNameQuery.all(testObject1)).toEqual(['James']);
  });

  test('Missing element path query', () => {
    let invalidArrayIndexQuery = new JSONHeroPath('resultsList.6.name');
    expect(invalidArrayIndexQuery.first(testObject1)).toBe(null);
  });

  test('Object result', () => {
    let objectQuery = new JSONHeroPath('resultsList');
    let queryResult = objectQuery.first(testObject1);
    expect(queryResult).toBe(testObject1.resultsList);
  });
});

describe('Wildcard path query tests', () => {
  test('Array all elements', () => {
    let path = new JSONHeroPath('resultsList.*');
    let results = path.all(testObject1);
    expect(results).toEqual(testObject1.resultsList);
  });

  test('Array first element', () => {
    let path = new JSONHeroPath('resultsList.*');
    let results = path.first(testObject1);
    expect(results).toEqual(testObject1.resultsList[0]);
  });

  test('All array names', () => {
    let path = new JSONHeroPath('resultsList.*.name');
    let results = path.all(testObject1);
    expect(results).toEqual(['Matt', 'James', 'Eric', 'Dan']);
  });

  test('All ages', () => {
    let path = new JSONHeroPath('people.*.age');
    let results = path.all(testObject2);
    expect(results).toEqual([
      testObject2.people.Matt.age,
      testObject2.people.James.age,
      testObject2.people.Eric.age,
      testObject2.people.Dan.age,
    ]);
  });

  test('All favourite things', () => {
    let path = new JSONHeroPath('people.*.favouriteThings.*');
    let results = path.all(testObject2).flat();
    let expected = testObject2.people.Matt.favouriteThings
      .concat(testObject2.people.James.favouriteThings)
      .concat(testObject2.people.Eric.favouriteThings)
      .concat(testObject2.people.Dan.favouriteThings);

    expect(results).toEqual(expected);
  });

  test('Original object', () => {
    let objectQuery = new JSONHeroPath('$');
    let queryResult = objectQuery.all(testObject1);
    expect(queryResult).toEqual(testObject1);
  });

  test('Original array', () => {
    let objectQuery = new JSONHeroPath('$');
    let queryResult = objectQuery.all(testArray1);
    expect(queryResult).toEqual(testArray1);
  });

  test('Original object with blank path', () => {
    let objectQuery = new JSONHeroPath('');
    let queryResult = objectQuery.all(testObject1);
    expect(queryResult).toEqual(testObject1);
  });
});

describe('Root/parent/child tests', () => {
  test('Get root', () => {
    let path = new JSONHeroPath('resultsList.*.name');
    expect(path.root.toString()).toEqual('$');
  });

  test('Get parent', () => {
    let path = new JSONHeroPath('resultsList.*');
    expect(path.parent?.toString()).toEqual('$.resultsList');
  });

  test('Null parent', () => {
    let path = new JSONHeroPath('$');
    expect(path.parent).toEqual(null);
  });

  test('Child path', () => {
    let path = new JSONHeroPath('$.resultsList');
    expect(path.child('1').toString()).toEqual('$.resultsList.1');
  });
});

describe('Component isArray', () => {
  test('Detects numbers and wildcards', () => {
    let path = new JSONHeroPath('$.resultsList.2.favouriteThings.*');
    expect(path.components[0].isArray).toEqual(false);
    expect(path.components[1].isArray).toEqual(false);
    expect(path.components[2].isArray).toEqual(true);
    expect(path.components[3].isArray).toEqual(false);
    expect(path.components[4].isArray).toEqual(true);
  });

  test('Detects numbers and wildcards', () => {
    let path = new JSONHeroPath('$.resultsList.-2.favouriteThings.*');
    expect(path.components[2].isArray).toEqual(false);
  });
});

describe('Results path information', () => {
  test('All with path information', () => {
    let path = new JSONHeroPath('$.resultsList.*.favouriteThings.*');
    let results = path.all(testObject1, { includePath: true });
    expect(results[0].path.toString()).toEqual('$.resultsList.0.favouriteThings.0');
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
