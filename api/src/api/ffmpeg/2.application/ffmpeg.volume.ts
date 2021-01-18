import { ISpawnCallBack } from "../../share/3.domain/execute.interface";
import { cmdFFmpeg, regexFFmpeg } from "../../3.Domain";
import { IMetada, ISourceData } from "../../3.Domain/entities/IParams";
import handleData from "./ffmpeg.handle-data";
import execute from "./execute";

const valueRange = (x: number, min: number, max: number) =>
  x >= min && x <= max;
const valueUnder = (currentValue: number, minValue: number) =>
  currentValue < minValue;

const subtractVolume = (currentVolume: number, threshold: number) =>
  threshold - currentVolume;

const getVolume = async (source: ISourceData, fn?: ISpawnCallBack) => {
  try {
    const commands = cmdFFmpeg.volumeDetect(source);
    const { status, stderr } = await execute.executeCommands(
      commands,
      /\s+/
    )(fn);
    const max = handleData.getAttribute(stderr, regexFFmpeg.volume.max);
    const mean = handleData.getAttribute(stderr, regexFFmpeg.volume.mean);
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
    const commands = await cmdFFmpeg.ajustVolume(source, metadata, volume);
    const { status, stderr } = await execute.executeCommands(
      commands,
      /\s+/
    )(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const changeVolumen = (fn?: ISpawnCallBack) => async (commands: string) => {
  try {
    const { status, stderr } = await execute.executeCommands(
      commands,
      /\s+/
    )(fn);
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
