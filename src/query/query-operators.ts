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

class StartsWithOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    if (typeof value != 'string' || typeof test != 'string') {
      return false;
    }

    return value.startsWith(test);
  }
}

class EndsWithOperator implements QueryOperator {
  passes(value: any, test: any): boolean {
    if (typeof value != 'string' || typeof test != 'string') {
      return false;
    }

    return value.endsWith(test);
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
  StartsWithOperator,
  EndsWithOperator,
};
