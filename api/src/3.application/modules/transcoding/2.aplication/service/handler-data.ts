/* const getMaxAndMean = (data, { max, mean }) => {
  let [, maxVolume] = data.match(max);
  let [, meanVolume] = data.match(mean);
  return { max: maxVolume, mean: meanVolume };
}; */

import { utils } from "3.application/modules/share";

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
  const arrayMatch = utils.matching(string, regexMatch);
  const arrayEntries = utils.mapGeneric(
    arrayMatch,
    utils.stringToEntries(regexString)
  );
  return utils.entriesToObj(arrayEntries);
};

export default {
  // getMaxAndMean,
  getError,
  getOutputFromExec,
  getAttribute,
};
