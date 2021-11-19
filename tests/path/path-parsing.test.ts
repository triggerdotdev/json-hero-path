import { JSONHeroPath } from '../../src';
import { SimpleKeyPathComponent } from '../../src/path/path-components';

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
