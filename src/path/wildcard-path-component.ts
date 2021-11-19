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
    let results: any[] = [];

    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];
      if (typeof object !== 'object') {
        continue;
      }

      for (const key in object) {
        results.push(object[key]);
      }
    }

    return results;
  }
}
export { WildcardPathComponent };
