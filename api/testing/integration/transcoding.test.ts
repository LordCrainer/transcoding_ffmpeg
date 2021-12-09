import { execute } from "api/shared/2.application";
import { IParams } from "../../api/shared/3.domain";
import { transcoder, executeProgram } from "../../api/transcoding/2.aplication";
jest.setTimeout(30000);

/* describe("TRANSCODING GENERAL", () => {
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
            marginError: 2,
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
            marginError: 1,
            max: -13,
            min: -15,
            unit: "dB",
          },
        },
      },
    },
  ];
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
            marginError: 1,
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
}); */

describe("CUSTOM TRANSCODING BY COMMAND", () => {
  const params = {
    origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
    destiny: "C:/Users/camog/Desktop/CONVERT/original_H264.mov",
    commands:
      "-r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y",
    program: "ffmpeg",
  };
  test("should ajust to SD since HD", async (done) => {
    const data = await executeProgram(params);
    expect(data.status).toBe(0);
    done();
  });
});
