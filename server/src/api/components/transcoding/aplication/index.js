const ffmpeg = require("fluent-ffmpeg");
const asyncSpawn = require("@expo/spawn-async");
const spawn = require("child_process").spawn;

const { splitString } = require("./handled-data");
const { volumeDetect } = require("./commads");
const regexs = require("./regexs");
const {
  fileSystem,
  eventFunction,
} = require("../../../components/service/index");
const handledData = require("./handled-data");

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
  let status, stderr, pid;
  try {
    const [program, ...args] = splitString(volumeDetect({ origin }));
    ({ status, stderr, pid } = await asyncSpawnExec({
      program,
      args,
    }));
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

const editVolume = async ({ origin, destiny }) => {};

const transcodingVideo = async (
  { origin, destiny },
  { commands },
  callFunction = () => {}
) => {
  let status, stderr, pid;
  try {
    const [program, ...args] = splitString(commands({ origin, destiny }));
    ({ status, stderr, pid } = await asyncSpawnExec(
      {
        program,
        args,
      },
      (output) =>
        callFunction(handledData.getOutputFromExec(regexs.editVolume, /\s+/))
    ));
  } catch (err) {
    throw err;
  }
  return { status, stderr, pid };
};

const asyncFfmpeg = (data, options, cb = () => {}) => {
  const promise = new Promise((resolve, reject) => {
    let output;
    const args = handledData.splitString(commands.dv25(data));
    const ffmpeg = spawn("ffmbc", args);
    ffmpeg.stderr.on("data", (data) => {
      cb(handledData.getParamsFromVolume(data.toString(), regexs.editVolume));
    });
    ffmpeg.on("close", (code) => {
      if (handledData.getError(output)) reject(new Error("CONVERSION FAILED"));
      //const { max, mean } = handledData.getMaxAndMean(output);
      resolve(true);
    });
  });
  return promise;
};

const convertVideo = async (configuration, pathOrigin, pathDestiny) => {
  const { extension } = configuration;
  const promise = new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      `${pathOrigin}`,
      "-pix_fmt",
      "yuv422p",
      "-vcodec",
      "mpeg2video",
      "-vtag",
      "xd5c",
      "-b:v",
      "50000k",
      "-maxrate",
      "50000k",
      "-bufsize",
      "3835k",
      "-minrate",
      "50000k",
      "-flags",
      "ilme",
      "-top",
      "1",
      "-r",
      "29.970",
      "-y",
      "-shortest",
      `${pathDestiny}${extension}`,
    ]);
    ffmpeg.stderr.on("data", (data) => {
      console.log(`${data}`);
    });
    ffmpeg.on("close", (code) => {
      resolve(`${pathDestiny}${extension}`);
    });
  });
  return promise;
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

const changeVolumen = async (urlVideo, urlDestiny, volumenDB) => {
  let volumen = await getVolumen(urlVideo, urlDestiny);
  console.log("VOLUMEN ORIGINAL:", volumen);
  const factorVolumen = await getFactorVolumen(volumen.max, volumenDB);
  console.log("FACTOR VOLUMEN:", factorVolumen);
  await bajarVolumen(urlVideo, urlDestiny, factorVolumen);
  volumen = await getVolumen(urlDestiny, urlDestiny);
  console.log("VOLUMEN FINAL:", volumen);
};
module.exports = {
  getVolumen,
  asyncSpawnExec,
  transcodingVideo,
  editVolume,
  convertVideo,
  asyncFfmpeg,
};
