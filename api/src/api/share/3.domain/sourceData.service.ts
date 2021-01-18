import { ISourceData } from "./";
import path from "path";

const getOriginPath = (source: ISourceData) => {
  const { origin } = source;
  return path.join(origin.path, origin.originalName);
};

const getDestinyPath = (source: ISourceData) => {
  const { destiny } = source;
  const finalName = `${destiny.prefix}${destiny.fieldName}${destiny.suffix}.${destiny.extension}`;
  return path.join(destiny.path, finalName);
};

export default {
  getOriginPath,
  getDestinyPath,
};
