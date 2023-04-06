const genNestedObjects = (
  keys: string,
  value: any = {},
): Record<string, any> => {
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
