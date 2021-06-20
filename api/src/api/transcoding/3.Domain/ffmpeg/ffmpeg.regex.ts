import { IRegexFFmpeg } from "./ffmpeg.interface";

const regexs: IRegexFFmpeg = {
  volume: {
    max: /max_volume:\s(-?[0-9]\d*\.\d+)/,
    mean: /mean_volume:\s(-?[0-9]\d*\.\d+)/,
  },
  editVolume: /(frame)=\s*(\d+)|(fps)=\s*(\d+)|(fps)=\s*(\d+)|(time)\s*=(\d+:\d+:\d+\.\d+)|(size)=\s*(\d+)([a-z]+)|(bitrate)=\s*([\d\.]+)|(speed)=\s*([\d\.*]+)/gim,
};

export default regexs;
