import { PathComponent } from './path-components';
import PathBuilder from './path-builder';

class JSONHero {
  readonly components: PathComponent[];

  constructor(components: PathComponent[]) {
    this.components = components;
  }

  static fromString(string: string): JSONHero {
    let pathBuilder = new PathBuilder();
    let components = pathBuilder.parse(string);
    return new JSONHero(components);
  }

  toString(): string {
    return this.components.map((component) => component.toString()).join('.');
  }

  query(object: any): any {
    let queryObject = object;

    for (let i = 0; i < this.components.length; i++) {
      let component = this.components[i];
      queryObject = component.query(queryObject);

      if (queryObject === null) {
        return null;
      }
    }

    return queryObject;
  }
}

export default JSONHero;
