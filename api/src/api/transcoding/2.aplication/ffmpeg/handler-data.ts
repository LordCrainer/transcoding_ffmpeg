/* const getMaxAndMean = (data, { max, mean }) => {
  let [, maxVolume] = data.match(max);
  let [, meanVolume] = data.match(mean);
  return { max: maxVolume, mean: meanVolume };
}; */

import { utils } from "api/share";

const getAttribute = (data: string, attribute: RegExp | string) => {
  let [, value] = data.match(attribute) || [];
  return value;
};

const getError = (data = "") => {
  const array = data.match(/Error/) || [];

  return utils.unlessOneElement(array, "Error");
};

const getOutputFromExec = (
  regexMatch: RegExp,
  regexString: RegExp | string
) => (string: string) => {
  // "F=10 A=20"
  const arrayMatch = utils.matching(regexMatch); //["F=10", "A=20"]
  const arrayEntries = utils.mapGeneric(utils.stringToEntries(regexString)); // [[F,10],[A,20]]
  return utils.entriesArrayToObject(arrayEntries(arrayMatch(string))); // {F=10, A=20}
};

export default {
  // getMaxAndMean,
  getError,
  getOutputFromExec,
  getAttribute,
};
