import { JSONHeroPath } from '../src';
import { SlicePathComponent } from '../src/path/slice-path-component';

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

  test('Slice component with start and end', () => {
    let hero = new JSONHeroPath('$.element1.[0:5]');
    let pathComponent = hero.components[2];
    expect(pathComponent instanceof SlicePathComponent).toEqual(true);

    let sliceComponent = pathComponent as SlicePathComponent;
    expect(sliceComponent.startIndex).toEqual(0);
    expect(sliceComponent.endIndex).toEqual(5);
  });

  test('Slice component with start only', () => {
    let hero = new JSONHeroPath('$.element1.[3]');
    let pathComponent = hero.components[2];
    expect(pathComponent instanceof SlicePathComponent).toEqual(true);

    let sliceComponent = pathComponent as SlicePathComponent;
    expect(sliceComponent.startIndex).toEqual(3);
    expect(sliceComponent.endIndex).toEqual(null);
  });

  test('Slice component with end only', () => {
    let hero = new JSONHeroPath('$.element1.[:7]');
    let pathComponent = hero.components[2];
    expect(pathComponent instanceof SlicePathComponent).toEqual(true);

    let sliceComponent = pathComponent as SlicePathComponent;
    expect(sliceComponent.startIndex).toEqual(0);
    expect(sliceComponent.endIndex).toEqual(7);
  });

  test('Slice component with negative end', () => {
    let hero = new JSONHeroPath('$.element1.[:-2]');
    let pathComponent = hero.components[2];
    expect(pathComponent instanceof SlicePathComponent).toEqual(true);

    let sliceComponent = pathComponent as SlicePathComponent;
    expect(sliceComponent.startIndex).toEqual(0);
    expect(sliceComponent.endIndex).toEqual(-2);
  });

  test('Slice component impossible negative start index', () => {
    let hero = new JSONHeroPath('$.element1.[-2:4]');
    let pathComponent = hero.components[2];
    expect(pathComponent instanceof SlicePathComponent).toEqual(false);
  });
});
