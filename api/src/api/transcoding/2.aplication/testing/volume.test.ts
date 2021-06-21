import volume from "../volume";
import { IParams } from "./../../../share/3.domain/params.interface";

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
      codec: "pcm_s16le",
    },
  },
  filter: {
    fAudio: {
      volume: { value: -12, unit: "dB" },
      normalizeVolume: {
        threshold: -12,
        unit: "dB"
      },
    },
  },
};
describe("VOLUME FUNCTIONS", () => {
  test("should get volume", async (done) => {
    const getVolume = await volume.getVolume(params);
    expect(getVolume.max).toBe("0.0");
    done();
  });
  test("should ajust volume", async (done) => {
    const ajusted = await volume.editVolume(params);
    expect(ajusted.status).toBe(0);
    done();
  });
});
