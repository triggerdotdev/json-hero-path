import QueryResult from './query-result';

interface PathComponent {
  toString(): string;
  query(objects: QueryResult[]): QueryResult[];
}

export { PathComponent };
