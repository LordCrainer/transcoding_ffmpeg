import { execute, handleData } from ".";
import { IRegFFmpeg } from "./../../3.Domain/entities/IRegexFFmpeg";
import { ISpawnCallBack } from "../../3.Domain/entities/IExecute";

const getVolume = (fn?: ISpawnCallBack) => async (
  commands: string,
  regex: IRegFFmpeg
) => {
  try {
    const spawnFunction = await execute.executeCommands(commands, /\s+/);
    const { status, stderr } = await spawnFunction(fn);
    const max = handleData.getAttribute(stderr, regex.volume.max);
    const mean = handleData.getAttribute(stderr, regex.volume.mean);
    return { max, mean };
  } catch (error) {
    throw new Error(error);
  }
};

const changeVolumen = (fn?: ISpawnCallBack) => async (
  commands: string,
  regex: IRegFFmpeg
) => {
  try {
    const spawnFunction = await execute.executeCommands(commands, /\s+/);
    const { status, stderr } = await spawnFunction(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const subtractVolume = (actualVolume: number, threshold: number) =>
  Math.abs(actualVolume - threshold);

export default { getVolume, changeVolumen, subtractVolume };
