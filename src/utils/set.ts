import genNestedObjects from './genNestedObjects';
import isObject from './isObject';
import merge, { Indexed } from './merge';

function set(
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    return object;
  }

  const newObject = genNestedObjects(path, value);

  Object.assign(object as Indexed, merge(object as Indexed, newObject));

  return object;
}

export default set;
