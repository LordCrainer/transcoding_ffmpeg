import { utils } from "3.application/modules/share";
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

const executeCommands = async (commands: string) => {
  try {
    const [application, ...args] = utils.splitString(/\s+/)(commands);
    const executeProgram = executeProcess.asyncSpawnExec();
    const output = executeProgram({ application, args });
  } catch (error) {}
  // split el comando necesario
  // ejecuto el comando, extrayendo las variables y ejecuto la función de salida
  // retorno los datos
};

export { executeCommands };
