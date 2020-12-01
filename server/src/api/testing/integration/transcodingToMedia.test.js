jest.setTimeout(30000);

const transcodingController = require("../../components/transcoding/Infrastructure/transcoding.controller");

describe("Transcoding to media", () => {
  test("Transcodigicación de un a muchos archivos ", async (done) => {
    const file = {
      origin:
        "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/data/input/NewVideo.mov",
      fieldName: "ragnarok",
      extension: ".mov",
    };
    const listMedia = [
      {
        id: 8,
        type: "canal",
        name: "DVCPRO",
        audio: { volume: -12 },
        video: {
          contanaier: ".mov",
        },
        process: ["preAjust", "dv25Mov"],
        quality: "SD",
      },
    ];
    let body = Object.assign({}, { file });
    body = Object.assign(body, { fields: listMedia });
    const result = await transcodingController.transcodingToMedia({ body });
    expect(result).toStrictEqual(true);
    done();
  });
});
