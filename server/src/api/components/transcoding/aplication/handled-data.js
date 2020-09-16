const {
  mapGeneric,
  matching,
  entriesToObj,
  stringToEntries,
} = require("./utils");

const unlessOneElement = (array = [], arg) =>
  [...array].some((item) => item === arg);

const getMaxAndMean = (data, { max, mean }) => {
  let [, maxVolume] = data.match(max);
  let [, meanVolume] = data.match(mean);
  return { max: maxVolume, mean: meanVolume };
};

const getError = (data = "") => {
  const array = data.match(/Error/) || [];
  return unlessOneElement(array, "Error");
};

const splitString = (string = "", splitter = /\s+/) => {
  return string.split(splitter);
};

const getParamsFromVolume = (string, regex) => {
  const arrayMatch = matching(string, regex);
  const arrayEntries = mapGeneric(arrayMatch, stringToEntries("="));
  return entriesToObj(arrayEntries);
};

module.exports = {
  getMaxAndMean,
  splitString,
  getError,
  getParamsFromVolume,
  mapGeneric,
  stringToEntries,
};
