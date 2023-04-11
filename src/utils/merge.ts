export type Indexed = Record<string, unknown>;

// export default function merge(lhs: Indexed, rhs: Indexed) {
//   const result: any = {};

//   Object.keys(lhs).forEach((key) => {
//     result[key] = lhs[key];
//   });

//   Object.keys(rhs).forEach((key) => {
//     if (Object.prototype.hasOwnProperty.call(result, key)) {
//       result[key] = merge(result[key], rhs[key] as any);
//     } else {
//       result[key] = rhs[key];
//     }
//   });

//   return result;
// }

export default function merge(lhs: any, rhs: any): any {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        // eslint-disable-next-line no-param-reassign
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[p] = rhs[p];
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}
