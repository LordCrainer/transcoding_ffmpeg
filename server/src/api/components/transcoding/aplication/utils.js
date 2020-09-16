const matching = (string, regex) => string.match(regex) || [];

const entriesToObj = (arrayEntries) => Object.fromEntries(arrayEntries);

const stringToEntries = (regex = "=") => (string = "a=10") => {
  const [key, value] = string.split(regex);
  return [key, value.trim()];
};

const mapGeneric = (array, cb = () => {}) => [...array].map((item) => cb(item));

module.exports = {
  matching,
  entriesToObj,
  stringToEntries,
  mapGeneric,
};
