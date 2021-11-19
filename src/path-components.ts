interface PathComponent {
  toString(): string;
  query(object: any): any;
}

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

  query(object: any): any {
    if (typeof object !== 'object') {
      return null;
    }

    return object[this.keyName];
  }
}

export { PathComponent, SimpleKeyPathComponent };
