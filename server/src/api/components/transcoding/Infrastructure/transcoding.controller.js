const transcodingService = require("../aplication/index");

const { not } = require("../../service/fp-function");

const transcodingToMedia = async (req, res) => {
  try {
    let { fields, file } = req.body;
    const file = {
      originalName: "prueba",
      originExtension: ".mov",
      path: "",
      fieldName: "",
      destinyExtension: ".mov",
      destination: ""
    }
    const listMedia = [
      {
        id: 8,
        type: "canal",
        name: "Ecuavisa",
        audio: { volume: -12 },
        video: {
          format: "dv25",
          contanaier: ".mov",
        },
        quality: "SD",
      },
      {
        id: 19,
        type: "canal",
        name: "TC_Television",
        audio: { volume: -12 },
        video: {
          format: "xdcam",
          contanaier: ".mxf",
        },
        quality: "HD",
      },
    ];
    const destination = "./upload";
    
    const ckeckedVolume = await transcodingService.getVolumen(file);
    const process = listMedia.map(async (media) => {
      const fieldName = `${media.audio.volume}_${file.originalName}`;
      const destinyEditVolume = `${destination}${fieldName}`;
      const existFile = true;
      if (not(existFile(destinyEditVolume)))
        const changedVolume = await transcodingService.editVolume(
          media.audio.volume,
          destinyEditVolume
        );
     
      const conversion = await transcodingService.transcodingVideo()  
    });
  } catch (err) {
    res.status(502).json({ message: "ERROR TRANSCODING TO MEDIA" });
  }
  res.status(200).json({ message: "TRANSCODING SUCCESSFULLY" });
};
