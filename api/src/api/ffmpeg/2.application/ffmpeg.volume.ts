import handleData from "./ffmpeg.handle-data";
import { ffmpegCMD, ffmpegRegex } from "../3.domain";
import execute from "../../share/2.application/execute";
import { ISourceData, ISpawnCallBack, IMetada } from "./../../share/3.domain";

const valueRange = (x: number, min: number, max: number) =>
  x >= min && x <= max;
const valueUnder = (currentValue: number, minValue: number) =>
  currentValue < minValue;

const subtractVolume = (currentVolume: number, threshold: number) =>
  threshold - currentVolume;

const getVolume = async (source: ISourceData, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpegCMD.volumeDetect(source);
    const { status, stderr } = await execute(commands, /\s+/)(fn);
    const max = handleData.getAttribute(stderr, ffmpegRegex.volume.max);
    const mean = handleData.getAttribute(stderr, ffmpegRegex.volume.mean);
    return { max, mean };
  } catch (error) {
    throw new Error(error);
  }
};

const ajustVolume = async (
  source: ISourceData,
  metadata: IMetada,
  volume: number,
  fn?: ISpawnCallBack
) => {
  try {
    const commands = await ffmpegCMD.ajustVolume(source, metadata, volume);
    const { status, stderr } = await execute(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const changeVolumen = (fn?: ISpawnCallBack) => async (commands: string) => {
  try {
    const { status, stderr } = await execute(commands, /\s+/)(fn);
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
  return valueRange(
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
