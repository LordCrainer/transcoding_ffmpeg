const ffmpeg = require("fluent-ffmpeg");
const asyncSpawn = require("@expo/spawn-async");
const spawn = require("child_process").spawn;

const handledData = require("./handled-data");
const commands = require("./commads");
const regexs = require("./regexs");
const {
  fileSystem,
  eventFunction,
} = require("../../../components/service/index");

const asyncSpawnExec = async (
  { program = "ffmpeg", args = [] },
  cb = (output) => {}
) => {
  let process = asyncSpawn(program, args);
  let childProcess = process.child;
  let status, stderr, pid;
  try {
    childProcess.stdout.on("data", (data) => {
      console.log(`ffmpeg stdout: ${data}`);
    });
    childProcess.stderr.on("data", (data) => {
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
    const [program, ...args] = handledData.splitString(
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

const editVolume = async ({ origin, destiny }, audio, cb = (output) => {}) => {
  let stderr, status;
  try {
    const [program, ...args] = handledData.splitString(
      commands.editVolume({ origin, destiny }, audio, {})
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
  return { status };
};

const transcodingVideo = async (
  { origin, destiny },
  { commands },
  cb = () => {}
) => {
  let status, stderr, pid;
  try {
    const [program, ...args] = handledData.splitString(
      commands({ origin, destiny })
    );
    ({ status, stderr, pid } = await asyncSpawnExec(
      {
        program,
        args,
      },
      (output) =>
        cb(handledData.getOutputFromExec(regexs.editVolume, /\=+/)(output))
    ));
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

function resizeVideo(video, quality) {
  const p = new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      `${parent}/${video}.mp4`,
      "-codec:v",
      "libx264",
      "-profile:v",
      "main",
      "-preset",
      "slow",
      "-b:v",
      "400k",
      "-maxrate",
      "400k",
      "-bufsize",
      "800k",
      "-vf",
      `scale=-2:${quality}`,
      "-threads",
      "0",
      "-b:a",
      "128k",
      `${parent}/transcoded/${video}_${quality}.mp4`,
    ]);
    ffmpeg.stderr.on("data", (data) => {
      console.log(`${data}`);
    });
    ffmpeg.on("close", (code) => {
      resolve();
    });
  });
  return p;
}

module.exports = {
  getVolumen,
  asyncSpawnExec,
  transcodingVideo,
  editVolume,
};
