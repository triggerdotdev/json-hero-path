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
