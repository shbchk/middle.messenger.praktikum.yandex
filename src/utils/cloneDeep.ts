type Primitive = string | number | boolean | null | undefined;

type AnyObject = {
  [key: string]: any;
};

function cloneDeep<T extends AnyObject | Primitive>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const clone: any = Array.isArray(obj) ? [] : {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clone[key] = cloneDeep(obj[key]);
    }
  }

  return clone as T;
}

export default cloneDeep;

const objects = [{ a: 1 }, { b: 2 }];
const deep = cloneDeep(objects);

console.log(deep[0] === objects[0]); // => false
