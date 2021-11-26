import { PathComponent } from '../path/path-component';
import QueryResult from '../path/query-result';

class QueryComponent {
  readonly path: PathComponent;
  readonly filters: QueryFilter[] | null;

  constructor(path: PathComponent, filters: QueryFilter[] | null) {
    this.path = path;
    this.filters = filters;
  }

  filter(previousResults: QueryResult[]): QueryResult[] {
    let results: any[] = this.path.query(previousResults);

    if (results === null || results.length === 0) {
      return [];
    }

    if (this.filters != null) {
      this.filters.forEach((filter) => {
        results = filter.filter(results);
      });
    }

    return results;
  }
}

interface QueryFilter {
  readonly type: string;
  filter(previousResults: QueryResult[]): QueryResult[];
}

export { QueryComponent, QueryFilter };
