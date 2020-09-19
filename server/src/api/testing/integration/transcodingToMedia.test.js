jest.setTimeout(30000);

const transcodingController = require("../../components/transcoding/Infrastructure/transcoding.controller");

describe("Transcoding to media", () => {
  test("Transcodigicación de un a muchos archivos ", async (done) => {
    const file = {
      origin:
        "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/server/src/api/testing/unit/NewVideo.mov",
      fieldName: "ragnarok",
      extension: ".mxf",
    };
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
    let body = Object.assign({}, { file });
    body = Object.assign(body, { fields: listMedia });
    const result = await transcodingController.transcodingToMedia({ body });
    expect(result).toStrictEqual(true);
    done();
  });
});
