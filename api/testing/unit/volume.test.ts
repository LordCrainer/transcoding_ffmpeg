import { IParams } from "../../api/shared/3.domain";
import { normalizeVolume, volume } from "../../api/transcoding/2.aplication";

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/testingFile.mp4",
  destiny: "C:/Users/camog/Desktop/output.mov",
  metadata: {
    general: {
      profile: "dvcpro25",
    },
    audio: { codec: "pcm_s16le" },
    video: { codec: "mpeg4", frameRate: "29970/1000", bitRate: "50M" },
  },
  filter: {
    fAudio: {
      volume: {
        unit: "dB",
      },
      normalizeVolume: {
        threshold: -14,
        marginError: 2,
        max: -13,
        min: -15,
        unit: "dB",
      },
    },
  },
};

/* describe("FUNCIONES DEL AUDIO, VOLUMEN", () => {
  test("Should get max volume", async (done) => {
    const data = await volume.getVolume(params);
    expect(data.max).toEqual("0.0");
    done();
  });
  test("Should ajust the volume", async (done) => {
    const data = await volume.ajustVolume(params, -12);
    expect(data.status).toBe(0);
    done();
  });
  test("Should get volume modify", async (done) => {
    const params = <IParams>{
      origin: "C:/Users/camog/Desktop/output.mov",
    };
    const data = await volume.getVolume(params);
    expect(data.max).toEqual("-11.3");
    done();
  });
}); */

describe("VOLUME FUNCTIONS", () => {
  test("Should get max volume", async (done) => {
    const data = await volume.getVolume(params);
    expect(data.max).toEqual("0.0");
    done();
  });
  test("Should Normalize Volume ", async (done) => {
    const data = await normalizeVolume(params);
    expect(data.endVolume).toStrictEqual("-13.3");
    done();
  });
});
