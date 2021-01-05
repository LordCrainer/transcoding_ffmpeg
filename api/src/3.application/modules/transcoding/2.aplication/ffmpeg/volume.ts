import { execute, handleData } from ".";
import { IRegFFmpeg } from "./../../3.Domain/entities/IRegexFFmpeg";
import { ISpawnCallBack } from "../../3.Domain/entities/IExecute";
import { cmdFFmpeg, regexFFmpeg } from "./../../3.Domain/";
import { IMetada, ISourceData } from "./../../3.Domain/entities/IParams";

const getVolume = (fn?: ISpawnCallBack) => async (source: ISourceData) => {
  try {
    const commands = cmdFFmpeg.volumeDetect(source);
    const spawnFunction = await execute.executeCommands(commands, /\s+/);
    const { status, stderr } = await spawnFunction(fn);
    const max = handleData.getAttribute(stderr, regexFFmpeg.volume.max);
    const mean = handleData.getAttribute(stderr, regexFFmpeg.volume.mean);
    return { max, mean };
  } catch (error) {
    throw new Error(error);
  }
};

const ajustVolume = (fn?: ISpawnCallBack) => async (
  source: ISourceData,
  metadata: IMetada,
  volume: number
) => {
  try {
    const commands = cmdFFmpeg.ajustVolume(source, metadata, volume);
  } catch (error) {}
};

const changeVolumen = (fn?: ISpawnCallBack) => async (commands: string) => {
  try {
    const spawnFunction = await execute.executeCommands(commands, /\s+/);
    const { status, stderr } = await spawnFunction(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const isBetween = (x: number, min: number, max: number) => x >= min && x <= max;

const subtractVolume = (currentVolume: number, threshold: number) =>
  threshold - currentVolume;

const verifingVolume = (
  volume: { currentVolume: number; threshold: number },
  margin: { max: number; min: number }
) => {
  const { currentVolume, threshold } = volume;
  const { max, min } = margin;
  return isBetween(currentVolume, min, max);
};

export default { getVolume, changeVolumen, subtractVolume };
