import { PathComponent } from './path-component';
import { SimpleKeyPathComponent } from './simple-key-path-component';
import { WildcardPathComponent } from './wildcard-path-component';
import StartPathComponent from './start-path-component';
import { SlicePathComponent } from './slice-path-component';

class PathBuilder {
  //Match a dot but not if preceeded by a backslash
  private static readonly pathPattern = /(?:[^\.\\]|\\.)+/g;
  private static readonly pointerPattern = /(?:[^\/\\]|\\\/)+/g;

  parse(path: string): PathComponent[] {
    PathBuilder.pathPattern.lastIndex = 0;
    const subPaths = path.match(PathBuilder.pathPattern);

    const components: PathComponent[] = [new StartPathComponent()];

    if (subPaths == null || subPaths.length == 0 || (subPaths.length == 1 && subPaths[0] == '')) {
      return components;
    }

    //if there's a $ at the start we want to skip adding another StartPathComponent()
    let startIndex = 0;
    if (subPaths[0] == '$') {
      startIndex = 1;
    }

    for (let i = startIndex; i < subPaths.length; i++) {
      const subPath = subPaths[i];
      const pathComponent = this.parseComponent(subPath);
      components.push(pathComponent);
    }

    return components;
  }

  parsePointer(pointer: string): PathComponent[] {
    PathBuilder.pathPattern.lastIndex = 0;

    const subPaths = pointer.match(PathBuilder.pointerPattern);

    const components: PathComponent[] = [new StartPathComponent()];

    if (subPaths == null || subPaths.length == 0 || (subPaths.length == 1 && subPaths[0] == '')) {
      return components;
    }

    for (const subPath of subPaths) {
      components.push(this.parseComponent(subPath));
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

    let sliceComponent = SlicePathComponent.fromString(string);
    if (sliceComponent != null) {
      return sliceComponent;
    }

    return SimpleKeyPathComponent.fromString(string);
  }
}

export default PathBuilder;
