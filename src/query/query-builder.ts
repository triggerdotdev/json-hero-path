import { QueryComponent, QueryFilter } from './query-component';
import OperatorFilter from './operator-filter';
import PathBuilder from '../path/path-builder';
import SubPathOperatorFilter from './sub-path-operator-filter';
import { JSONHeroPath } from '../index';
import OrFilter from './or-filter';

class QueryBuilder {
  parse(object: any): QueryComponent[] {
    let components: QueryComponent[] = [];
    if (!Array.isArray(object)) {
      throw new TypeError('Expects an array of filter components');
    }

    let pathBuilder = new PathBuilder();

    for (let i = 0; i < object.length; i++) {
      let item = object[i];
      let path = pathBuilder.parseComponent(item['path']);

      let filterData: any[] = <any[]>item['filters'];
      let filters = this.parseFilters(filterData);

      let component = new QueryComponent(path, filters);
      components.push(component);
    }

    return components;
  }

  parseFilters(data: any[]): QueryFilter[] | null {
    if (data != null) {
      return data.map((subData) => {
        let filterType = subData['type'];
        switch (filterType) {
          case 'operator':
            return new OperatorFilter(
              subData['key'] as string | null,
              subData['operatorType'] as string,
              subData['value'] as any,
            );
          case 'subPath':
            return new SubPathOperatorFilter(
              JSONHeroPath.fromString(subData['path'] as string),
              subData['operatorType'] as string,
              subData['value'] as any,
            );
          case 'or':
            return new OrFilter(subData['subFilters']);
          default:
            throw new TypeError(`Unknown filter type: ${filterType}`);
        }
      });
    }

    return null;
  }
}

export default QueryBuilder;
