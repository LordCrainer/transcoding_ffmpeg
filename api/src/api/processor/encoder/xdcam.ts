import { IVideoMeta } from "./../../params/video/videoMeta.interface";
import { IAudioMeta } from "./../../params/audio/audioMeta.interface";
const HD = () => {};

interface IXDCAM extends IVideoMeta, IAudioMeta {}

const find = (data: string, options: any[]) => {
  return options.find((x) => x.title === data);
};



const subcommand = {
  size: "-s",
  aspectRatio: "-aspect",
  bitRate: "-b",
  fieldInterlaced: "-top"
};

const format = [
  {
    title: "1920x1080i59.94",
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "29.97",
    scanType: "interlace",
  },
  {
    title: "1920x1080i50",
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "25",
    scanType: "interlace",
  },
  {
    title: "1920x1080p29.97",
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "29.97",
    scanType: "progressive",
  },
  {
    title: "1920x1080i50",
    size: "1920x1080",
    aspectRatio: "16:9",
    frameRate: "25",
    scanType: "progressive",
  },
];

const bitrate = [
  {
    title: "50 Mbit (422)",
    bitRate: "50MB",
  },
  {
    title: "35 Mbit (HQ 420, VBR)",
    bitRate: "35MB",
  },
];
