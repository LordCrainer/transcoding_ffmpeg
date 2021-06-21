import { ffmbcCMD } from ".";
import { IParams } from "./../../../share/3.domain/params.interface";

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
    const commands = ffmbcCMD.dv25(params);
    const result =
      "ffmbc -i testing.mp4  -r 29.97 -aspect 4:3 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y 2021.mov";
    expect(commands).toBe(result);
  });
  test("should Return dv25 commands for mxf", () => {
    params.metadata.video.container = "mxf";

    const commands = ffmbcCMD.dv25(params);
    const result =
      "ffmbc -i testing.mp4  -r 29.97 -aspect 4:3 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y -acodec pcm_s24le -sample_fmt s32 -ac 1 2021.mov -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00";
    expect(commands).toBe(result);
  });
});
