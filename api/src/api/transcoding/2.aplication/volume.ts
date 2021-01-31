import { IMetadata, IParams, ISpawnCallBack } from "../../share/3.domain";
import { handleData, execute } from "../../share/2.application";
import { ffmpegCMD, ffmpegRegex } from "../../ffmpeg/3.domain";
import { fpFunctions } from "../../share/2.application";

const subtractVolume = (currentVolume: number, threshold: number) =>
  threshold - currentVolume;

const getVolume = async (source: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpegCMD.volumeDetect(source);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    const max = handleData.getAttribute(stderr, ffmpegRegex.volume.max);
    const mean = handleData.getAttribute(stderr, ffmpegRegex.volume.mean);
    return { max, mean };
  } catch (error) {
    throw new Error(error);
  }
};

const ajustVolume = async (
  source: IParams,
  volume: number,
  fn?: ISpawnCallBack
) => {
  try {
    const commands = await ffmpegCMD.ajustVolume(source, volume);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
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

const verifyVolume = (
  maxVolume: number,
  normalizeVolume: { marginError: number; threshold: number }
) => {
  const { marginError, threshold } = normalizeVolume;
  return fpFunctions.onRange(
    maxVolume,
    threshold - marginError,
    threshold + marginError
  );
};

export default {
  getVolume,
  changeVolumen,
  subtractVolume,
  ajustVolume,
  verifyVolume,
};
