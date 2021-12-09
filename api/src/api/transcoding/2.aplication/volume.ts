import { IMetadata, IParams } from "../../params";
import { handleData, execute } from "../../shared/2.application";
import { ffmpeg } from "../../programs/";
import { fpFunctions } from "../../shared/2.application";
import { ISpawnCallBack } from "api/shared/3.domain";
import { INormalizeVolume } from "api/params/audio/audioFilter.interface";

const getVolume = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpeg.commands.getVolume(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    const max = handleData.getAttribute(stderr, ffmpeg.regex.volume.max);
    const mean = handleData.getAttribute(stderr, ffmpeg.regex.volume.mean);
    return { max, mean };
  } catch (error) {
    throw new Error("ERROR GET VOLUME: " + error);
  }
};

const ajustVolume = async (
  params: IParams,
  volume: number,
  fn?: ISpawnCallBack
) => {
  try {
    const commands = await ffmpeg.commands.ajustVolume(params, volume);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr, params };
  } catch (error) {
    throw new Error("ERROR AJUST VOLUME: " + error);
  }
};

const editVolume = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = await ffmpeg.commands.editVolume(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr, params };
  } catch (error) {
    throw new Error("ERROR EDIT VOLUME: " + error);
  }
};

const changeVolumen = (fn?: ISpawnCallBack) => async (commands: string) => {
  try {
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(`${error}`);
  }
};

const verifyVolume = async (
  currentVolume: number,
  normalize: INormalizeVolume
) => {
  try {
    const { marginError = 1, threshold } = normalize;
    const isCorrect = fpFunctions.onRange(
      currentVolume,
      threshold - marginError,
      threshold + marginError
    );
    if (isCorrect) return true;
    throw new Error("VOLUMEN FUERA DEL RANGO PERMITIDO");
  } catch (error) {
    throw new Error("VERIFY VOLUME \n" + error);
  }
};

const normalizeVolume = async (params: IParams) => {
  try {
    const {
      filter: {
        fAudio: { normalizeVolume },
      },
    } = params;
    let tempParams = { ...params };
    const preVolume = await getVolume(tempParams);
    const differenceVolume = fpFunctions.substract(
      normalizeVolume!.threshold,
      +preVolume.max
    );
    const ajustedVolume = await ajustVolume(tempParams, differenceVolume);
    tempParams.origin = tempParams.destiny;
    const newVolume = await getVolume(tempParams);
    const correctVolume = await verifyVolume(+newVolume.max, normalizeVolume!);
    return {
      destiny: tempParams.destiny,
      startVolume: preVolume.max,
      endVolume: newVolume.max,
    };
  } catch (error) {
    throw new Error("NORMALIZE VOLUME \n" + error);
  }
};

export default {
  getVolume,
  changeVolumen,
  ajustVolume,
  verifyVolume,
  editVolume,
  normalizeVolume,
};
