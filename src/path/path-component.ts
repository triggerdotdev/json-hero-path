import QueryResult from './query-result';

interface PathComponent {
  readonly isArray: boolean;
  toString(): string;
  query(objects: QueryResult[]): QueryResult[];
}

export { PathComponent };
