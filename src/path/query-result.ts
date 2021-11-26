class QueryResult {
  readonly depth: number = 0;
  readonly object: any;

  constructor(depth: number, object: any) {
    this.depth = depth;
    this.object = object;
  }

  flatten(): any {
    if (typeof this.object !== 'object') return this.object;
    if (!Array.isArray(this.object)) return this.object;
    if (this.depth == 0) return this.object;
    return this.object.flat(this.depth);
  }
}

export default QueryResult;
