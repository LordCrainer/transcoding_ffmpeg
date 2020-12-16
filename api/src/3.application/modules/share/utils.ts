const matching = (string: string, regex: RegExp): Array<string> =>
  string.match(regex) || [];

// ENTRIES, ARRAY, OBJECT
const entriesToObj = (arrayEntries: Array<Array<string>>): Object =>
  Object.fromEntries(arrayEntries);

const stringToEntries = (regex: RegExp | string | "=") => (
  string: string | "a=10"
) => {
  const [key, value] = string.split(regex);
  return [key, value.trim()];
};

const unlessOneElement = (array: Array<any>, arg: string) =>
  [...array].some((item) => item === arg);

const mapGeneric = (array: Array<any>, cb: CallableFunction) =>
  [...array].map((item) => cb(item));

const splitString = (string: string, splitter: RegExp | string | "/s+/") =>
  string.split(splitter);
// MATH
const minus = (a: number, b: number) => a - b;

export default {
  matching,
  entriesToObj,
  stringToEntries,
  unlessOneElement,
  mapGeneric,
  splitString,
  minus,
};
