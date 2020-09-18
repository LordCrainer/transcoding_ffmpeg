const {
  getVolumen,
  asyncFfmpeg,
  asyncSpawnExec,
} = require("../../components/transcoding/aplication/index");

const {
  volumeDetect,
  editVolume,
  dv25,
} = require("../../components/transcoding/aplication/commads");
const {
  splitString,
  getOutputFromExec,
} = require("../../components/transcoding/aplication/handled-data");

const data = {
  properties: {
    origin:
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/transcoder/Original.mov",
    destiny:
      "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/api/testing/unit/NewVideo.mov",
  },
  volume: { factor: -6, unit: "dB" },
};
jest.setTimeout(20000);
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
    const commands = splitString(dv25(data.properties));
    const volume = await asyncSpawnExec(
      { program: "ffmbc", commands },
      (data) => console.log(data)
    );
    expect(volume).toStrictEqual(0);
    done();
  }); */
  /*   test("Error al colocar un programa invalido", (done) => {
    const [program, ...args] = splitString(dv25(data.properties));
    const volume = asyncSpawnExec({ program, args }).catch((e) => {
      getOutputFromExec();
      expect(e.status).toBe(1);
      done();
    });
  }); */
  /*   test("Error al colocar un path invalido", (done) => {
    const data = { origin: "origin.mov", destiny: "destiny.mpv" };
    const [program, ...commands] = splitString(dv25(data));
    const volume = asyncSpawnExec({ program, commands }).catch((e) => {
      expect(e.status).toBe(1);
      done();
    });
  }); */
});
