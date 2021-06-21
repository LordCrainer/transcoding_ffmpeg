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
        threshold: -14,
        marginError: 1,
        unit: "dB",
      },
    },
  },
};
describe("VOLUME FUNCTIONS", () => {
  let tempParams = { ...params };
  test("should get volume", async (done) => {
    const getVolume = await volume.getVolume(params);
    expect(getVolume.max).toBe("0.0");
    done();
  });
  test("should ajust volume", async (done) => {
    const ajusted = await volume.ajustVolume(params, -12);
    expect(ajusted.status).toBe(0);
    done();
  });
  test("should get new volume", async (done) => {
    tempParams.origin = tempParams.destiny;
    const getVolume = await volume.getVolume(tempParams);
    expect(getVolume.max).toBe("-13.3");
    done();
  });
  test("should ajust volume", async (done) => {
    const { normalizeVolume } = tempParams.filter.fAudio;
    const verified = await volume.verifyVolume(-13.3, normalizeVolume);
    expect(verified).toBeTruthy();
    done();
  });
});
