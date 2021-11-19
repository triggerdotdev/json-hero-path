interface PathComponent {
  toString(): string;
  query(objects: any[]): any[];
}

export { PathComponent };
