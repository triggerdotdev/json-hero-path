import { QueryComponent, QueryFilter } from './query-component';
import { PathComponent } from '../path/path-component';
import ChildKeyFilter from './child-key-filter';
import PathBuilder from '../path/path-builder';

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
              return new ChildKeyFilter(
                data['key'] as string | null,
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
