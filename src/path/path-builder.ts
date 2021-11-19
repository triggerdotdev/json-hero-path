import { PathComponent } from './path-component';
import { SimpleKeyPathComponent } from './simple-key-path-component';
import { WildcardPathComponent } from './wildcard-path-component';

class PathBuilder {
  private static readonly delimiter: RegExp = /(?<!\\)\./g;

  parse(path: string): PathComponent[] {
    let subPaths = path.split(PathBuilder.delimiter);

    let components: PathComponent[] = [];

    for (let i = 0; i < subPaths.length; i++) {
      let subPath = subPaths[i];
      components.push(this.parseComponent(subPath));
    }

    return components;
  }

  parseComponent(string: string): PathComponent {
    let wildcardComponent = WildcardPathComponent.fromString(string);
    if (wildcardComponent != null) {
      return wildcardComponent;
    }

    return SimpleKeyPathComponent.fromString(string);
  }
}

export default PathBuilder;
