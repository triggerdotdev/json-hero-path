import { PathComponent } from '../path/path-component';
import * as path from 'path';

class QueryComponent {
  readonly path: PathComponent;
  readonly filters: QueryFilter[] | null;

  constructor(path: PathComponent, filters: QueryFilter[]) {
    this.path = path;
    this.filters = filters;
  }

  filter(objects: any[]): any[] {
    let results: any[] = this.path.query(objects);

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
  filter(objects: any[]): any[];
}

export { QueryComponent, QueryFilter };
