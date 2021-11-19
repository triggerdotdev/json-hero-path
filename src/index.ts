import { PathComponent } from './path/path-component';
import PathBuilder from './path/path-builder';

class JSONHeroPath {
  readonly components: PathComponent[];

  constructor(components: PathComponent[]) {
    this.components = components;
  }

  static fromString(string: string): JSONHeroPath {
    let pathBuilder = new PathBuilder();
    let components = pathBuilder.parse(string);
    return new JSONHeroPath(components);
  }

  toString(): string {
    return this.components.map((component) => component.toString()).join('.');
  }

  first(object: any): any {
    let results = this.all(object);
    if (results === null || results.length === 0) {
      return null;
    }

    return results[0];
  }

  all(object: any): any[] {
    let results: any[] = [];
    results.push(object);

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      results = component.query(results);

      if (results === null || results.length === 0) {
        return [];
      }
    }

    return results;
  }
}

class JSONHeroQuery {}

export { JSONHeroPath };
