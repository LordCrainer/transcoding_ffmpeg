jest.setTimeout(20000);

const {
  getVolumen,
  asyncFfmpeg,
  asyncSpawnExec,
  editVolume,
  transcodingVideo,
} = require("../../components/transcoding/aplication/index");

const commands = require("../../components/transcoding/aplication/commads");
const handledData = require("../../components/transcoding/aplication/handled-data");
const regexs = require("../../components/transcoding/aplication/regexs");

const file = {
  origin:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/files/upload/NewVideo.mov",
  destiny:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/data/converted/-12_NewVideo.mxf",
};
const fields = {
  name: "Ecuavisa",
  audio: {
    volume: -12,
  },
  video: {},
  format: "dvcpro25",
};

describe("Ejecutar programas con async Spawn", () => {
  /* test("Get Volume from file using child process", async (done) => {
    const volume = await getVolumen(data.properties);
    expect(volume.mean).toBe("-15.3");
    done();
  });
  */
  /* test("Function Async for FFMPEG", async (done) => {
    const volume = await asyncFfmpeg(data.properties, data.volume, (data) =>
      console.log(data)
    );
    expect(volume).toBe(true);
    done();
  }); */
  /* test("Proceso de conversión con éxito", async (done) => {
    const commands = splitString(dv25Mov(data.properties));
    const volume = await asyncSpawnExec(
      { program: "ffmbc", commands },
      (data) => console.log(data)
    );
    expect(volume).toStrictEqual(0);
    done();
  }); */
  /*   test("Error al colocar un programa invalido", (done) => {
    const [program, ...args] = splitString(dv25Mov(data.properties));
    const volume = asyncSpawnExec({ program, args }).catch((e) => {
      getOutputFromExec();
      expect(e.status).toBe(1);
      done();
    });
  }); */
  /*   test("Error al colocar un path invalido", (done) => {
    const data = { origin: "origin.mov", destiny: "destiny.mpv" };
    const [program, ...commands] = splitString(dv25Mov(data));
    const volume = asyncSpawnExec({ program, commands }).catch((e) => {
      expect(e.status).toBe(1);
      done();
    });
  }); */
});

describe("FUNCIONES DEL TRANSCODING", () => {
  /* test("Obteniendo volumen de un archivo", async (done) => {
    const volume = await getVolumen(file);
    // const { max, mean } = getOutputFromExec(regexs.volume)(volume.stderr);
    expect(volume).toStrictEqual({ max: "-6.0", mean: "-15.3" });
    done();
  });
   */
  test("Editando el volumen de un video", async (done) => {
    const newFile = await editVolume(file, { volume: -6 });
    expect(newFile.status).toStrictEqual(0);
    done();
  });
  /* test("Transcodificando el video pasando el comando como parámetro", async (done) => {
    const newFile = await transcodingVideo(file, { commands: commands.dv25Mov });
    expect(newFile.status).toStrictEqual(0);
    done();
  }); */
});
