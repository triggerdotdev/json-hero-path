import { QueryFilter } from './query-component';
import { QueryOperator, QueryOperatorFactory } from './query-operators';

class OperatorFilter implements QueryFilter {
  readonly type: string = 'operator';
  readonly key: string | null;
  readonly operator: QueryOperator;
  readonly value: any;

  constructor(key: string | null, operatorType: string, value: any) {
    this.key = key;
    let op = QueryOperatorFactory.FromName(operatorType);

    if (op == null) {
      throw new RangeError(`Invalid operator type specified: ${operatorType}`);
    }

    this.operator = op;
    this.value = value;
  }

  filter(objects: any[]): any[] {
    let results: any[] = [];

    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];

      //if there's a key filter the child object or just filter the object itself
      let objectToFilter = object;
      if (this.key != null) {
        objectToFilter = object[this.key];
      }

      if (objectToFilter == null) {
        continue;
      }

      if (this.operator.passes(objectToFilter, this.value)) {
        results.push(object);
      }
    }

    return results;
  }
}

export default OperatorFilter;
