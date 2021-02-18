import { IAudioVolume } from "../3.domain";
import { IParams, IMetadata } from "../../share/3.domain";
import volume from "./volume";

const normalizeVolume = async (params: IParams, options: Object) => {
  const {
    filter: { fAudio },
  } = params;
  try {
    let source = { ...params, ...options };
    const preVolume = await volume.getVolume(source);
    const differenceVolume = volume.subtractVolume(
      +preVolume.max,
      fAudio.normalizeVolume.threshold
    );
    const ajustedVolume = await volume.ajustVolume(source, differenceVolume);
    source = { ...source, ...{ origin: source.destiny } };
    const newVolume = await volume.getVolume(source);
    const correctVolume = await volume.verifyVolume(
      +newVolume.max,
      fAudio.normalizeVolume
    );
    return source;
  } catch (error) {
    throw new Error("NORMALIZE VOLUME \n" + error);
  }
};

export default normalizeVolume;
