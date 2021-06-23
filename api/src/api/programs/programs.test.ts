import { ffmpeg, ffmbc } from ".";
import { IParams } from "../params/params.interface";

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
          unit: "dB",
        },
      },
    },
  };
  test("should Return the ajust Volume commads", () => {
    const commands = ffmpeg.commands.ajustVolume(params, -12);
    const result =
      "ffmpeg -i C:/Users/camog/Desktop/testingFile.mp4 -vcodec copy -af volume=-12dB -acodec pcm_s16le -y C:/Users/camog/Desktop/2021.mov";
    expect(commands).toBe(result);
  });
});

describe("FFMBC COMMANDS STRING", () => {
  const params = <IParams>{
    origin: "testing.mp4",
    destiny: "2021.mov",
    metadata: {
      video: {
        frameRate: "29.97",
        aspectRatio: "4:3",
        container: "mov",
      },
      audio: {
        frameRate: "48000",
      },
    },
  };
  test("should Return dv25 commands for mov", () => {
    const commands = ffmbc.commands.dv25(params);
    const result =
      "ffmbc -i testing.mp4  -r 29.97 -aspect 4:3 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y 2021.mov";
    expect(commands).toBe(result);
  });
  test("should Return dv25 commands for mxf", () => {
    params.metadata.video.container = "mxf";

    const commands = ffmbc.commands.dv25(params);
    const result =
      "ffmbc -i testing.mp4  -r 29.97 -aspect 4:3 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y -acodec pcm_s24le -sample_fmt s32 -ac 1 2021.mov -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00";
    expect(commands).toBe(result);
  });
});
