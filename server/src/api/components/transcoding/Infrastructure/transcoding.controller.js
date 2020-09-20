const transcodingService = require("../aplication/index");

const { not } = require("../../service/fp-function");
const fileSystem = require("../../service/file-system");
const commands = require("../aplication/commads");

const transcodingToMedia = async (req, res) => {
  try {
    let { fields, file } = req.body;
    const destinationTemporal =
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/files/temporal/";
    const destination =
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/files/video/";
    const { max, mean } = await transcodingService.getVolumen(file);
    const media = fields[0];
    const volumenFinal = media.audio.volume;
    const factor = volumenFinal - Number(max);
    console.log(Number(max), mean, factor);
    const tempfieldName = `${volumenFinal}-${file.fieldName}.mxf`;
    const tempDestiny = `${destinationTemporal}${tempfieldName}`;
    // const existFile = (await fileSystem.existFile(tempDestiny)).status;
    const changedVolume = await transcodingService.editVolume(
      { origin: file.origin, destiny: tempDestiny },
      { volume: factor }
    );
    const destiny = `${destination}${file.fieldName}_${media.name}${file.extension}`;
    const conversion = await transcodingService.transcodingVideo(
      {
        origin: tempDestiny,
        destiny,
      },
      { commands: commands[media.format] }
    );
    /*     if (not(existFile))
      await transcodingService.editVolume(
        { origin: file.origin, destiny: tempDestiny },
        { volume: factor }
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
