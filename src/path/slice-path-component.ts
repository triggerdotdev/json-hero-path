import { PathComponent } from './path-component';
import QueryResult from './query-result';

class SlicePathComponent implements PathComponent {
  readonly startIndex: number;
  readonly endIndex: number | null = null;
  readonly isArray: boolean = true;

  //pattern that matches [startIndex?:endIndex?]
  private static regex = /^\[(?<startIndex>[0-9]*):(?<endIndex>\-?[0-9]*)?\]$/g;

  constructor(startIndex: number, endIndex: number | null) {
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

  query(results: QueryResult[]): QueryResult[] {
    let newResults: QueryResult[] = [];

    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      let object = result.object;

      if (typeof object !== 'object') continue;
      if (!Array.isArray(object)) continue;

      let slicedItems: any[];
      if (this.endIndex == null) {
        slicedItems = object.slice(this.startIndex);
      } else {
        slicedItems = object.slice(this.startIndex, this.endIndex);
      }

      for (let j = 0; j < slicedItems.length; j++) {
        let slicedItem = slicedItems[j];
        newResults.push(new QueryResult(result.depth + 1, result.path.child(`${j + this.startIndex}`), slicedItem));
      }
    }

    return newResults;
  }
}

export { SlicePathComponent };
