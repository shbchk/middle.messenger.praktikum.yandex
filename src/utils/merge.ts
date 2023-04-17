import isObject from './isObject';

export default function merge(target: any, source: any) {
  if (!isObject(target) || !isObject(source)) {
    throw new Error('Argument is not an Object');
  }

  const mergedObject: any = {};

  Object.keys(target).forEach((key) => {
    mergedObject[key] = target[key];
  });

  Object.keys(source).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      try {
        if (isObject(source[key])) {
          mergedObject[key] = merge(mergedObject[key], source[key]);
        } else {
          mergedObject[key] = source[key];
        }
      } catch {
        mergedObject[key] = source[key];
      }
    }
  });

  return mergedObject;
}
