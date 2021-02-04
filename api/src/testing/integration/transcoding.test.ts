import { IParams } from "../../api/share/3.domain";
import { transcoder } from "../../api/transcoding/2.aplication";
jest.setTimeout(30000);
const params = [
  {
    origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
    destiny: "C:/Users/camog/Desktop/CONVERT/original_dvcpro.mov",
    metadata: {
      general: {
        profile: "dvcpro25",
      },
      audio: { codec: "pcm_s16le" },
      video: { codec: "mpeg4", frameRate: "29970/1000", bitRate: "50M" },
    },
    filter: {
      fAudio: {
        normalizeVolume: {
          threshold: -12,
          marginError: -2,
          max: -10,
          min: -14,
          unit: "dB",
        },
      },
    },
  },
  {
    origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
    destiny: "C:/Users/camog/Desktop/CONVERT/original_H264.mov",
    metadata: {
      general: {
        profile: "H264",
      },
      audio: { codec: "pcm_s16le" },
      video: { codec: "libx264", frameRate: "29970/1000", bitRate: "50M" },
    },
    filter: {
      fAudio: {
        normalizeVolume: {
          threshold: -14,
          marginError: -1,
          max: -13,
          min: -15,
          unit: "dB",
        },
      },
    },
  },
];

describe("TRANSCODING GENERAL", () => {
  test("Should transcoding all params", async (done) => {
    const param = <IParams>{
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
            marginError: -1,
            max: -13,
            min: -15,
            unit: "dB",
          },
        },
      },
    };
    const data = await transcoder(param);
    expect(data).toBe(param.destiny);
    done();
  });
});
