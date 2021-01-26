import utils from "../../../share/utils";
import { ISpawnCallBack } from "../../../share/3.domain";
import { executeProcess } from "../service";

const executeCommands = (commands: string, regex = /\s+/) => async (
  fn?: ISpawnCallBack
) => {
  try {
    const arrayArguments = utils.splitString(regex);
    const [application, ...args] = arrayArguments(commands);
    const executeProgram = executeProcess.asyncSpawnExec(fn);
    const output = executeProgram({ application, args });
    return output;
  } catch (error) {
    throw new Error(error);
  }
  // split el comando necesario
  // ejecuto el comando, extrayendo las variables y ejecuto la función de salida
  // retorno los datos
};

export default { executeCommands };
