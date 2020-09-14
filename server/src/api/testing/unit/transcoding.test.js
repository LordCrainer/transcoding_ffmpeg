const { getVolumen } = require("../../components/transcoding/aplication/index");

const data = {
  path:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/transcoder/Original.mov",
  destiny:
    "D:/Documents/Trabajos/LANUBETV/Desarrollo/Transcoding/transcoding_ffmpeg/transcoder/Original_get.txt",
};
jest.setTimeout(20000);
describe("Transcoding files", () => {
  test("Get Volume from file using chiod process", async (done) => {
    const volume = await getVolumen(data.path);
    expect(volume.max).toBe("-6.0");
    done();
  });
});
