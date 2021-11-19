import {
  EndsWithOperator,
  EqualOperator,
  GreaterThanOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  NotEqualOperator,
  StartsWithOperator,
} from '../../src/query/query-operators';

describe('Operator tests', () => {
  test('Strict equal', () => {
    let operator = new EqualOperator();
    expect(operator.passes(23, 23)).toEqual(true);
    expect(operator.passes('Test', 'Test')).toEqual(true);
    expect(operator.passes(true, true)).toEqual(true);

    expect(operator.passes(23, 21)).toEqual(false);
  });

  test('Loose equal', () => {
    let operator = new EqualOperator();
    expect(operator.passes(23, '23')).toEqual(true);
    expect(operator.passes(1, true)).toEqual(true);
    expect(operator.passes(0, false)).toEqual(true);
  });

  test('Not equal to', () => {
    let operator = new NotEqualOperator();
    expect(operator.passes(23, 21)).toEqual(true);
    expect(operator.passes('Dave', 23)).toEqual(true);
    expect(operator.passes(true, false)).toEqual(true);
  });

  test('Greater than', () => {
    let operator = new GreaterThanOperator();
    expect(operator.passes(23, 10)).toEqual(true);
    expect(operator.passes(10, 10)).toEqual(false);
  });

  test('Greater than or equal to', () => {
    let operator = new GreaterThanOperator();
    expect(operator.passes(23, 10)).toEqual(true);
    expect(operator.passes(10, 10)).toEqual(false);
  });

  test('Less than', () => {
    let operator = new LessThanOperator();
    expect(operator.passes(9, 10)).toEqual(true);
    expect(operator.passes(10, 10)).toEqual(false);
  });

  test('Less than or equal to', () => {
    let operator = new LessThanOrEqualOperator();
    expect(operator.passes(10, 24)).toEqual(true);
    expect(operator.passes(10, 10)).toEqual(true);
  });

  test('Starts with', () => {
    let operator = new StartsWithOperator();
    expect(operator.passes('This should work', 'This')).toEqual(true);
    expect(operator.passes('This should fail', 'Nope')).toEqual(false);
    expect(operator.passes('This should fail', 42)).toEqual(false);
    expect(operator.passes(13, 'Wrong type')).toEqual(false);
    expect(operator.passes(13, false)).toEqual(false);
  });

  test('Ends with', () => {
    let operator = new EndsWithOperator();
    expect(operator.passes('This should work', 'work')).toEqual(true);
    expect(operator.passes('This will fail', 'Nope')).toEqual(false);
    expect(operator.passes('This should fail', 42)).toEqual(false);
    expect(operator.passes(13, 'Wrong type')).toEqual(false);
    expect(operator.passes(13, false)).toEqual(false);
  });
});
