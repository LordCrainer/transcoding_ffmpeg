import asyncSpawn from "@expo/spawn-async";
// import childProcess from "child_process";
import { IProgram, ISpawnCallBack } from "./../../3.Domain/IExecute";

const asyncSpawnExec = async (
  { program = "ffmpeg", args = [] },
  cb = (output = "") => output
) => {
  let process = asyncSpawn(program, args);
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
