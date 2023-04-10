export type Indexed = Record<string, unknown>;

export default function merge(lhs: Indexed, rhs: Indexed) {
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
