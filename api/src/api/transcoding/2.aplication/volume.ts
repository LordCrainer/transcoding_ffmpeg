import { IMetadata, IParams, ISpawnCallBack } from "../../share/3.domain";
import { handleData, execute } from "../../share/2.application";
import { ffmpegCMD, ffmpegRegex } from "../../ffmpeg/3.domain";
import { fpFunctions } from "../../share/2.application";

const subtractVolume = (currentVolume: number, threshold: number) =>
  threshold - currentVolume;

const getVolume = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpegCMD.volumeDetect(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    const max = handleData.getAttribute(stderr, ffmpegRegex.volume.max);
    const mean = handleData.getAttribute(stderr, ffmpegRegex.volume.mean);
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
    const commands = await ffmpegCMD.ajustVolume(params, volume);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr, params };
  } catch (error) {
    throw new Error("ERROR AJUST VOLUME: " + error);
  }
};

const changeVolumen = (fn?: ISpawnCallBack) => async (commands: string) => {
  try {
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const verifyVolume = async (
  currentVolume: number,
  normalizeVolume: { marginError: number; threshold: number }
) => {
  const { marginError, threshold } = normalizeVolume;
  try {
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

export default {
  getVolume,
  changeVolumen,
  subtractVolume,
  ajustVolume,
  verifyVolume,
};
