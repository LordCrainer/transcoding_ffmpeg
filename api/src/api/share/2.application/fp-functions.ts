const pipe = <T extends any[], R>(
  fn1: (...args: T) => R,
  ...fns: Array<(a: R) => R>
) => {
  const piped = fns.reduce(
    (prevFn, nextFn) => (value: R) => nextFn(prevFn(value)),
    (value) => value
  );
  return (...args: T) => piped(fn1(...args));
};

const not = (boolean: boolean) => !boolean;

const isLessThan = (a: number, b: number) => a < b;
const isMoreThan = (a: number, b: number) => a > b;
const substract = (a: number, b: number) => a - b;
const sum = (a: number, b: number) => a + b;
const onRange = (x: number, min: number, max: number) => x >= min && x <= max;
const findOneElementList = (list: Array<string>, b: string) =>
  list.find((a) => a === b);
const lowerCase = (a: string) => a.toLowerCase();

export default {
  pipe,
  not,
  isLessThan,
  isMoreThan,
  substract,
  sum,
  onRange,
  findOneElementList,
  lowerCase,
};
