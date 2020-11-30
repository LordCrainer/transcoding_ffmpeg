const transcodingService = require("../aplication/index");

const { not } = require("../../service/fp-function");
const fileSystem = require("../../service/file-system");
const commands = require("../aplication/commads");
const handledData = require("../aplication/handled-data");
const utils = require("../aplication/utils");

const transcodingToMedia = async (req, res) => {
  try {
    let { fields, file } = req.body;
    const destinationTemporal =
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/files/temporal/";
    const destination =
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/files/video/";
    const { max, mean } = await transcodingService.getVolumen(file);
    const media = fields[0];
    const factor = utils.minus(Number(max), media.audio.volume);
    const tempDestiny = handledData.setTemporalDestinationFile({
      volume: media.audio.volume,
      fieldName: file.fieldName,
      destination: destinationTemporal,
    });
    // const existFile = (await fileSystem.existFile(tempDestiny)).status;
    const changedVolume = await transcodingService.editVolume(
      { origin: file.origin, destiny: tempDestiny },
      { volume: factor }
    );
    const destiny = handledData.setDestinationFile({
      destination,
      fieldName: file.fieldName,
      suffix: media.name,
      extension: file.extension,
    });
    const conversion = await transcodingService.transcodingVideo(
      {
        origin: tempDestiny,
        destiny,
      },
      { commands: commands[media.process[1]] }
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
