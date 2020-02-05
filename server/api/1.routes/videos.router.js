const express = require("express");
const router = express.Router(); //Router para registrar diferentes rutas
const videoController = require("../2.controller/video.controller");
const uploadController = require("../2.controller/upload.controller");

//Implementaremos unauta para el esquema de operaciones CRUD
const BaseRouter = io => {
  router
    .route("/")
    .get(uploadController.getInfoVideo(io))
    .post(uploadController.uploadFile);

  router.route("/transcoding").post(videoController.transcoding(io));

  return router;
};

module.exports = BaseRouter; // Al exportar router podremos importar en app.js los métodos GET y POST que vienen con este objeto.
