import { PathComponent } from './path-component';
import QueryResult from './query-result';

class WildcardPathComponent implements PathComponent {
  static fromString(string: string): WildcardPathComponent | null {
    if (string === '*') {
      return new WildcardPathComponent();
    }

    return null;
  }

  toString(): string {
    return '*';
  }

  query(results: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      let object = result.object;
      if (typeof object !== 'object') {
        continue;
      }

      for (const key in object) {
        let newObject = object[key];
        let newResult = new QueryResult(result.depth + 1, newObject);
        newResults.push(newResult);
      }
    }

    return newResults;
  }
}
export { WildcardPathComponent };
