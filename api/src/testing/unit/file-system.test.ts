/* const { fs, existFile } = require("../../components/service/file-system");
const path =
  "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/api/testing/unit/transcoding.test.js";

describe("Funciones del sistema de archivos", () => {
  test("No existe el archivo ", () => {
    const path = "noExisteEsteArchivo.mov";
    const result = existFile(path, fs.constants.F_OK).catch((error) =>
      expect(error.err instanceof TypeError && error.status === false).toEqual(
        false
      )
    );
  });
  test("Existencia del archivo ", async (done) => {
    expect(await existFile(path, fs.constants.F_OK)).toBe(true);
    done();
  });
});
 */