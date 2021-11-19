import { PathComponent } from '../path/path-component';

interface QueryComponent {
  readonly path: PathComponent;
  readonly filters: QueryFilter[];
  query(object: any[]): any[];
}

interface QueryFilter {
  readonly type: string;
  query(object: any[]): any[];
}
