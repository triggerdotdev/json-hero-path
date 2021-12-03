import { JSONHeroPath } from '../src';
import * as _ from 'lodash';

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

describe('Set tests', () => {
  test('Set on array item', () => {
    let path = new JSONHeroPath('resultsList.1');
    let objectCopy = _.cloneDeep(testObject1);
    path.set(objectCopy, {
      name: 'James',
      age: 100,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    });

    expect(path.first(objectCopy).age).toEqual(100);
  });

  test('Set root value', () => {
    let path = new JSONHeroPath('resultsList');
    let objectCopy = _.cloneDeep(testObject1);
    path.set(objectCopy, 'foo');

    expect(path.first(objectCopy)).toEqual('foo');
  });

  test('Set with wildcard', () => {
    let path = new JSONHeroPath('resultsList.*');
    let objectCopy = _.cloneDeep(testObject1);
    let newValue = 'foo';
    path.set(objectCopy, newValue);

    expect(path.all(objectCopy)).toEqual([newValue, newValue, newValue, newValue]);
  });
});

describe('Merge tests', () => {
  test('Merging into an object', () => {
    let path = new JSONHeroPath('resultsList.1');
    let objectCopy = _.cloneDeep(testObject1);
    path.merge(objectCopy, {
      name: 'Tinkerbell',
      favouriteColor: 'black',
    });

    expect(path.first(objectCopy)).toStrictEqual({
      name: 'Tinkerbell',
      favouriteColor: 'black',
      age: 93,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    });
  });

  test('Merging object into an array', () => {
    let path = new JSONHeroPath('resultsList');
    let objectCopy = _.cloneDeep(testObject1);
    let lionel = {
      name: 'Lionel',
      age: 1,
      favouriteThings: ['Black', 'Taxidermy', 'Scratching James’s face'],
    };
    path.merge(objectCopy, lionel);

    expect(path.first(objectCopy).length).toBe(5);
    expect(path.child('4').first(objectCopy)).toStrictEqual(lionel);
  });

  test('Merging simple value into an array', () => {
    let path = new JSONHeroPath('resultsList.1.favouriteThings');
    let objectCopy = _.cloneDeep(testObject1);
    let favouriteThing = 'Far Cry 7';
    path.merge(objectCopy, favouriteThing);

    expect(path.first(objectCopy)).toStrictEqual([
      'Far Cry 1',
      'Far Cry 2',
      'Far Cry 3',
      'Far Cry 4',
      'Far Cry 5',
      'Far Cry 6',
      'Far Cry 7',
    ]);
  });

  test('Merging simple value into multiple arrays', () => {
    let path = new JSONHeroPath('resultsList.*.favouriteThings');
    let objectCopy = _.cloneDeep(testObject1);
    let favouriteThing = 'Far Cry 7';
    path.merge(objectCopy, favouriteThing);

    expect(objectCopy.resultsList[0].favouriteThings).toEqual(expect.arrayContaining(['Far Cry 7']));
    expect(objectCopy.resultsList[1].favouriteThings).toEqual(expect.arrayContaining(['Far Cry 7']));
    expect(objectCopy.resultsList[2].favouriteThings).toEqual(expect.arrayContaining(['Far Cry 7']));
    expect(objectCopy.resultsList[3].favouriteThings).toEqual(expect.arrayContaining(['Far Cry 7']));
  });
});
