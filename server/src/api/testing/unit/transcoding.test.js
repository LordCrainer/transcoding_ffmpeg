const {
  getVolumen,
} = require("../../components/transcoding/transcoding.service");

const data = {
  path:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/transcoder/Original.mov",
  destiny:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/transcoder/Original_get.mov",
};

describe("Transcoding files", () => {
  test("Get Volume from file", async () => {
    expect(await getVolumen(data.path, data.destiny)).toBe({
      max: -6,
      mean: -15.3,
    });
  });
});
