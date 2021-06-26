import { ffmpeg, ffmbc } from ".";
import { IParams } from "../params/params.interface";
import { IVideoMeta } from "./../params/video/videoMeta.interface";
import { IVideoFilter } from "./../params/video/videoFilter.interface";
import { IAudioMeta } from "./../params/audio/audioMeta.interface";
import { IAudioFilter } from "./../params/audio/audioFilter.interface";

describe("FFMPEG COMMANDS STRING", () => {
  const params = <IParams>{
    origin: "C:/Users/camog/Desktop/testingFile.mp4",
    destiny: "C:/Users/camog/Desktop/2021.mov",
    metadata: {
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

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/testingFile.mp4",
  destiny: "C:/Users/camog/Desktop/2021.mov",
  metadata: {
    video: {
      frameRate: "29.97",
      aspectRatio: "4:3",
      container: "mxf",
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
type IFFmbcRepository = {
  dv25: () => string;
  xdcamHD: () => string;
  dvcpro: () => string;
  dnxhd: () => string;
  sdPreAjust: () => string;
};
type IFFmpegRepository = {
  getVolume: () => string;
  editVolume: () => string;
  sdPreAjust: () => string;
  h264: () => "-r 29.97  -c:v libx264 -b:v 20M -maxrate 20M -minrate 20M -bufsize 4M -flags +ildct+ilme -top 1 -crf 2 -preset:v fast -af volume=-14dB -c:a pcm_s24le -ac 2  -y";
};

type Getters<Type> = {
  [key in keyof Type]: Type[key];
};

type Tcommands = Getters<IFFmbcRepository>;

const ffmbcCommands = ({
  origin,
  destiny,
  metadata: { video, audio },
}: IParams) =>
  <Tcommands>{
    xdcamHD: () => {
      let pre = `ffmbc -i ${origin} -r ${video.frameRate} -target xdcamhd422 -y -tff -an ${destiny} -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
      if (video.container === "mov") {
      }
      return pre;
    },
    dvcpro: () => {
      return `-r 29.970 -bff -target dvcprohd -b 50M -minrate 50M -maxrate 50M -bufsize 8M  -timecode 00:00:00:00 -ac 2`;
    },
    dv25: () => {
      let pre = `ffmbc -i ${origin}  -r ${video.frameRate} -aspect ${video.aspectRatio} -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y`;
      if (video.container === "mov") {
        pre += ` ${destiny}`;
      }
      if (video.container === "mxf") {
        pre += ` -acodec pcm_s24le -sample_fmt s32 -ac 1 ${destiny} -ac 1 -ar ${audio.frameRate} -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;
      }
      return pre;
    },
    dnxhd: () =>
      `-s 1920x1080 -r 29.97 -vcodec dnxhd -pixel_format yuv422p -b 145M -maxrate 145M -minrate 145M -bufsize 8M -tff -ar 41000 -acodec copy -y`,
    sdPreAjust: () =>
      `ffmbc -i ${origin} -r ${video.frameRate} -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b ${video.bitRate} -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${destiny}`,
  };

describe("GET COMMANDS", () => {
  test("should get comma", () => {
    const ffmbc = ffmbcCommands(params);
    const dv = "dv25";
    const output = ffmbc[dv]();
    console.log(ffmbc);
    console.log(output);

    expect(output).toBe(
      "ffmbc -i C:/Users/camog/Desktop/testingFile.mp4 -r 29.97 -target xdcamhd422 -y -tff -an C:/Users/camog/Desktop/2021.mov -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0"
    );
  });
});

type ICommands = {
  general: string;
  video: string;
  audio: string;
  filter: string;
};

type Commands<Type> = {
  [key in keyof Type]: () => Type[key];
};

interface INewParams {
  video: {
    metadata: IVideoMeta;
    filter: IVideoFilter;
  };
  audio: {
    metadata: IAudioMeta;
    filter: IAudioFilter;
  };
}

const parameters = ({ video, audio }: INewParams) =>
  <Commands<IVideoMeta>>{
    aspectRatio: () => `-aspect ${video.metadata.aspectRatio}`,
    bitRate: () => `-b ${video.metadata.bitRate}`,
    bitRateMax: () => `-maxrate ${video.metadata.bitRateMax}`,
    bitRateMin: () => `-minrate ${video.metadata.bitRateMin}`,
  };

const profile = [
  {
    title: "ECUAVISA SD",
    id: 1,
    process: [
      {
        itle: "Pre Ajuste",
        slug: "sdPreAjust",
        type: "filter",
        subtype: "general",
        metafield: [
          {
            title: "FFMPEG",
            type: "program",
            slug: "ffmpeg",
          },
        ],
      },
      {
        title: "Normalize",
        slug: "normalize",
        type: "filter",
        subtype: "audio",
        program: "ffmpeg",
      },
    ],
  },
];

type videoCommands = {
  codec: () => string;
};

const process = [
  {
    title: "",
  },
];
