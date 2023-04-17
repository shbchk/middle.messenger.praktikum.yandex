/*
rangeRight(4); // => [3, 2, 1, 0]
rangeRight(-4); // => [-3, -2, -1, 0]
rangeRight(1, 5); // => [4, 3, 2, 1]
rangeRight(0, 20, 5); // => [15, 10, 5, 0]
rangeRight(0, -4, -1); // => [-3, -2, -1, 0]
rangeRight(1, 4, 0); // => [1, 1, 1]
rangeRight(0); // => []
*/

function normalRange(...args: [number, number?, number?, boolean?]): number[] {
  const start = args.length > 1 ? args[0] : 0;
  const end = args.length > 1 ? args[1] : args[0];
  let step = args.length > 2 ? args[2] : 1;

  const result: number[] = [];

  if (step === 0) {
    return new Array(end! - 1).fill(start);
  }

  if (args.length === 1 && args[0] === 0) {
    return result;
  }

  if (end! < 0 && step === 1) {
    step = -1;
  }

  if (step! < 0) {
    // eslint-disable-next-line for-direction
    for (let index = start; index > end!; index += step!) {
      result.push(index);
    }

    return result;
  }

  if (start > end! && step! > 0) {
    step = -1;
    for (let index = start; index > end!; index += step) {
      result.push(index);
    }

    return result;
  }

  for (let index = start; index < end!; index += step!) {
    result.push(index);
  }

  return result;
}

function range(...args: [number, number?, number?, boolean?]) {
  const isRight = args.length > 3 ? !!args[3] : false;

  return !isRight ? normalRange(...args) : normalRange(...args).reverse();
}

export default function rangeRight(...args: number[]) {
  const start = args.length > 1 ? args[0] : 0;
  const end = args.length > 1 ? args[1] : args[0];
  const step = args.length > 2 ? args[2] : 1;
  return range(start, end, step, true);
}
