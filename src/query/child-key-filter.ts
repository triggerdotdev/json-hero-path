import { QueryFilter } from './query-component';
import { QueryOperator, QueryOperatorFactory } from './query-operators';

class ChildKeyFilter implements QueryFilter {
  readonly type: string = 'childKey';
  readonly key: string;
  readonly operator: QueryOperator;
  readonly value: any;

  constructor(key: string, operatorType: string, value: any) {
    this.key = key;
    let op = QueryOperatorFactory.FromName(operatorType);

    if (op === null) {
      throw new RangeError(`Invalid operator type specified: ${operatorType}`);
    }

    this.operator = op;
    this.value = value;
  }

  filter(objects: any[]): any[] {
    let results: any[] = [];

    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];
      let relevantChildObject = object[this.key];

      if (relevantChildObject == null) {
        continue;
      }

      if (this.operator.passes(relevantChildObject, this.value)) {
        results.push(object);
      }
    }

    return results;
  }
}

export default ChildKeyFilter;
