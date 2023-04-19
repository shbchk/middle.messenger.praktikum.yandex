export default function classNames(...args: unknown[]): string {
  const flatten: unknown[] = args.flat(Infinity);
  const result: string[] = [];

  flatten.forEach((arg) => {
    if (
      arg &&
      arg !== 0 &&
      (typeof arg === 'number' || typeof arg === 'string')
    ) {
      result.push(`${arg}`);
    } else if (typeof arg === 'object' && arg !== null) {
      Object.keys(arg as object).forEach((key) => {
        if ((arg as any)[key] === true) {
          result.push(key);
        }
      });
    }
  });

  return result.join(' ');
}
