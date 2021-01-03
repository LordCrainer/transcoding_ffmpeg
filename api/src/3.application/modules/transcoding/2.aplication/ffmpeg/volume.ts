import { execute, handleData } from ".";
import { IRegFFmpeg } from "./../../3.Domain/entities/IRegexFFmpeg";
import { ISpawnCallBack } from "../../3.Domain/entities/IExecute";

const getVolume = (commands: string, regex: IRegFFmpeg) => async (
  fn?: ISpawnCallBack
) => {
  try {
    const spawnFunction = await execute.commands(commands, /\s+/);
    const { status, stderr } = await spawnFunction(fn);
    const max = handleData.getAttribute(stderr, regex.volumen.max);
    const mean = handleData.getAttribute(stderr, regex.volumen.mean);
    return { max, mean };
  } catch (error) {
    throw new Error(error);
  }
};

export default { getVolume };
