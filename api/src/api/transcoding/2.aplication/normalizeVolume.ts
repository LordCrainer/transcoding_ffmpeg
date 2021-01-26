import { cmdFFmpeg, regexFFmpeg } from "../3.Domain";

import { IVolume } from "../../share/3.domain/volume";
import {
  ISourceData,
  IMetada,
} from "../../share/3.domain/params.interface";

const normalizeVolume = (handleVolume: IVolume) => async (
  source: ISourceData,
  metadata: IMetada
) => {
  /*  const {
    audioFilter: { normalizeVolume },
  } = metadata; */
  try {
    console.log("normalize: ", source);

    /*     const { max, mean } = await handleVolume.getVolume(source);
    const diffVolume = handleVolume.subtractVolume(
      +max,
      normalizeVolume.threshold
    );
    const ajustedVolume = await handleVolume.ajustVolume(
      source,
      metadata,
      diffVolume
    ); */

    return { source };
  } catch (error) {
    throw new Error(error);
  }

  // const isVerified =
  // const verifiedVolume = await  verificationVolume(destinyPath)
  // return verifiedVolume
};

export default normalizeVolume;
