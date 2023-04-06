export type Indexed<T = unknown> = {
  // eslint-disable-next-line no-unused-vars
  [key in string]: T;
};

export default function merge<T, P>(lhs: Indexed<T>, rhs: Indexed<P>) {
  const result: any = {};

  Object.keys(lhs).forEach((key) => {
    result[key] = lhs[key];
  });

  Object.keys(rhs).forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      result[key] = merge(result[key], rhs[key] as any);
    } else {
      result[key] = rhs[key];
    }
  });

  return result;
}
