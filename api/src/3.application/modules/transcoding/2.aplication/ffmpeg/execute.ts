import { utils } from "3.application/modules/share";
import { ISpawnCallBack } from "../../3.Domain/entities/IExecute";
import { executeProcess } from "../service";

/* const getVolumen = async ({ origin }) => {
  let stderr, max, mean;
  try {
    const [program, ...args] = utilsTranscoder.splitString(
      commands.volumeDetect({ origin })
    );
    ({ stderr } = await asyncSpawnExec({
      program,
      args,
    }));
    ({ max, mean } = handledData.getMaxAndMean(stderr, regexs.volume));
  } catch (err) {
    throw err;
  }
  return { max, mean };
}; */

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
