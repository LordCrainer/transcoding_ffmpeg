const transcodingController = require("../../components/transcoding/Infrastructure/transcoding.controller");

describe("Transcoding to media", () => {
  test("should ", () => {
    const file = {
      path: "http://localhost",
      originalName: "videoParaunMedio.mov",
    };
    const fields = [
      {
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
