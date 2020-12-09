const not = (boolean) => !boolean;

const matching = (string, regex) => string.match(regex) || [];

const entriesArrayToObject = (arrayEntries) => Object.fromEntries(arrayEntries);

const stringToEntriesArray = (regex = "=") => (string = "a=10") => {
  const [key, value] = string.split(regex);
  return [key, value.trim()];
};

const unlessOneElement = (array = [], arg) =>
  [...array].some((item) => item === arg);

const mapCallFunction = (array, cb = () => {}) =>
  [...array].map((item) => cb(item));

const splitString = (string = "", splitter = /\s+/) => string.split(splitter);

const minus = (a, b) => b - a;

module.exports = {
  matching,
  entriesArrayToObject,
  stringToEntriesArray,
  mapCallFunction,
  unlessOneElement,
  splitString,
  minus,
  not,
};
