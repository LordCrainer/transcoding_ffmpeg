import asyncSpawn from "@expo/spawn-async";
import { IProgram, ISpawnCallBack } from "./../../3.Domain/IExecute";

const asyncSpawnExec = async (program: IProgram, cb: ISpawnCallBack) => {
  let process = asyncSpawn(program.application, program.arguments);
  let childProcess = process.child;
  let status, stderr, pid;
  try {
    childProcess.stdout?.on("data", (data) => {
      console.log(`ffmpeg stdout: ${data}`);
    });
    childProcess.stderr?.on("data", (data) => {
      cb(data.toString());
    });
    ({ status, stderr, pid } = await process);
    // const outputOut = handledData.getParamsFromVolume(stderr, regexs.editVolume)
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

const getVolumen = async ({ origin }) => {
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
};
