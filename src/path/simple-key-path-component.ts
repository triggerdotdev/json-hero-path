import { PathComponent } from './path-component';
import QueryResult from './query-result';

class SimpleKeyPathComponent implements PathComponent {
  readonly keyName: string;
  readonly isArray: boolean = false;

  constructor(keyName: string) {
    this.keyName = keyName;

    let keyAsInteger = parseInt(this.keyName, 10);
    if (isNaN(keyAsInteger)) {
      return;
    }

    let isInteger = Number.isInteger(keyAsInteger);
    if (!isInteger) {
      return;
    }

    if (keyAsInteger < 0) {
      return;
    }

    this.isArray = true;
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

  jsonPointer(): string {
    let escapedString = this.keyName;
    //replace ~ with ~0
    escapedString = escapedString.replace(/(\~)/g, '~0');
    //replace / with ~1
    escapedString = escapedString.replace(/(\/)/g, '~1');
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

  query(results: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      let object = result.object;
      if (typeof object !== 'object') {
        continue;
      }

      let newObject = object[this.keyName];
      if (newObject === null) {
        continue;
      }

      let newResult = new QueryResult(result.depth, result.path.child(this.keyName), newObject);
      newResults.push(newResult);
    }

    return newResults;
  }
}

export { SimpleKeyPathComponent };
