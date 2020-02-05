const { baseConversion } = require("../3.service/conversion.service");
const { telegramMessage, chatID } = require("../3.service/telegram.service");
const transcoding = io => async (req, res) => {
  const timeInit = new Date();
  const numProcess = 4;
  const pathRelative = { destino: "./output/", temp: "./output/temp/" };
  const Conversion = baseConversion(io, numProcess);
  const { configuration, path } = req.body;
  const nameFile = path.split("/")[2].split(".")[0];
  const urlDestiny = `${pathRelative.temp}${nameFile}`;
  for (index in configuration) {
    let timeInitProcess = new Date();
    var indexProcess = 0;
    io.emit("conversionVideoIndex", { index: index });
    const pathDestiny = await Conversion.convertVideo(
      configuration[index],
      path,
      urlDestiny,
      indexProcess
    );
    indexProcess++;
    const { titulo, extension } = configuration[index];
    const regex = / /gi;
    const nameTypeConversion = titulo.replace(regex, "_");
    const urlDestinyVolumen = `${pathRelative.destino}${nameFile}_${nameTypeConversion}${extension}`;
    await Conversion.changeVolumen(
      pathDestiny,
      urlDestinyVolumen,
      -12,
      indexProcess
    );

    io.emit("durationProcess", {
      timeInit: timeInitProcess,
      timeFinal: new Date()
    });
    console.log(`ARCHIVO: ${nameFile}_${nameTypeConversion}`);
  }
  const timeFinal = new Date();
  const duracion = new Date(timeFinal - timeInit);
  const segundos =
    duracion.getSeconds() < 10
      ? "0" + duracion.getSeconds()
      : duracion.getSeconds();
  const minutos = duracion.getMinutes();
  telegramMessage(
    chatID,
    `CONVERSION TERMINADA
  FECHA:    ${new Date().toDateString()}
  TIEMPO:   ${new Date().toLocaleTimeString()}
  DURATION: ${minutos}:${segundos}`
  );
  console.log("CONVERSION TERMINADA");
  res.status(200).json({ message: "CONVERSION FINALIZADA" });
};

module.exports = {
  transcoding
};
