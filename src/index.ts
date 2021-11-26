import { PathComponent } from './path/path-component';
import PathBuilder from './path/path-builder';
import { QueryComponent } from './query/query-component';
import QueryBuilder from './query/query-builder';
import QueryResult from './path/query-result';

class JSONHeroPath {
  readonly components: PathComponent[];

  constructor(components: PathComponent[]) {
    this.components = components;
  }

  static fromString(string: string): JSONHeroPath {
    let pathBuilder = new PathBuilder();
    let components = pathBuilder.parse(string);
    return new JSONHeroPath(components);
  }

  toString(): string {
    return this.components.map((component) => component.toString()).join('.');
  }

  first(object: any): any {
    let results = this.all(object);
    if (results === null || results.length === 0) {
      return null;
    }

    return results[0];
  }

  all(object: any): any[] {
    let results: QueryResult[] = [];
    let firstResult = new QueryResult(0, object);
    results.push(firstResult);

    //use the path to traverse the object
    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      results = component.query(results);

      if (results === null || results.length === 0) {
        return [];
      }
    }

    //flatten the result
    return results.map((result) => result.flatten());
  }
}

class JSONHeroQuery {
  readonly components: QueryComponent[];

  constructor(components: QueryComponent[]) {
    this.components = components;
  }

  static fromObject(object: any): JSONHeroQuery {
    let queryBuilder = new QueryBuilder();
    let components = queryBuilder.parse(object);
    return new JSONHeroQuery(components);
  }

  first(object: any): any {
    let results = this.all(object);
    if (results === null || results.length === 0) {
      return null;
    }

    return results[0];
  }

  all(object: any): any[] {
    let results: QueryResult[] = [];
    let firstResult = new QueryResult(0, object);
    results.push(firstResult);

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      results = component.filter(results);

      if (results == null || results.length === 0) {
        return [];
      }
    }

    return results.map((result) => result.flatten());
  }
}

export { JSONHeroPath, JSONHeroQuery };
