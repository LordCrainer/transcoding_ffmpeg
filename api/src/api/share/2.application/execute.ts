import utils from "../utils";
import asyncSpawn from "@expo/spawn-async";
import { IProgram, ISpawnCallBack } from "./../3.domain";

const asyncSpawnExec = (fn?: ISpawnCallBack) => async (program: IProgram) => {
  let process = asyncSpawn(program.application, program.args);
  let childProcess = process.child;
  let status, stderr, pid;
  try {
    childProcess.stdout?.on("data", (data) => console.log(`stdout: ${data}`));
    childProcess.stderr?.on("data", (data) => (fn ? fn(data.toString()) : {}));
    ({ status, stderr, pid } = await process);
    // const outputOut = handledData.getParamsFromVolume(stderr, regexs.editVolume)
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

const commands = (commands: string, regex = /\s+/) => async (
  fn?: ISpawnCallBack
) => {
  try {
    const arrayArguments = utils.splitString(regex);
    const [application, ...args] = arrayArguments(commands);
    const executeProgram = asyncSpawnExec(fn);
    const output = executeProgram({ application, args });
    return output;
  } catch (error) {
    throw new Error(error);
  }
  // split el comando necesario
  // ejecuto el comando, extrayendo las variables y ejecuto la función de salida
  // retorno los datos
};

export default { commands, asyncSpawn };
