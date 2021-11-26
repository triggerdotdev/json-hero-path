import { PathComponent } from './path-component';
import QueryResult from './query-result';

class SlicePathComponent implements PathComponent {
  readonly isArray: boolean = true;

  query(objects: QueryResult[]): QueryResult[] {
    return [];
  }
}
