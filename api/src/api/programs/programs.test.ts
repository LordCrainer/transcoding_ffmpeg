import { IFilter, IParams } from "../params/params.interface";
import { IVideoMeta } from "./../params/video/videoMeta.interface";
import { IVideoFilter } from "./../params/video/videoFilter.interface";
import { IAudioMeta } from "./../params/audio/audioMeta.interface";
import { IAudioFilter } from "./../params/audio/audioFilter.interface";
import transcodingRouter from "./../transcoding/1.adapter/routes/index";
import { ffmbc, ffmpeg } from ".";
import { IMetadata } from "./../params/params.interface";

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/testingFile.mp4",
  destiny: "C:/Users/camog/Desktop/2021.mov",
  metadata: {
    general: {
      container: "mov",
    },
    video: {
      frameRate: "29.97",
      aspectRatio: "4:3",
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

type IFFmpegFilter = {
  getVolume: () => string;
  editVolume: () => string;
  sdPreAjust: () => string;
};

type IFFmbcEncoder = {
  xdcamHD: () => string;
  dv25: () => string;
  dvcpro: () => string;
  dnxhd: () => string;
  sdPreAjust: () => string;
  h264: () => string;
};

type IFFmpegEncoder = {
  h264: () => string;
  xdcamHD: () => string;
};

interface IFfmbc extends IFFmbcEncoder {}

interface IFfmpeg extends IFFmpegEncoder, IFFmpegFilter {}

type Getters<Type> = {
  [key in keyof Type]: Type[key];
};

type TFfmbcCommands = Getters<IFFmbcEncoder>;

class Ffmpeg implements IFfmpeg, CommonCMD {
  public programName: string = "ffmpeg";
  constructor(private _media: Media) {}
  addProgram() {
    return this.programName;
  }
  output() {
    return "";
  }
  h264() {
    return `-r 29.97  -c:v libx264 -b:v 20M -maxrate 20M -minrate 20M -bufsize 4M -flags +ildct+ilme -top 1 -crf 2 -preset:v fast -af volume=-14dB -c:a pcm_s24le -ac 2  -`;
  }
  xdcamHD() {
    return "";
  }
  editVolume() {
    return "";
  }
  getVolume() {
    return `-af 'volumedetect' -vn -sn -dn -f null /dev/null`;
  }
  sdPreAjust() {
    return `-r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y `;
  }
  get media() {
    return this._media;
  }
  input() {
    return `-i '${this.media.origin}'`;
  }
}

interface CommonCMD {
  addProgram: () => string;

  input: () => string;

  output: (prefix?: string) => string;
}

/* class Ffmbc implements IFfmbc, CommonCMD {
  public programName: string = "ffmbc";
  constructor(private _params: INewParams, private _media: Media) { }
  get metadata() {
    return this._params.metadata;
  }
  get media() {
    return this._media;
  }
  get getting() {
    return new Ffmbc(this._params, this._media);
  }
  addProgram() {
    return this.programName;
  }
  input() {
    return `-i '${this.media.origin}'`;
  }
  output(prefix?: string) {
    return `${this.media.destiny}${prefix}.${this.metadata.general.container}`;
  }
  xdcamHD(prefix?: string) {
    return `-r ${this.metadata.video.frameRate
      } -target xdcamhd422 -y -tff -an '${this.output(
        prefix
      )}' -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
  }
  dvcpro() {
    return `-r 29.970 -bff -target dvcprohd -b 50M -minrate 50M -maxrate 50M -bufsize 8M  -timecode 00:00:00:00 -ac 2`;
  }
  dv25() {
    let pre = ` -r ${this.metadata.video.frameRate} -aspect ${this.metadata.video.aspectRatio} -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y`;
    if (this.metadata.general.container === "mov") {
      pre += ` ${this.media.destiny}`;
    }
    if (this.metadata.general.container === "mxf") {
      pre += ` -acodec pcm_s24le -sample_fmt s32 -ac 1 ${this.media.destiny} -ac 1 -ar ${this.metadata.audio.frameRate} -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;
    }
    return pre;
  }
  dnxhd() {
    return `-s 1920x1080 -r 29.97 -vcodec dnxhd -pixel_format yuv422p -b 145M -maxrate 145M -minrate 145M -bufsize 8M -tff -ar 41000 -acodec copy -y`;
  }
  sdPreAjust() {
    return `-r ${this.metadata.video.frameRate} -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b ${this.metadata.video.bitRate} -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${this.media.destiny}`;
  }
  h264() {
    return "";
  }
} */

type Media = {
  origin: string;
  destiny: string;
};

type Profile = {
  title: string;
  id: number | string;
  slug: string;
  media: Media;
  workflow: Workflow[];
};
type Programs = {
  ffmbc: IFfmbc;
  ffmpeg: IFfmpeg;
};
type Workflow = {
  id: number | string;
  title: string;
  type: string;
  command: Programs["ffmbc" | "ffmpeg"];
  program: keyof Programs;
  metadata: IMetadata;
  filter?: IFilter;
};

const newProfile = <Profile[]>[
  {
    title: "ECUAVISA HD",
    slug: "ecuavisa_hd",
    id: 1,
    media: {
      origin: "C:/Users/camog/Desktop/testingFile.mp4",
      destiny: "C:/Users/camog/Desktop/2021",
    },
    workflow: [
      {
        title: "XDCAM HD",
        type: "encoder",
        id: 1,
        program: "ffmbc",
        command: {},
        metadata: {
          general: {
            container: "mxf",
          },
          video: {
            frameRate: "29.97",
            fieldInterlaced: "1",
            scanType: "interlace",
          },
          audio: {
            codec: "pcm_s24le",
            frameRate: "48000",
          },
        },
      },
      {
        title: "Get Volume",
        type: "filter",
        id: 2,
        program: "ffmpeg",
        command: "getVolume",
        filter: {
          fAudio: {
            normalizeVolume: {
              threshold: "-12",
              marginError: "1",
            },
          },
        },
      },
    ],
  },
];

const mediaSrc = {
  origin: "C:/Users/camog/Desktop/TESTING FILE.mp4",
  destiny: "C:/Users/camog/Desktop/2021",
};

// FRONTEND

const data = {
  data: {
    origin: "C:/Users/camog/Desktop/testingFile.mp4",
    destiny: "C:/Users/camog/Desktop/2021.mov",
  },
  profile: [
    {
      title: "Ecuavisa HD",
      id: 1,
    },
   
  ],
};