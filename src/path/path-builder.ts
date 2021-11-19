import { PathComponent } from './path-components';
import { SimpleKeyPathComponent } from './simple-key-path-component';
import { WildcardPathComponent } from './wildcard-path-component';

class PathBuilder {
  private static readonly delimiter: RegExp = /(?<!\\)\./g;

  parse(path: string): PathComponent[] {
    let subPaths = path.split(PathBuilder.delimiter);

    let components: PathComponent[] = [];

    for (let i = 0; i < subPaths.length; i++) {
      let subPath = subPaths[i];

      //wildcard
      let wildcardComponent = WildcardPathComponent.fromString(subPath);
      if (wildcardComponent != null) {
        components.push(wildcardComponent);
        continue;
      }

      //simple
      components.push(SimpleKeyPathComponent.fromString(subPath));
    }

    return components;
  }
}

export default PathBuilder;
