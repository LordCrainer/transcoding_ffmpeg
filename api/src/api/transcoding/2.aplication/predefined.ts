import { ffmpegCMD } from "../3.domain/ffmpeg/";
import { ffmbcCMD } from "../3.domain/ffmbc/";
import { execute } from "../../../api/share/2.application";
import { IParams, ISpawnCallBack } from "api/share/3.domain";

const preAjust = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpegCMD.preAjust(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const dvcpro25 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbcCMD.dv25Mov(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const h264 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbcCMD.dv25Mov(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

export default {
  preAjust,
  dvcpro25,
  h264,
};