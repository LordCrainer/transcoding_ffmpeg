import { IParams } from "../../../share/3.domain/params.interface";
import normalizeVolume from "../normalizeVolume";
import transcoder from "../transcoder";

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/testingFile.mp4",
  destiny: "C:/Users/camog/Desktop/2021.mov",
  metadata: {
    general: { profile: "dvcpro25" },
    video: {
      frameRate: "29.97",
      aspectRatio: "4:3",
      container: "mov",
    },
    audio: {
      frameRate: "48000",
    },
  },
  filter: {
    fAudio: {
      normalizeVolume: {
        threshold: -12,
      },
    },
  },
};
describe("PIPING FFMPEG ON FFMBC", () => {
  test("should join the output to input", async () => {
    const data = await transcoder.oneTranscoding(params);
    expect(data.startVolume).toBe("0.0");
  });
});

describe("FUNCTION ON FFMPEG", () => {
  test("should Normalize the output audio", async (done) => {
    const final = await normalizeVolume(params);
    expect(final.endVolume).toBe("-12");
  });
});
