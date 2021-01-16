import { cmdFFmpeg, regexFFmpeg } from "../../3.Domain";
import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";
import { IVolume } from '../../3.Domain/entities/volume';

const normalizeVolume = (handleVolume: IVolume) => async (
  source: ISourceData,
  metadata: IMetada
) => {
  const {
    audioFilter: { normalizeVolume },
  } = metadata;
  try {
    const { max, mean } = await handleVolume.getVolume(source);
    const diffVolume = handleVolume.subtractVolume(
      +max,
      normalizeVolume.threshold
    );
    const ajustedVolume = await handleVolume.ajustVolume(
      source,
      metadata,
      diffVolume
    );

    return;
  } catch (error) {
    throw new Error(error);
  }

  // const isVerified =
  // const verifiedVolume = await  verificationVolume(destinyPath)
  // return verifiedVolume
};

export default normalizeVolume;
