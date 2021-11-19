import {
  EqualOperator,
  GreaterThanOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
  NotEqualOperator,
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
});
