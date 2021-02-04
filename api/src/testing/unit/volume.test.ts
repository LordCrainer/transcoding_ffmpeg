import { IParams } from "../../api/share/3.domain";
import { normalizeVolume, volume } from "../../api/transcoding/2.aplication";

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
  destiny: "C:/Users/camog/Desktop/CONVERT/output.mov",
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

describe("FUNCIONES DEL AUDIO, VOLUMEN", () => {
  test("Should get volume", async (done) => {
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "0.0", mean: "-10.1" });
    done();
  });
  test("Should ajust the volume", async (done) => {
    const data = await volume.ajustVolume(params, -12);
    expect(data.status).toBe(0);
    done();
  });
  test("Should get volume", async (done) => {
    const params = <IParams>{
      origin: "C:/Users/camog/Desktop/CONVERT/output.mov",
    };
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "-11.8", mean: "-22.1" });
    done();
  });
});

describe("NORMALIZE VOLUME", () => {
  test("Should Normalize Volume ", async (done) => {
    const data = await normalizeVolume(params, {
      destiny: "normalize_original.mov",
    });
    expect(data).toStrictEqual({ destiny: "normalize_original.mov" });
    done();
  });
});
