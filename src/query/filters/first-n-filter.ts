import { QueryFilter } from '../query-component';
import QueryResult from '../../path/query-result';

class FirstNFilter implements QueryFilter {
  readonly type: string = 'first-n';
  readonly startIndex: number = 0;
  readonly itemCount: number;

  constructor(startIndex: number | null, itemCount: number) {
    if (startIndex != null) {
      this.startIndex = Math.max(0, startIndex);
    }
    this.itemCount = itemCount;
  }

  filter(previousResults: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];

    for (let i = 0; i < previousResults.length; i++) {
      let previousResult = previousResults[i];
      let previousObject = previousResult.object;

      if (typeof previousObject != 'object') continue;
      if (!Array.isArray(previousObject)) continue;

      //length check
      if (this.startIndex >= previousObject.length) continue;

      let lastIndex = Math.min(this.startIndex + this.itemCount - 1, previousObject.length - 1);

      let subResults: any[] = [];
      for (let j = this.startIndex; j <= lastIndex; j++) {
        subResults.push(previousObject[j]);
      }

      newResults.push(new QueryResult(previousResult.depth, subResults));
    }

    return newResults;
  }
}

export default FirstNFilter;
