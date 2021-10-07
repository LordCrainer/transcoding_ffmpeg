import { IMetadata } from "api/params";
import { execute } from "api/share/2.application";
import exp from "constants";

type Program = "ffmbc" | "ffmpeg";

type Profile = {
  title: string;
  id: string | number;
  slug: string;
  workflow: Workflow[];
};

type Workflow = {
  id: number | string;
  title: string;
  type: string;
};

type DefineType<Type> = {
  [key in keyof Type]: { title: string; value: key };
};

type Encoders = {
  title: string;
  type: string;
  id: string | number;
  program: Program;
};

const encoders = <DefineType<IMetadata["video"]>>{};

// INTERFACE REPOSITORY
interface FfmbcRepository {
  xdcamHD: () => string;
  h264: () => string;
}

interface FfmpegRepository {
  getVolume: () => string;
}

// ENCODERS
class FfmbcCommand implements FfmbcRepository {
  h264() {
    return "";
  }
  xdcamHD() {
    return `-target xdcamhd422 -y -tff -an -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
  }
}

class FfmpegEncoder implements FfmpegRepository {
  getVolume() {
    return "";
  }
}

//
type CMD = keyof FfmbcCommand | keyof FfmpegEncoder;

// FACTORY ABSTRACT
class FfmbcFactory implements IAbstractFactory {
  getCommands(cmd: keyof FfmbcCommand) {
    return {
      cmd: new FfmbcCommand()[cmd](),
      destiny: "",
    };
  }
}

class FfmpegFactory implements IAbstractFactory {
  getCommands(cmd: keyof FfmpegEncoder) {
    return {
      cmd: new FfmpegEncoder()[cmd](),
      destiny: "",
    };
  }
}

// COMMANDS
interface ICommmandResponse {
  cmd: string;
  destiny: string;
}

interface ICommands {
  title: string;
  id: string | number;
  key: string;
  value: string;
}

// ABSTRACT INTERFACE

interface IAbstractFactory {
  getCommands(cmd: CMD): ICommmandResponse;
}

// MAIN
class Main {
  public execute(factory: IAbstractFactory) {
    const cmd = factory.getCommands("getVolume");
    return cmd;
  }
}

// CREO EL FLUJO DE TRABAJO DESDE EL CLIENTE
// SE CREA UN STRING CON EL COMANDO CORRESPONDIENTE, Y CON EL INGRESO DE VARIABLES

const isObject = (obj: Object) =>
  Object.prototype.toString.call(obj) === "[object Object]";

const ComparasionObjects = (obj1: any, obj2: any) => {
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    let val1 = obj1[key];
    let val2 = obj2[key];
    let areObjects = isObject(val1) && isObject(val2);

    if (
      (areObjects && !ComparasionObjects(val1, val2)) ||
      (!areObjects && val1 !== val2)
    )
      return false;
  }

  return true;
};

describe("COMPARE BETWEEN DATA", () => {
  test("should return true, object are same", () => {
    const metadata_1 = {
      general: {
        container: "mxf",
      },
      audio: {
        bitrate: "48000",
        codec: "pcm_s24le",
      },
      video: {
        aspectRatio: "4:3",
        target: "xdcamhd422",
        framerate: "29.97",
        bitrate: "50M",
      },
      filter: {
        normalize: {
          threshold: "-12",
        },
      },
    };

    const metadata_2 = {
      general: {
        container: "mxf",
      },
      audio: {
        bitrate: "48000",
        codec: "pcm_s24le",
      },
      video: {
        aspectRatio: "4:3",
        target: "xdcamhd422",
        framerate: "29.97",
        bitrate: "50M",
      },
      filter: {
        normalize: {
          threshold: "-12",
        },
      },
    };
    expect(ComparasionObjects(metadata_2, metadata_1)).toBeTruthy();
  });
  test("should return trun, string are same", () => {
    const normalize_B = `ffmbc -i "/app/media/converted/hd20.2021-07-19-014280_1.mov" -r 29.97 -target xdcamhd422 -y -tff -an "/app/media/converted/2021-07-19-014280_1.mxf" -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0 ffmbc -i "/app/media/converted/hd20.2021-07-19-014280_1.mov" -r 29.97 -target xdcamhd422 -y -tff -an "/app/media/converted/2021-07-19-014280_1.mxf" -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
    const normalize_A = `ffmbc -i "/app/media/converted/hd20.2021-07-19-014280_1.mov" -r 29.97 -target xdcamhd422 -y -tff -an "/app/media/converted/2021-07-19-014280_1.mxf" -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0 ffmbc -i "/app/media/converted/hd20.2021-07-19-014280_1.mov" -r 29.97 -target xdcamhd422 -y -tff -an "/app/media/converted/2021-07-19-014280_1.mxf" -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
    expect(normalize_A === normalize_B).toBeTruthy();
  });
});

describe("WORKFLOW PROCESS", () => {
  test("should ", () => {
    const workflow = [
      {
        title: "Normalize",
        slug: "normalize",
        id: 100,
        type: "filter",
        metadata: [
          {
            type: "audio",
            threshold: -12,
            margen: 1,
          },
        ],
      },
      {
        title: "XDCAM_HD",
        slug: "xdcam_hd",
        type: "encoder",
        metadata: [
          {
            type: "video",
            bitrate: "29.97",
            format: "xdcamhd",
            pixelFormat: "",
            scanType: "interlace",
          },
          {
            type: "audio",
            frameRate: "48000",
            codec: "pcm_s16le",
          },
          {
            type: "audio",
            frameRate: "48000",
            codec: "pcm_s16le",
          },
        ],
      },
    ];
  });
});




interface meta {
  origin: string;
}

const getVolume = ({ origin }: meta) => {
  return `ffmpeg -i ${origin}  -af "volumedetect" -vn -sn -dn -f null /dev/null`;
};

const profile = <Profile[]>[
  {
    title: "ECUAVISA HD",
    id: 1,
    workflow: [
      {
        title: "XDCAM HD",
        id: 1,
        type: "encoder",
      },
    ],
  },
];

const perfiles = [
  {
    title: "ECUAVISA HD",
    id: 1,
    workflow: [
      {
        title: "Normalize",
        id: 2,
        type: "filter",
        source: {
          origin: "",
          destiny: "",
        },
        filter: {
          audio: {
            normalize: {
              threshold: -12,
              margen: 1,
            },
          },
        },
      },
      {
        title: "XDCAM_HD",
        id: 1,
        type: "encoder",
        source: {
          origin: "",
          destiny: "",
        },
      },
    ],
  },
  {
    title: "RTS HD",
    id: 1,
    workflow: [
      {
        title: "Normalize",
        id: 2,
        type: "filter",
        source: {
          origin: "",
          destiny: "",
        },
        filter: {
          audio: {
            normalize: {
              threshold: -20,
              margen: 1,
            },
          },
        },
      },
      {
        title: "XDCAM_HD",
        id: 1,
        type: "encoder",
        source: {
          origin: "",
          destiny: "",
        },
      },
    ],
  },
];

const newProfiles = [
  {
    id: 1,
    title: "ECUAVISA HD",
    process: "XDCAM_HD_12", // 100
    quantity: "HD",
    destiny: {
      prefix: "_ECUAVISA",
    },
  },
  {
    id: 2,
    title: "TC TELEVISION HD",
    process: "XDCAM_HD_12", //100
    quantity: "HD",
    destiny: {
      prefix: "_TC_TELEVISION",
    },
  },
  {
    id: 3,
    title: "RTS HD",
    process: "XDCAM_HD_20", //200
    quantity: "HD",
    destiny: {
      prefix: "_RTS",
    },
  },
  {
    id: 4,
    title: "ECUAVISA SD",
    process: "DVCPRO_SD",
    quantity: "SD",
    destiny: {
      prefix: "_ECUAVISA",
    },
  },
  {
    id: 5,
    title: "RTS SD",
    process: "DVCPRO_SD",
    quantity: "SD",
    destiny: {
      prefix: "_RTS",
    },
  },
];

const process = [
  {
    id: 100,
    title: "XDCAM HD 12",
    slug: "XDCAM_HD_12",
    workflow: [
      {
        title: "Normalize",
        metadata: [
          {
            title: "threshold",
            type: "filter",
            value: "-12",
          },
        ],
      },
      {
        title: "XDCAM HD",
        slug: "xdcam_hd",
        metadata: [
          {
            title: "container",
            type: "general",
            value: "mxf",
          },
        ],
      },
      {
        title: "Folder",
        slug: "folder",
      },
    ],
  },
  {
    id: 200,
    title: "XDCAM HD 20",
    slug: "XDCAM_HD_20",
    workflow: [
      {
        title: "Normalize",
        metadata: [
          {
            title: "threshold",
            type: "filter",
            value: "-20",
          },
        ],
      },
      {
        title: "XDCAM HD",
        slug: "xdcam_hd",
        metadata: [
          {
            title: "container",
            type: "general",
            value: "mxf",
          },
        ],
      },
    ],
  },
  {
    title: "DVCPRO_SD_12_32",
    slug: "DVCPRO_SD_12_32",
    workflow: [
      {
        title: "Normalize",
        metadata: [
          {
            title: "threshold",
            type: "filter",
            value: "-12",
          },
        ],
      },
      {
        title: "XDCAM HD",
        slug: "xdcam_hd",
        metadata: [
          {
            title: "container",
            type: "general",
            value: "mxf",
          },
        ],
      },
    ],
  },
];
