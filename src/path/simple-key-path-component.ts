import { PathComponent } from './path-components';

class SimpleKeyPathComponent implements PathComponent {
  readonly keyName: string;

  constructor(keyName: string) {
    this.keyName = keyName;
  }

  static fromString(string: string): SimpleKeyPathComponent {
    let keyName = string;
    SimpleKeyPathComponent.unescapeExpressions.forEach((unescapePair) => {
      keyName = keyName.replace(unescapePair.search, unescapePair.replacement);
    });
    return new SimpleKeyPathComponent(keyName);
  }

  toString(): string {
    let escapedString = this.keyName;
    SimpleKeyPathComponent.escapeExpressions.forEach((escapePair) => {
      escapedString = escapedString.replace(escapePair.search, escapePair.replacement);
    });
    return escapedString;
  }

  private static escapeExpressions: { search: RegExp; replacement: string }[] = [
    { search: new RegExp(/(\\)/g), replacement: '\\' },
    { search: new RegExp(/(\.)/g), replacement: '\\.' },
  ];

  private static unescapeExpressions: { search: RegExp; replacement: string }[] = [
    { search: new RegExp(/(\\\.)/g), replacement: '.' },
    { search: new RegExp(/(\\\\)/g), replacement: '\\' },
  ];

  query(objects: any[]): any[] {
    let results: any[] = [];
    for (let i = 0; i < objects.length; i++) {
      let object = objects[i];
      if (typeof object !== 'object') {
        continue;
      }

      let result = object[this.keyName];
      if (result === null) {
        continue;
      }

      results.push(result);
    }

    return results;
  }
}

export { SimpleKeyPathComponent };
