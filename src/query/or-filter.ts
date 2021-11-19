import { QueryFilter } from './query-component';
import QueryBuilder from './query-builder';

class OrFilter implements QueryFilter {
  readonly type: string = 'or';
  readonly subFilters: QueryFilter[];

  constructor(data: any[]) {
    let queryBuilder = new QueryBuilder();
    let filters = queryBuilder.parseFilters(data);

    if (filters == null) {
      throw new SyntaxError('No supplied sub-filters');
    }

    this.subFilters = filters;
  }

  filter(objects: any[]): any[] {
    let results: any[] = [];

    for (let i = 0; i < this.subFilters.length; i++) {
      let subFilter = this.subFilters[i];
      let result = subFilter.filter(objects);
      results.push(result);
    }

    //deduplicate
    results = results.flat().filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    return results;
  }
}

export default OrFilter;
