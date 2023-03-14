const namespace = (value) => {
  const arr = value.split('.');

  if (arr.length === 1) {
    return { [arr[0]]: {} };
  }

  console.log(arr);

  const result = arr.reduceRight(
    (accumulator, currentValue) => ({
      [currentValue]: accumulator,
    }),
    {}
  );

  return result;
};

namespace('a.b.s.g'); // {a:{b:{c:{d:{e:{}}}}}}

// export default namespace;
