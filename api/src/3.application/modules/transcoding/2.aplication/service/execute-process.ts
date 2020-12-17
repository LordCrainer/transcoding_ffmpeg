import asyncSpawn from "@expo/spawn-async";
import { IProgram, ISpawnCallBack } from "../../3.Domain/entities/IExecute";

const asyncSpawnExec = (cb: ISpawnCallBack) => async (program: IProgram) => {
  let process = asyncSpawn(program.application, program.arguments);
  let childProcess = process.child;
  let status, stderr, pid;
  try {
    childProcess.stdout?.on("data", (data) => {
      console.log(`stdout: ${data}`);
    });
    childProcess.stderr?.on("data", (data) => cb(data.toString()));
    ({ status, stderr, pid } = await process);
    // const outputOut = handledData.getParamsFromVolume(stderr, regexs.editVolume)
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

export default {
  asyncSpawnExec,
};

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

/* const editVolume = async (
  { origin, destiny },
  { volume },
  cb = (output) => {}
) => {
  let stderr, status;
  try {
    const [program, ...args] = utilsTranscoder.splitString(
      commands.editVolume({ origin, destiny }, { volume }, {})
    );
    ({ stderr, status } = await asyncSpawnExec(
      {
        program,
        args,
      },
      (output) => cb(handledData.getOutputFromExec(regexs.editVolume)(output))
    ));
  } catch (err) {
    throw err;
  }
  return { status, stderr };
}; */
