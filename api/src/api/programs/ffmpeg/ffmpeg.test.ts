import { ffmpegCMD } from ".";
import { IParams } from "../../../share/3.domain/params.interface";

describe("FFMPEG COMMANDS STRING", () => {
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
        volume: { value: -12 },
        normalizeVolume: {
          threshold: -12,
          unit: "dB"
        },
      },
    },
  };
  test("should Return the ajust Volume commads", () => {
    const commands = ffmpegCMD.ajustVolume(params, -12);
    const result =
      "ffmpeg -i C:/Users/camog/Desktop/testingFile.mp4 -vcodec copy -af volume=-12dB -acodec pcm_s16le -y C:/Users/camog/Desktop/2021.mov";
    expect(commands).toBe(result);
  })
});
