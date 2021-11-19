import { PathComponent } from './path-components';

class JSONHero {
  readonly components: PathComponent[];

  constructor(components: PathComponent[]) {
    this.components = components;
  }

  toEscapedString(): string {
    return this.components.map((component) => component.toEscapedString()).join('.');
  }
}

export default JSONHero;
