import { QueryFilter } from '../query-component';
import { JSONHeroPath } from '../../index';
import { QueryOperator, QueryOperatorFactory } from '../query-operators';

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

  filter(objects: any[]): any[] {
    let results: any[] = [];

    objects.forEach((object) => {
      let objectsToOperateOn = this.path.all(object);

      for (let i = 0; i < objectsToOperateOn.length; i++) {
        let subject = objectsToOperateOn[i];
        if (this.operator.passes(subject, this.value)) {
          results.push(object);
          break;
        }
      }
    });

    return results;
  }
}

export default SubPathOperatorFilter;
