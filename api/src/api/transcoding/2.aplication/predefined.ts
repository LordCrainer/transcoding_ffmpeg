import { ffmbc, ffmpeg } from "../../programs";
import { execute } from "../../shared/2.application";
import { IParams } from "./../../params/params.interface";
import { ISpawnCallBack } from "api/shared/3.domain";

const preAjust = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmpeg.commands.sdPreAjust(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const dvcpro25 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbc.commands.dv25(params);
    const { status, stderr } = await execute.commands(commands, /\s+/)(fn);
    return { status, stderr };
  } catch (error) {
    throw new Error(error);
  }
};

const h264 = async (params: IParams, fn?: ISpawnCallBack) => {
  try {
    const commands = ffmbc.commands.dv25(params);
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
