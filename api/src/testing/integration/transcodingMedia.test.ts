import { IParams } from "api/share/3.domain";
import { volume, predefined } from "../../api/transcoding/2.aplication";

let params = <IParams>{
  origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
  destiny: "C:/Users/camog/Desktop/CONVERT/output.mov",
  metadata: {
    general: {
      perfil: "dvcpro25",
      fileExtension: "mov",
    },
    video: {
      frameRate: "29970/1000",
    },
    audio: {
      codec: "pcm_s16le",
    },
  },
  filter: {
    fAudio: {
      volume: {
        unit: "dB",
      },
    },
  },
};

describe("TRANSCODING VIDEO", () => {
  test("should ajust the file to SD", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/sd.output.mov";
    const data = await predefined.preAjust(params);
    expect(data.status).toBe(0);
    done();
  });
  test("should ajust the file to SD", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/dv25.output.mov";
    const data = await predefined.dvcpro25(params);
    expect(data.status).toBe(0);
    done();
  });

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
    params.origin = params.destiny;
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "-11.8", mean: "-22.1" });
    done();
  });
});
