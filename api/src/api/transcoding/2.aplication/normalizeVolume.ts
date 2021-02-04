import { IAudioVolume } from "../3.domain";
import { IParams, IMetadata } from "../../share/3.domain";
import volume from "./volume";

const normalizeVolume = async (
  params: IParams,
  { destiny }: { destiny: string }
) => {
  const {
    filter: { fAudio },
  } = params;
  try {
    let source = params;
    source.destiny = destiny;
    const preVolume = await volume.getVolume(source);
    const differenceVolume = volume.subtractVolume(
      +preVolume.max,
      fAudio.normalizeVolume.threshold
    );
    console.log(differenceVolume, source.destiny, source.origin);

    const ajustedVolume = await volume.ajustVolume(source, differenceVolume);
    source.origin = destiny;
    const newVolume = await volume.getVolume(source);
    const correctVolume = await volume.verifyVolume(
      +newVolume.max,
      fAudio.normalizeVolume
    );
    return { destiny };
  } catch (error) {
    throw new Error("NORMALIZE VOLUME" + error);
  }
};

export default normalizeVolume;
