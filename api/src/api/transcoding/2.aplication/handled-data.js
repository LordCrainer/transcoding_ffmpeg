const fileSystem = require("../../share/file-system");
const {
  mapGeneric,
  matching,
  entriesArrayToObject,
  stringToEntries,
  unlessOneElement,
  splitString,
} = require("./utils");

const getMaxAndMean = (data, { max, mean }) => {
  let [, maxVolume] = data.match(max);
  let [, meanVolume] = data.match(mean);
  return { max: maxVolume, mean: meanVolume };
};

const getError = (data = "") => {
  const array = data.match(/Error/) || [];
  return unlessOneElement(array, "Error");
};

const getOutputFromExec = (regexMatch, regexString) => (string) => {
  const arrayMatch = matching(string, regexMatch);
  const arrayEntries = mapGeneric(arrayMatch, stringToEntries(regexString));
  return entriesArrayToObject(arrayEntries);
};

const setTemporalDestinationFile = ({ volume, fieldName, destination }) =>
  `${destination}${volume}-${fieldName}.mxf`;

const setDestinationFile = ({ destination, fieldName, suffix, extension }) =>
  `${destination}${fieldName}_${suffix}${extension}`;

module.exports = {
  getMaxAndMean,
  getError,
  getOutputFromExec,
  setTemporalDestinationFile,
  setDestinationFile,
};
