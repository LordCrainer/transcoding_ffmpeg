const transcodingService = require("../aplication/index");

const transcodingToMedia = async (req, res) => {
  try {
    let { fields, file } = req.body;
    // const origin = path+originalName
    // const originalName = "videoParaUnMedio.mov"
    //
    // const file = {origin, destiny}
    let ckeckedVolume = await transcodingService.getVolumen(file);
    let changedVolume = await transcodingService.editVolume(file);
  } catch (err) {
    res.status(502).json({ message: "ERROR TRANSCODING TO MEDIA" });
  }
  res.status(200).json({ message: "TRANSCODING SUCCESSFULLY" });
};
