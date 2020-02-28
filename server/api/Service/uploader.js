const path = require("path"),
  //fsExtra = require('fs-extra'),
  fs = require("fs"),
  formidable = require("formidable");
//{uploadConfig} = require('../config');

//FORMIDABLE

exports.uploadFilesFormidable = req => {
  const uploadedFiles = [];
  var initTime = "";
  var porcentajeAnterior = 0;
  var rutaSubida = "./uploaded"; //<<<<<<<<<<<<
  //const form = new formidable.IncomingForm(uploadConfig.formidableConf(rutaSubida));
  
  let promise = new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      encoding: "utf-8",
      uploadDir: rutaSubida,
      keepExtensions: true,
      maxFileSize: 2000 * 1024 * 1024, // 2000MB
      hash: "md5"
    });
    form
      .on("progress", function(bytesReceived, bytesExpected) {
        var porcentaje = parseInt((bytesReceived / bytesExpected) * 100);
        if (porcentaje % 10 == 0 && porcentaje != porcentajeAnterior) {
          //porcentaje%5==0 &&
          console.log(`Progress: ${porcentaje}`);
          porcentajeAnterior = porcentaje;
        }
      })
      .on("fileBegin", function(name, file) {
        initTime = new Date();
        console.log(`fileBegin: name: ${name} file: ${JSON.stringify(file)}`);
        file.path = `${rutaSubida}/${file.name}`;
      })
      .on("file", function(name, file) {
        uploadedFiles.push(file);
      })
      .on("error", function(err) {
        reject(err);
        console.error("Form error", err);
      })
      .on("aborted", function() {
        console.log("aborted");
      })
      .on("end", () => {
        var finalTime, segundos, minutos;
        finalTime = new Date();
        var duracion = new Date(finalTime - initTime);
        segundos =
          duracion.getSeconds() < 10
            ? "0" + duracion.getSeconds()
            : duracion.getSeconds();
        minutos = duracion.getMinutes();
        console.log(`Duration: ${minutos}:${segundos}`);
      });
    form.parse(req, (err, fields, files) => {
      console.log(`\x1b[35mUpload complete: \x1b[0m ${JSON.stringify(uploadedFiles)}`);
      resolve(uploadedFiles);
    });
    
  });
  //console.log(`Upload complete: ${JSON.stringify(uploadedFiles)}`);
  return promise;
};

function renombrarArchivo(data, filename, directPath, processPath) {
  let [nombreSubida, extension] = filename.split("."),
    [nombre, numeroVideo] = nombreSubida.split("_"), // [2019-09-25-011859, 1, ET]
    nombreArchivoSinExtension = `${nombre}_${numeroVideo}`; //[2019-09-25-011859_1]

  if (data.canal === "Otros") {
    let nombreArchivoFinal = `${nombreArchivoSinExtension}.${extension}`;
    fs.rename(
      path.join(directPath, filename),
      path.join(processPath, nombreArchivoFinal),
      err => {
        if (err) throw err;
        console.log("Rename complete!");
      }
    );
    return 1;
  } else {
    //2019-09-25-011859_1_ET.mov => [2019-09-25-011859_1_ET, mov]
    let canal = data.canal.split("&"),
      rutaOriginal = path.join(directPath, filename),
      numeroCanales = canal.length;

    for (var i = 0; i < numeroCanales; i++) {
      let nombreArchivoFinal = `${nombreArchivoSinExtension}_${canal[i]}.${extension}`,
        rutaFinal = path.join(directPath, nombreArchivoFinal);
      if (numeroCanales == 1) {
        fs.rename(rutaOriginal, rutaFinal, err => {
          if (err) throw err;
          console.log("Rename complete!");
        });
      } else {
        fs.copyFile(rutaOriginal, rutaFinal, err => {
          if (err) throw err;
          console.log("Renombrado a: ", nombreArchivoFinal);
        });
      }
      rutaOriginal = rutaFinal;
    }
  }
}
