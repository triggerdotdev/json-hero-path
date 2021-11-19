import { QueryComponent, QueryFilter } from './query-component';
import OperatorFilter from './operator-filter';
import PathBuilder from '../path/path-builder';
import SubPathOperatorFilter from './sub-path-operator-filter';
import { JSONHeroPath } from '../index';

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
      let filters: QueryFilter[] = [];
      let filterData: any[] = <any[]>item['filters'];
      if (filterData != null) {
        filters = filterData.map((data) => {
          let filterType = data['type'];
          switch (filterType) {
            case 'operator':
              return new OperatorFilter(
                data['key'] as string | null,
                data['operatorType'] as string,
                data['value'] as any,
              );
            case 'subPath':
              return new SubPathOperatorFilter(
                JSONHeroPath.fromString(data['path'] as string),
                data['operatorType'] as string,
                data['value'] as any,
              );
            default:
              throw new TypeError(`Unknown filter type: ${filterType}`);
          }
        });
      }

      let component = new QueryComponent(path, filters);
      components.push(component);
    }

    return components;
  }
}

export default QueryBuilder;
