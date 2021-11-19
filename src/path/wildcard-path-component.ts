import { PathComponent } from './path-components';

class WildcardPathComponent implements PathComponent {
  static fromString(string: string): WildcardPathComponent | null {
    if (string === '*') {
      return new WildcardPathComponent();
    }

    return null;
  }

  toString(): string {
    return '*';
  }

  query(objects: any[]): any[] {
    return [];
  }
}
export { WildcardPathComponent };
