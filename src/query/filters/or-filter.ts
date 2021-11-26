import { QueryFilter } from '../query-component';
import QueryBuilder from '../query-builder';
import QueryResult from '../../path/query-result';

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

  filter(previousResults: QueryResult[]): QueryResult[] {
    let results: QueryResult[] = [];

    for (let i = 0; i < this.subFilters.length; i++) {
      let subFilter = this.subFilters[i];
      let result = subFilter.filter(previousResults);
      results = results.concat(result);
    }

    //deduplicate
    results = results.flat().filter(function (elem, index, self) {
      return index === self.indexOf(elem);
    });

    return results;
  }
}

export default OrFilter;
