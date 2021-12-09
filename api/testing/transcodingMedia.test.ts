import { IParams } from "../api/shared/3.domain";
import { volume, predefined } from "../api/transcoding/2.aplication";
jest.setTimeout(30000);

describe("TRANSCODING VIDEO 1", () => {
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
          marginError: 1,
          max: -13,
          min: -15,
          unit: "dB",
        },
      },
    },
  };

  test("should ajust the file to SD", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/sd.output.mov";
    const data = await predefined.preAjust(params);
    expect(data.status).toBe(0);
    done();
  });
  test("should transcoding to DVCPRO 25", async (done) => {
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
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/-12.output.mov";
    const data = await volume.ajustVolume(params, -12);
    expect(data.status).toBe(0);
    done();
  });
  test("Should verify the volume", async (done) => {
    params.origin = "C:/Users/camog/Desktop/CONVERT/temp/-12.output.mov";
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "-11.8", mean: "-22.1" });
    done();
  });
});
/* describe("TRANSCODING VIDEO 2", () => {
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
  test("should ajust the file to SD", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/sd.output2.mov";
    const data = await predefined.preAjust(params);
    expect(data.status).toBe(0);
    done();
  });
  test("should transcoding to DVCPRO 25", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/dv25.output2.mov";
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
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/-12.output2.mov";
    const data = await volume.ajustVolume(params, -12);
    expect(data.status).toBe(0);
    done();
  });
  test("Should verify the volume", async (done) => {
    params.origin = "C:/Users/camog/Desktop/CONVERT/temp/-12.output2.mov";
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "-11.8", mean: "-22.1" });
    done();
  });
}); */

/* describe("TRANSCODING VIDEO 3", () => {
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
  test("should ajust the file to SD", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/sd.output3.mov";
    const data = await predefined.preAjust(params);
    expect(data.status).toBe(0);
    done();
  });
  test("should transcoding to DVCPRO 25", async (done) => {
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/dv25.output3.mov";
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
    params.destiny = "C:/Users/camog/Desktop/CONVERT/temp/-12.output3.mov";
    const data = await volume.ajustVolume(params, -12);
    expect(data.status).toBe(0);
    done();
  });
  test("Should verify the volume", async (done) => {
    params.origin = "C:/Users/camog/Desktop/CONVERT/temp/-12.output3.mov";
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "-11.8", mean: "-22.1" });
    done();
  });
}); */
