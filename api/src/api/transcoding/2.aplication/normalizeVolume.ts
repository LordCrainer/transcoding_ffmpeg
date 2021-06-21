import { IAudioVolume } from "../3.domain";
import { IParams, IMetadata } from "../../share/3.domain";
import volume from "./volume";
import { fpFunctions } from "../..//share/2.application";

const normalizeVolume = async (params: IParams) => {
  try {
    const {
      filter: { fAudio },
    } = params;
    let tempParams = { ...params };
    const preVolume = await volume.getVolume(tempParams);
    const differenceVolume = fpFunctions.substract(
      fAudio.normalizeVolume.threshold,
      +preVolume.max
    );
    console.log(differenceVolume);

    const ajustedVolume = await volume.ajustVolume(
      tempParams,
      differenceVolume
    );
    tempParams.origin = tempParams.destiny;
    const newVolume = await volume.getVolume(tempParams);
    const correctVolume = await volume.verifyVolume(
      +newVolume.max,
      fAudio.normalizeVolume
    );
    return {
      destiny: tempParams.destiny,
      startVolume: preVolume.max,
      endVolume: newVolume.max,
    };
  } catch (error) {
    throw new Error("NORMALIZE VOLUME \n" + error);
  }
};

export default normalizeVolume;
