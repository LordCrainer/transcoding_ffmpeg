const express = require("express");
const router = express.Router(); //Router para registrar diferentes rutas

const Video = require("../models/video");

const upload = require("../Service/uploader");
const conversion = require("../Service/conversion");

//Implementaremos unauta para el esquema de operaciones CRUD

//Read
//GET
router
  .route("/")
  .get(async (req, res) => {
    const urlVideo =
      "./uploaded/Migracion de datos de MySQL a MongoDB Pentaho [720p].mp4";
    const urlDestiny = "./output/output.mp4";
    console.log("OBTENIENDO VOLUMEN...");
    //await conversion.changeVolumen(urlVideo, urlDestiny, -12)
    res.status(200).json({
      message: "Manejando peticiones GET para los videos"
    });
  })
  .post(async (req, res, next) => {
    //post() es un método para manejar subidas de los videos
    const form = await upload.uploadFilesFormidable(req);
    await res.status(201).json({
      message: "Manejando peticiones POST para los videos",
      path: form[0].path
      //createdVideo: newVideo
    });
  });
//GET
router.route("/transcoding").post(async(req, res) => {
  const { configuration, path } = req.body;
  console.log(configuration[1], path);

  const urlDestiny = "./output/videoXDCAM";
  const pathDestiny = await conversion.convertVideo(configuration[1], path, urlDestiny);
  const {extension} = configuration[1];
  const urlDestinyVolumen = `${urlDestiny}_1${extension}`
  await conversion.changeVolumen(pathDestiny, urlDestinyVolumen, -12);
  console.log("CONVERSION TERMINADA");
  res.status(200).json({ message: "CONVERSION FINALIZADA" });
});
router.route("/:videoID").get((req, res, next) => {
  const id = req.params.videoID;
  console.log("Parametro ID es:", id);

  if (id == "sd") {
    //CAMBIAR luego la condición por un substring con los caracteres _sd o .sd o .hd .mov
    res.status(200).json({
      message: "Video sd en el server",
      id: id
    });
  } else {
    res.status(200).json({
      message: "Video hd ??..."
    });
  }
});

module.exports = router; // Al exportar router podremos importar en app.js los métodos GET y POST que vienen con este objeto.
