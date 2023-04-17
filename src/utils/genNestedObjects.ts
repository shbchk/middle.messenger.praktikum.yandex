const genNestedObjects = (
  keys: string,
  value: unknown = {},
): Record<string, unknown> => {
  return keys
    .split('.')
    .reduceRight((accumulator, currentValue, currentIndex, array) => {
      if (currentIndex === array.length - 1) {
        return { [currentValue]: value };
      }
      return { [currentValue]: accumulator };
    }, {});
};

export default genNestedObjects;
