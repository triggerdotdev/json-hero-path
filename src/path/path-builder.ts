import { PathComponent } from './path-component';
import { SimpleKeyPathComponent } from './simple-key-path-component';
import { WildcardPathComponent } from './wildcard-path-component';
import StartPathComponent from './start-path-component';

class PathBuilder {
  private static readonly delimiter: RegExp = /(?<!\\)\./g;

  parse(path: string): PathComponent[] {
    let subPaths = path.split(PathBuilder.delimiter);

    let components: PathComponent[] = [new StartPathComponent()];

    if (subPaths.length == 0 || (subPaths.length == 1 && subPaths[0] == '')) {
      return components;
    }

    //if there's a $ at the start we want to skip adding another StartPathComponent()
    let startIndex = 0;
    if (subPaths[0] == '$') {
      startIndex = 1;
    }

    for (let i = startIndex; i < subPaths.length; i++) {
      let subPath = subPaths[i];
      let pathComponent = this.parseComponent(subPath);
      components.push(pathComponent);
    }

    return components;
  }

  parseComponent(string: string): PathComponent {
    let wildcardComponent = WildcardPathComponent.fromString(string);
    if (wildcardComponent != null) {
      return wildcardComponent;
    }

    if (string == null) {
      throw new SyntaxError('Cannot create a path from null');
    }

    if (string == '') {
      throw new SyntaxError('Cannot create a path from an empty string');
    }

    return SimpleKeyPathComponent.fromString(string);
  }
}

export default PathBuilder;
