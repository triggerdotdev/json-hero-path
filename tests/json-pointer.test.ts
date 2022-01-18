import { JSONHeroPath } from '../src';

describe('JSON pointer tests', () => {
  test('Root', () => {
    let rootQuery = new JSONHeroPath('$');
    expect(rootQuery.jsonPointer()).toBe('');
  });

  test('Simple path', () => {
    let rootQuery = new JSONHeroPath('$.0.name');
    expect(rootQuery.jsonPointer()).toBe('/0/name');
  });

  test('Escape /', () => {
    let rootQuery = new JSONHeroPath('$.a/b.name');
    expect(rootQuery.jsonPointer()).toBe('/a~1b/name');
  });

  test('Escape ~', () => {
    let rootQuery = new JSONHeroPath('$.a~b.name');
    expect(rootQuery.jsonPointer()).toBe('/a~0b/name');
  });

  //from this page https://gregsdennis.github.io/Manatee.Json/usage/pointer.html
  test('Other awkward characters', () => {
    let test1 = new JSONHeroPath('$.c%d.name');
    expect(test1.jsonPointer()).toBe('/c%d/name');

    let test2 = new JSONHeroPath('$.e^f.name');
    expect(test2.jsonPointer()).toBe('/e^f/name');

    let test3 = new JSONHeroPath('$.g|h.name');
    expect(test3.jsonPointer()).toBe('/g|h/name');

    let test4 = new JSONHeroPath('$.i\\j.name');
    expect(test4.jsonPointer()).toBe('/i\\j/name');

    let test5 = new JSONHeroPath('$.k"l.name');
    expect(test5.jsonPointer()).toBe('/k"l/name');

    let test6 = new JSONHeroPath(' ');
    expect(test6.jsonPointer()).toBe('/ ');
  });
});
