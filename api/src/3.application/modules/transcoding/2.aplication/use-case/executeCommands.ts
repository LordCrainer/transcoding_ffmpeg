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

const executeCommands = () => {
  // split el comando necesario
  // ejecuto el comando, extrayendo las variables y ejecuto la función de salida
  // retorno los datos
};

export default {
  executeCommands,
};
