const matching = (string, regex) => string.match(regex) || [];

const entriesToObj = (arrayEntries) => Object.fromEntries(arrayEntries);

const stringToEntries = (regex = "=") => (string = "a=10") => {
  const [key, value] = string.split(regex);
  return [key, value.trim()];
};

const unlessOneElement = (array = [], arg) =>
  [...array].some((item) => item === arg);

const mapGeneric = (array, cb = () => {}) => [...array].map((item) => cb(item));

const splitString = (string = "", splitter = /\s+/) => {
  return string.split(splitter);
};

const minus = (a, b) => b - a;

module.exports = {
  matching,
  entriesToObj,
  stringToEntries,
  mapGeneric,
  unlessOneElement,
  splitString,
  minus,
};
