import { QueryFilter } from '../query-component';
import { JSONHeroPath } from '../../index';
import { QueryOperator, QueryOperatorFactory } from '../query-operators';
import QueryResult from '../../path/query-result';

class SubPathOperatorFilter implements QueryFilter {
  readonly type: string = 'subPath';
  readonly path: JSONHeroPath;
  readonly operator: QueryOperator;
  readonly value: any;

  constructor(path: JSONHeroPath, operatorType: string, value: any) {
    this.path = path;
    let op = QueryOperatorFactory.FromName(operatorType);

    if (op == null) {
      throw new RangeError(`Invalid operator type specified: ${operatorType}`);
    }

    this.operator = op;
    this.value = value;
  }

  filter(previousResults: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];

    previousResults.forEach((previousResult) => {
      let objectsToOperateOn = this.path.all(previousResult.object);

      for (let i = 0; i < objectsToOperateOn.length; i++) {
        let subject = objectsToOperateOn[i];
        if (this.operator.passes(subject, this.value)) {
          newResults.push(previousResult);
          break;
        }
      }
    });

    return newResults;
  }
}

export default SubPathOperatorFilter;
