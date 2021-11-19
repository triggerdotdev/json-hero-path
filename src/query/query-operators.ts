interface QueryOperator {
  passes(value: any, test: any): boolean;
}

class QueryOperatorFactory {
  static FromName(name: string): QueryOperator | null {
    switch (name) {
      case '==':
        return new EqualOperator();
      case '!=':
        return new NotEqualOperator();
      case '>':
        return new GreaterThanOperator();
      case '>=':
        return new GreaterThanOrEqualOperator();
      case '<':
        return new LessThanOperator();
      case '<=':
        return new LessThanOrEqualOperator();
      default:
        return null;
    }
  }
}

class EqualOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value == test;
  }
}

class NotEqualOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value != test;
  }
}

class GreaterThanOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value > test;
  }
}

class GreaterThanOrEqualOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value >= test;
  }
}

class LessThanOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value < test;
  }
}

class LessThanOrEqualOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    return value <= test;
  }
}

export {
  QueryOperator,
  QueryOperatorFactory,
  EqualOperator,
  NotEqualOperator,
  GreaterThanOperator,
  GreaterThanOrEqualOperator,
  LessThanOperator,
  LessThanOrEqualOperator,
};
