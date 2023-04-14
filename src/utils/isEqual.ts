function isEqual(a: any, b: any): boolean {
  // Check if a and b are of the same type
  if (typeof a !== typeof b) {
    return false;
  }

  // Check if a and b are both null or undefined
  if (a == null && b == null) {
    return true;
  }

  // Check if a and b are both primitive types
  if (typeof a !== 'object' && typeof b !== 'object') {
    return a === b;
  }

  // Check if a and b are both arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((value, index) => isEqual(value, b[index]));
  }

  // Check if a and b are both sets
  if (a instanceof Set && b instanceof Set) {
    if (a.size !== b.size) {
      return false;
    }
    let isEqualSet = true;
    a.forEach((value) => {
      if (!b.has(value)) {
        isEqualSet = false;
      }
    });
    return isEqualSet;
  }

  // Check if a and b are both maps
  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) {
      return false;
    }
    let isEqualMap = true;
    a.forEach((value, key) => {
      if (!isEqual(value, b.get(key))) {
        isEqualMap = false;
      }
    });
    return isEqualMap;
  }

  // Check if a and b are both objects
  if (typeof a === 'object' && typeof b === 'object') {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    let isEqualObj = true;
    aKeys.forEach((key) => {
      if (!isEqual(a[key], b[key])) {
        isEqualObj = false;
      }
    });
    return isEqualObj;
  }

  // If we got here, a and b are not equal
  return false;
}

export default isEqual;
