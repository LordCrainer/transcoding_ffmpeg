import { cmdFFmpeg, regexFFmpeg } from "../../3.Domain";
import { handleVolume } from "../ffmpeg/";
import { IMetada, ISourceData } from "./../../3.Domain/entities/IParams";

const normalizeVolume = async (source: ISourceData, metadata: IMetada) => {
  const {
    audioFilter: { volume },
  } = metadata;
  try {
    const cmdVolume = cmdFFmpeg.volumeDetect(source);

    const { max, mean } = await handleVolume.getVolume()(
      cmdVolume,
      regexFFmpeg
    );
    const differenceVolumen = handleVolume.subtractVolume(+max, volume.value);
    const cmdAjustVolumen = await cmdFFmpeg.ajustVolume(
      source,
      metadata,
      differenceVolumen
    );
    const changedVolume = await handleVolume.changeVolumen()(
      cmdAjustVolumen,
      regexFFmpeg
    );

    return;
  } catch (error) {
    throw new Error(error);
  }

  // const isVerified =
  // const verifiedVolume = await  verificationVolume(destinyPath)
  // return verifiedVolume
};

export { normalizeVolume };
