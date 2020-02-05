const uploadService = require("../3.service/uploader.service");

const uploadFile = async (req, res, next) => {  
    //post() es un método para manejar subidas de los videos
    const form = await uploadService.uploadFilesFormidable(req);    
    await res.status(201).json({
      message: "Manejando peticiones POST para los videos",
      path: form[0].path
    });
  }
const getInfoVideo = (io) => async (req, res) =>{
  res.status(200).json({message: "Servidor Funcionando correctamente"})
}

module.exports = {
    uploadFile,
    getInfoVideo
}