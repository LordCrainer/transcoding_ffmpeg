const transcodingService = require("../aplication/index");

const { not } = require("../../service/fp-function");
const fileSystem = require("../../service/file-system");
const { log } = require("debug");

const transcodingToMedia = async (req, res) => {
  try {
    let { fields, file } = req.body;
    const destinationFile =
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/api/testing/";
    const { max, mean } = await transcodingService.getVolumen(file);
    const media = fields[0];
    const volumenFinal = media.audio.volume;
    const factor = volumenFinal - Number(max);
    console.log(Number(max), mean, factor);
    const tempfieldName = `${volumenFinal}-${file.fieldName}.${file.extension}`;
    const tempDestiny = `${destinationFile}${tempfieldName}`;
    const existFile = (await fileSystem.existFile(tempDestiny)).status;
    /* await transcodingService.editVolume(
      { origin: file.origin, destiny: tempDestiny },
      { volume: factor }
    ); */
    if (not(existFile))
      await transcodingService.editVolume(
        { origin: file.origin, destiny: tempDestiny },
        { volume: factor }
      );
    /* if (not(existFile(tempDestiny)))
      await transcodingService.editVolume(
        { origin: file.origin, destination: tempDestiny },
        { audio: media.audio }
      ); */
  } catch (err) {
    return err;
    //  res.status(502).json({ message: "ERROR TRANSCODING TO MEDIA" });
  }
  // res.status(200).json({ message: "TRANSCODING SUCCESSFULLY" });
  return true;
};

module.exports = {
  transcodingToMedia,
};
