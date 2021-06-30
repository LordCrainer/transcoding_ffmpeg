import { INewParams, IParams } from "../params/params.interface";
import { IVideoMeta } from "./../params/video/videoMeta.interface";
import { IVideoFilter } from "./../params/video/videoFilter.interface";
import { IAudioMeta } from "./../params/audio/audioMeta.interface";
import { IAudioFilter } from "./../params/audio/audioFilter.interface";
import transcodingRouter from "./../transcoding/1.adapter/routes/index";
import { ffmbc, ffmpeg } from ".";
import { IMetadata } from "./../params/params.interface";

describe("FFMPEG COMMANDS STRING", () => {
  const params = <IParams>{
    origin: "C:/Users/camog/Desktop/testingFile.mp4",
    destiny: "C:/Users/camog/Desktop/2021.mov",
    metadata: {
      general: {
        container: "mxf",
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
      general: {
        container: "mov",
      },
      video: {
        frameRate: "29.97",
        aspectRatio: "4:3",
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
    params.metadata.general.container = "mxf";

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

type IFFmbcRepository = {
  encoder: () => IFFmbcEncoder;
};

type IFFmbcEncoder = {
  dv25: () => string;
  xdcamHD: () => string;
  dvcpro: () => string;
  dnxhd: () => string;
  sdPreAjust: () => string;
  h264: () => string;
};

type IFFmpegEncoder = {
  h264: () =>
    | "-r 29.97  -c:v libx264 -b:v 20M -maxrate 20M -minrate 20M -bufsize 4M -flags +ildct+ilme -top 1 -crf 2 -preset:v fast -af volume=-14dB -c:a pcm_s24le -ac 2  -y"
    | string;
  xdcamHD: () => string;
};

interface IFfmbc extends IFFmbcEncoder {}

interface IFfmpeg extends IFFmpegEncoder {}

type Getters<Type> = {
  [key in keyof Type]: Type[key];
};

type TFfmbcCommands = Getters<IFFmbcEncoder>;

class Ffmpeg implements IFfmpeg {
  public programName: string = "ffmpeg";
  h264() {
    return "";
  }
  xdcamHD() {
    return "";
  }
}

class Ffmbc implements IFfmbc {
  public programName: string = "ffmbc";
  constructor(private _params: INewParams, private _media: Media) {}
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
    return `-r ${
      this.metadata.video.frameRate
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
}

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

type Workflow = {
  id: number | string;
  title: string;
  type: string;
  command: keyof IFfmbc | keyof IFfmpeg;
  program: "ffmbc" | "ffmpeg";
  metadata: IMetadata;
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
        command: "xdcamHD",
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
    {
      title: "TC TELEVISION HD",
      id: 1,
    },
  ],
};

// TESTING

const ff = ({ metadata: { video, audio } }: INewParams) =>
  <TFfmbcCommands>{
    h264: () => `h264 ${video.frameRate}`,
    xdcamHD: () => "xdcam",
  };

describe("EXECUTE THE PROFILE", () => {
  const gotProfiles = data.profile.map((data) => {
    const foundProfile = newProfile.find((profile) => profile.id === data.id);
    if (!foundProfile) return "";
    const { program, command, metadata } = foundProfile.workflow[0];
    const transcoder = new Ffmbc({ metadata }, mediaSrc);
    let response = `${program} ${transcoder.input()} ${transcoder[
      command
    ]("_XDCAM")}`;
    return response;
  });
  test("should GET ARRAY OF COMMANDS", () => {
    expect(gotProfiles).toBe("");
  });
  test("should GET ONE COMMANDS", () => {
    const oneWorkFlow = newProfile[0].workflow[0];
    const nameProgram = oneWorkFlow.program;
    const commads = oneWorkFlow.command;
    const metadata = oneWorkFlow.metadata;
    let response;
    if (nameProgram === "ffmbc") {
      const pro = ff({ metadata: metadata })[commads];
    }
    const program = new Ffmbc(params, mediaSrc);
    response = `${nameProgram} ${program.input()} ${program[commads]()}`;
    expect(response).toBe(
      'ffmbc -i "C:/Users/camog/Desktop/testingFile.mp4" -r 29.97 -target xdcamhd422 -y -tff -an "C:/Users/camog/Desktop/2021.mov" -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0'
    );
  });
});

/* interface ICommand {
  programName: string;
  getCommand(): string;
}

class FFMBCCommand implements ICommand, IFfmbc {
}

class ProgramHandler {
  getCommand(command: ICommand) {
    console.log("PROGRAM HANDLER STARTED");

    return command.getCommand();
  }
}
/* const ffmbcClass = new FFMBCCommand(params);
const programHandler = new ProgramHandler();
programHandler.getCommand(ffmbcClass); */
