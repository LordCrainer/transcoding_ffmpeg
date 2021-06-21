import { ffmpegCMD } from "../3.domain/ffmpeg/";
import { ffmbcCMD } from "../3.domain/ffmbc/";
import { execute } from "../../../api/share/2.application";
import { IParams, ISpawnCallBack } from "api/share/3.domain";

const preAjust = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpegCMD.sdPreAjust(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const dvcpro25 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbcCMD.dv25(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const h264 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbcCMD.dv25(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const listPredefined = async (predefined: string) => {
  if (predefined === "preAjust") {
    return await preAjust;
  }
  if (predefined === "dvcpro25") {
    return await dvcpro25;
  }
  if (predefined === "h264") {
    return await h264;
  }
  return await preAjust;
};

export default {
  preAjust,
  dvcpro25,
  h264,
  listPredefined,
};
