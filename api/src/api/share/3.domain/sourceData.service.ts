import { IParams } from "./";
import path from "path";

const getOriginPath = (source: IParams) => {
  const { origin } = source;
  return path.join(origin.path, origin.originalName);
};

const getDestinyPath = (source: IParams) => {
  const { destiny } = source;
  const finalName = `${destiny.prefix}${destiny.fieldName}${destiny.suffix}.${destiny.extension}`;
  return path.join(destiny.path, finalName);
};

export default {
  getOriginPath,
  getDestinyPath,
};
