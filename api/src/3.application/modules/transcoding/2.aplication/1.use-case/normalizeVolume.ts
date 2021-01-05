import { cmdFFmpeg, regexFFmpeg } from "../../3.Domain";
import { handleVolume } from "../ffmpeg/";
import { IMetada, ISourceData } from "./../../3.Domain/entities/IParams";

const normalizeVolume = async (source: ISourceData, metadata: IMetada) => {
  const {
    audioFilter: { normalizeVolume },
  } = metadata;
  try {
    const { max, mean } = await handleVolume.getVolume()(source);
    const differenceVolumen = handleVolume.subtractVolume(+max, normalizeVolume.threshold);
    const cmdAjustVolumen = await cmdFFmpeg.ajustVolume(
      source,
      metadata,
      differenceVolumen
    );
    const changedVolume = await handleVolume.changeVolumen()(cmdAjustVolumen);

    return;
  } catch (error) {
    throw new Error(error);
  }

  // const isVerified =
  // const verifiedVolume = await  verificationVolume(destinyPath)
  // return verifiedVolume
};

export { normalizeVolume };
