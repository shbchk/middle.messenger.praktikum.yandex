function isEqual<T extends Record<string, any>>(
  a: T | string,
  b: T | string,
): boolean {
  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  }

  if (
    typeof a === 'object' &&
    typeof b === 'object' &&
    a !== null &&
    b !== null
  ) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
      return false;
    }

    aKeys.forEach((key) => {
      if (
        !Object.prototype.hasOwnProperty.call(b, key) ||
        !isEqual(a[key], b[key])
      ) {
        return false;
      }
      return true;
    });

    return true;
  }

  return false;
}

export default isEqual;
