import { ISource } from "../params/";
import { Workflow } from "api/profile/workflow/workflow.interface";
import { Profile } from "api/profile/profile.interface";
import { Process } from "api/profile/process/process.interface";

const ENTRADAS = {
  archivos: [
    {
      title: "",
      origin: "",
    },
  ],
};

const profileData: Profile[] = [
  {
    title: "ECUAVISA HD",
    id: 1,
    type: "general",
    quality: "HD",
    workflowId: 1000,
    description: "",
  },
  {
    title: "TC_TELEVISION HD",
    id: 2,
    type: "general",
    quality: "HD",
    workflowId: 1001,
    description: "",
  },
  /*   {
    title: "RTS HD",
    id: 3,
    type: "general",
    quality: "HD",
    workflowId: 1002,
    description: "",
  },
  {
    title: "ECUAVISA SD",
    id: 4,
    type: "general",
    quality: "SD",
    workflowId: 1003,
    description: "",
  }, */
];

const inputData = {
  source: <ISource>{
    origin: {
      fullPath: "./testing.mov",
    },
    destiny: {
      path: "/data/media/",
      filename: "2021-09-04",
    },
  },
  profiles: profileData,
};

const WORKFLOWS = <Workflow[]>[
  {
    title: "ECUAVISA HD",
    id: 1000,
  },
  {
    title: "TC TELEVISION HD",
    id: 1001,
    process: [
      {
        title: "Normalize",
        slug: "normalizeVolume",
        type: "filter",
        tags: ["audio", "filter"],
        program: "ffmpeg",
        hash: "b6bd9c5abe0a26e111f7503d6f085e386eb8a3d1",
        id: 11,
        metadata: {
          source: {
            origin: {
              fullPath: "",
            },
            destiny: {
              fullPath: "",
            },
          },
          filter: {
            normalizeVolume: {
              threshold: -12,
              marginError: 1,
              unit: "dB",
            },
          },
        },
      },
      {
        title: "XDCAM HD",
        slug: "xdcamHD",
        type: "encoder",
        tags: ["video"],
        program: "ffmpeg",
        id: 100,
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              fullPath: "testing.mxf",
            },
          },
          general: {
            container: "mxf",
          },
          video: {
            format: "1920x1080i50",
            bitRate: "50M",
          },
          audio: {
            codec: "pcm_s24le",
            channels: {
              value: 2,
              type: "mono",
            },
          },
        },
      },
      {
        title: "OUTPUT",
        type: "output",
        program: "ffmpeg",
        slug: "copy",
        id: 10002,
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              filename: "testing",
              prefix: "_TC_TELEVISION",
            },
          },
        },
      },
    ],
  },
  {
    title: "RTS HD",
    id: 1003,
    process: [
      {
        title: "Normalize",
        slug: "normalize",
        type: "filter",
        tags: ["audio"],
        program: "ffmpeg",
        id: 11,
        metadata: {
          source: {
            origin: {},
            destiny: {},
          },
          filter: {
            normalizeVolume: {
              threshold: -20,
              marginError: 1,
              unit: "dB",
            },
          },
        },
      },
      {
        title: "XDCAM HD",
        slug: "xdcamhd",
        type: "encoder",
        tags: ["video"],
        id: 100,
        program: "ffmbc",
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              fullPath: "testing.mxf",
            },
          },
          general: {
            container: "mxf",
          },
          video: {
            format: "1920x1080i50",
            bitRate: "50M",
          },
          audio: {
            codec: "pcm_s24le",
            channels: {
              value: 2,
              type: "mono",
            },
          },
        },
      },
      {
        title: "OUTPUT",
        type: "output",
        slug: "",
        id: 10003,
        program: "bash",
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              filename: "testing",
              prefix: "_TC_TELEVISION",
            },
          },
        },
      },
    ],
  },
  {
    title: "ECUAVISA SD",
    id: 1004,
    process: [
      {
        title: "Normalize",
        slug: "normalize",
        type: "filter",
        tags: ["audio"],
        program: "ffmpeg",
        id: 11,
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              fullPath: "testing.mxf",
            },
          },
          filter: {
            normalizeVolume: {
              threshold: -12,
              marginError: 1,
              unit: "dB",
            },
          },
        },
      },
      {
        title: "XDCAM HD",
        slug: "xdcamhd",
        type: "encoder",
        tags: ["video"],
        program: "ffmpeg",
        id: 100,
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              fullPath: "testing.mxf",
            },
          },
          general: {
            container: "mxf",
          },
          video: {
            format: "1920x1080i50",
            bitRate: "50M",
          },
          audio: {
            codec: "pcm_s24le",
            channels: {
              value: 2,
              type: "mono",
            },
          },
        },
      },
      {
        title: "OUTPUT",
        type: "output",
        program: "ffmpeg",
        slug: "",
        id: 10003,
        metadata: {
          source: {
            origin: {
              fullPath: "testingFile.mov",
            },
            destiny: {
              filename: "testing",
              prefix: "_TC_TELEVISION",
            },
          },
        },
      },
    ],
  },
];

const PROCESS_PRECARGADOS = <Process[]>[
  {
    title: "Normalize",
    slug: "normalizeVolume",
    type: "filter",
    tags: ["audio", "filter"],
    hash: "",
    id: 11,
    program: "ffmpeg",
    metadata: {
      source: {
        origin: {
          fullPath: "",
        },
        destiny: {
          fullPath: "",
          prefix: "",
        },
      },
      filter: {
        normalizeVolume: {
          threshold: 0,
          marginError: 1,
          unit: "dB",
        },
      },
    },
  },
  {
    title: "PRE AJUST",
    slug: "",
    hash: "",
    type: "filter",
    id: 120,
    tags: ["video"],
    program: "ffmpeg",
    metadata: {
      source: {
        origin: {
          fullPath: "",
        },
        destiny: {
          fullPath: "",
        },
      },
      general: {
        container: "mov",
      },
      video: {
        bitRate: "50M",
        aspectRatio: "4:3",
        qscale: 1,
        colorPrimaries: "bt709",
        codec: "mpeg4",
        bitRateMax: "50M",
        bitRateMin: "50M",
      },
      filter: {
        pad: {
          width: 720,
          height: 576,
          x: 0,
          y: 72,
          color: "black",
        },
      },
    },
  },
  {
    title: "XDCAM HD",
    slug: "xdcamhd",
    type: "encoder",
    tags: ["video"],
    program: "ffmpeg",
    id: 100,
    metadata: {
      source: {
        origin: {
          fullPath: "",
        },
        destiny: {
          fullPath: "",
        },
      },
      general: {
        container: "mxf",
      },
      video: {
        format: "1920x1080i50",
        bitRate: "50M",
      },
      audio: {
        codec: "pcm_s24le",
        channels: {
          value: 2,
          type: "mono",
        },
      },
    },
  },
];

export default {
  inputData,
  profileData,
  WORKFLOWS,
  PROCESS_PRECARGADOS,
};
