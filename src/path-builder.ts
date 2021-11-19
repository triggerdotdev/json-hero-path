import { PathComponent, SimpleKeyPathComponent } from './path-components';

class PathBuilder {
  private static readonly delimiter: RegExp = /(?<!\\)\./g;

  parse(path: string): PathComponent[] {
    let subPaths = path.split(PathBuilder.delimiter);

    let components: PathComponent[] = [];

    for (let i = 0; i < subPaths.length; i++) {
      let subPath = subPaths[i];
      let component = SimpleKeyPathComponent.fromString(subPath);
      components.push(component);
    }

    return components;
  }
}

export default PathBuilder;
