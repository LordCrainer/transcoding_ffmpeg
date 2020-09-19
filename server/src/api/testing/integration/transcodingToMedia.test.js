const transcodingController = require("../../components/transcoding/Infrastructure/transcoding.controller");

describe("Transcoding to media", () => {
  test("should ", () => {
    const file = {
      path: "http://localhost",
      originalName: "videoParaunMedio",
      originalExtension: ".mov",
    };
    const fields = [
      { id: 8, nombre: "Ecuavisa" },
      { id: 19, nombre: "TC_Television" },
    ];
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
  });
});
