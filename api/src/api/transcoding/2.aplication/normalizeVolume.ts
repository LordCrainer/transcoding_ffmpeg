import { IAudioVolume } from "../3.domain";
import { IParams, IMetadata } from "../../share/3.domain";

const normalizeVolume = (handleVolume: IAudioVolume) => async (
  source: IParams,
  metadata: IMetadata
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
