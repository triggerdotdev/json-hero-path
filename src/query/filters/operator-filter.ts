import { QueryFilter } from '../query-component';
import { QueryOperator, QueryOperatorFactory } from '../query-operators';
import QueryResult from '../../path/query-result';

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

  filter(previousResults: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];

    for (let i = 0; i < previousResults.length; i++) {
      let previousResult = previousResults[i];
      let object = previousResult.object;

      //if there's a key then filter the child object, otherwise just filter the object itself
      let objectToFilter = object;
      if (this.key != null) {
        objectToFilter = object[this.key];
      }

      if (objectToFilter == null) {
        continue;
      }

      if (this.operator.passes(objectToFilter, this.value)) {
        newResults.push(new QueryResult(previousResult.depth, object));
      }
    }

    return newResults;
  }
}

export default OperatorFilter;
