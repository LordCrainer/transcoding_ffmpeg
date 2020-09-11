const ffmpeg = require("fluent-ffmpeg");
const spawn = require("child_process").spawn;

const getVolumen = (streamUrlOrigin, streamUrlDestiny) => {
  let promise = new Promise((resolve, reject) => {
    let cmd = new ffmpeg({ source: streamUrlOrigin })
      .withAudioFilter("volumedetect")
      .addOption("-f", "null")
      //.addOption("-t", "10") // duration
      //.noVideo()
      .on("start", function (ffmpegCommand) {
        //console.log("Output the ffmpeg command: ", ffmpegCommand);
      })
      .on("progress", function (progreso) {
        // console.log("Progreso GETVOLUMEN:", `${progreso.percent.toFixed(2)}%`);
      })
      .on("end", function (stdout, stderr) {
        // find the mean_volume in the output
        let mean_volume = stderr.match(/mean_volume:\s(-?[0-9]\d*\.\d+)/);
        let max_volume = stderr.match(/max_volume:\s(-?[0-9]\d*\.\d+)/);
        if (mean_volume && max_volume) {
          /* console.log({
              mean: parseFloat(mean_volume[1]),
              max: parseFloat(max_volume[1])
            }); */
          resolve({
            mean: parseFloat(mean_volume[1]),
            max: parseFloat(max_volume[1]),
          });
        }
        if (stderr.match(/Server returned 404 Not Found/)) {
          return callback(false);
        }
      })
      .saveToFile(streamUrlDestiny);
  });
  return promise;
};
function bajarVolumen(streamUrlOrigin, streamUrlDestiny, factorVolumen) {
  let promise = new Promise((resolve, reject) => {
    new ffmpeg({ source: streamUrlOrigin })
      .videoCodec("copy")
      .withAudioFilter("volume=" + factorVolumen + "dB")
      .addOption("-strict", "-2")
      //.addOption("-t", "10") // duration
      //.noVideo()
      .on("start", function (ffmpegCommand) {
        //console.log("Output the ffmpeg command: ", ffmpegCommand);
      })
      .on("progress", function (progreso) {
        console.log(
          "Progreso BAJARVOLUMEN:",
          `${progreso.percent.toFixed(2)}%`
        );
      })
      .on("end", function (stdout, stderr) {
        //console.log("Bajar Volumen: ", stderr);
        resolve();
        if (stderr == "data") {
          reject(new Error("FALLO"));
        }
        // return the mean volume
      })
      .saveToFile(streamUrlDestiny);
  });
  return promise;
}
function getFactorVolumen(volumenDBInicial, volumenDBFinal) {
  return (volumenDBFinal - volumenDBInicial) / 1;
}

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
  bajarVolumen,
  getFactorVolumen,
  changeVolumen,
  convertVideo,
};
