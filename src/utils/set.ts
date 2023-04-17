import genNestedObjects from './genNestedObjects';
import isObject from './isObject';
import merge from './merge';

function set(
  object: Record<string, any> | unknown,
  path: string,
  value: unknown,
): Record<string, any> | unknown {
  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  if (!isObject(object)) {
    return object;
  }

  const newObject = genNestedObjects(path, value);

  Object.assign(
    object as Record<string, any>,
    merge(object as Record<string, any>, newObject),
  );

  return object;
}

export default set;
