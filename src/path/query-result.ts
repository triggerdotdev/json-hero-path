import { JSONHeroPath } from '../index';

class QueryResult {
  readonly depth: number = 0;
  readonly path: JSONHeroPath;
  readonly object: any;

  constructor(depth: number, path: JSONHeroPath, object: any) {
    this.depth = depth;
    this.path = path;
    this.object = object;
  }

  flatten(): QueryResult {
    let flattenedObject = this.object;
    if (typeof this.object === 'object' && Array.isArray(this.object) && this.depth > 0) {
      flattenedObject = this.object.flat(this.depth);
    }

    return new QueryResult(0, this.path, flattenedObject);
  }
}

export default QueryResult;
