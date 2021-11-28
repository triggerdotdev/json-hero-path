import { PathComponent } from './path-component';
import QueryResult from './query-result';

class SlicePathComponent implements PathComponent {
  readonly startIndex: Number | null = null;
  readonly endIndex: Number | null = null;
  readonly isArray: boolean = true;

  //pattern that matches [startIndex?:endIndex?]
  private static regex = /^\[(?<startIndex>[0-9]*):?(?<endIndex>\-?[0-9]*)?\]$/g;

  constructor(startIndex: Number | null, endIndex: Number | null) {
    this.startIndex = startIndex;
    this.endIndex = endIndex;
  }

  static fromString(string: string): SlicePathComponent | null {
    if (!SlicePathComponent.regex.test(string)) {
      return null;
    }

    SlicePathComponent.regex.lastIndex = 0;
    let result = SlicePathComponent.regex.exec(string);

    if (result == null || result.groups == null) {
      return null;
    }

    // try and extract the numbers from the Regex
    let startResult = result.groups.startIndex;
    let endResult = result.groups.endIndex;

    let startIndex = startResult == null || startResult === '' ? 0 : parseInt(startResult, 10);
    let endIndex = endResult == null ? null : parseInt(endResult, 10);

    if (startIndex == null && endIndex == null) {
      return null;
    }

    let isStartInteger = Number.isInteger(startIndex);
    if (!isStartInteger) {
      return null;
    }

    return new SlicePathComponent(startIndex, endIndex);
  }

  toString(): string {
    return `[${this.startIndex}${this.endIndex == null ? '' : ':' + this.endIndex}]`;
  }

  query(objects: QueryResult[]): QueryResult[] {
    return [];
  }
}

export { SlicePathComponent };
