/* const getMaxAndMean = (data, { max, mean }) => {
  let [, maxVolume] = data.match(max);
  let [, meanVolume] = data.match(mean);
  return { max: maxVolume, mean: meanVolume };
}; */

import { fpFunctions, utils } from "3.application/modules/share";
import { IRegFFmpeg } from "./../../3.Domain/IRegexFFmpeg";

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
  const arrayMatch = utils.matching(regexMatch);
  const arrayEntries = utils.mapGeneric(utils.stringToEntries(regexString));
  return utils.entriesArrayToObject(arrayEntries(arrayMatch(string)));
};

export default {
  // getMaxAndMean,
  getError,
  getOutputFromExec,
  getAttribute,
};
