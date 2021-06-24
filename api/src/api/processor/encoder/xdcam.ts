import { IVideoMeta } from "./../../params/video/videoMeta.interface";
import { IAudioMeta } from "./../../params/audio/audioMeta.interface";
import { IParams } from "api/params";

const find = (data: string, options: any[]) => {
  return options.find((x) => x.title === data);
};

const subcommand = {
  size: "-s",
  aspectRatio: "-aspect",
  bitRate: "-b",
  fieldInterlaced: "-top",
};

const format = {
  "1920x1080i59.94": {
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "29.97",
    scanType: "interlace",
  },
  "1920x1080i50": {
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "25",
    scanType: "interlace",
  },
  "1920x1080p29.97": {
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "29.97",
    scanType: "progressive",
  },
  "1920x1080p25": {
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "25",
    scanType: "progressive",
  },
};
const bitrate = {
  "50 Mbit (422)": {
    bitRate: "50MB",
  },
  "35 Mbit (HQ 420, VBR)": {
    bitRate: "35MB",
  },
};

const getCommands = ({
  origin,
  destiny,
  metadata: { audio, video },
}: IParams) => {
  return {
    origin: `-i ${origin}`,
    destiny,
    metadata: {
      audio: {
        codec: `-c:a  ${audio.codec}`,
      },
      video: {
        size: `-s ${video.size}`,
        frameRate: `-r ${video.frameRate}`,
        bitRate: `-b ${video.bitRate}`,
        codec: `-c:v ${audio.codec}`,
        scanType: video.scanType.startsWith("inter")
          ? `-top ${video.fieldInterlaced}`
          : "",
      },
    },
  };
};

const defaultValue = <IParams>{
  metadata: {
    video: {
      profile: "high",
      level: "auto",
      codec: "libx264",
      frameRate: "29.97",
      aspectRatio: "19:9",
      scanType: "interlace",
      fieldInterlaced: "1",
      bitRate: "15M",
      bitRateMax: "15M",
      bitRateMin: "15M",
      container: "mov",
    },
    audio: {
      codec: "pcm_s24le",
    },
  },
};

interface XDCAM extends IParams {
  
}
type codec = "libx264";
type container = "mov" | "mxf";

const h264 = (params: IParams) => {
  const {
    destiny,
    metadata: {
      audio = { codec: "pcm_s24le" },
      video = { frameRate: "29.97", scanType: "interlace" },
    },
  } = getCommands(params);
  return `${video.frameRate}  -c:v libx264 -b:v 20M -maxrate 20M -minrate 20M -bufsize 4M -flags +ildct+ilme ${video.scanType}
  } -crf 2 -preset:v fast ${audio.codec} -ac 2`;
};
