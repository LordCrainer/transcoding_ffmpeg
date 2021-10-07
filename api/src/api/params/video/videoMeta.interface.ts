export interface IVideoMeta {
  codec?: codec;
  format?: string;
  frameRate?: string | number;
  size?: string;
  pixelFormat?: string;
  scanType?: "interlace" | "progressive";
  fieldInterlaced?: "1" | "0";
  aspectRatio?: string | string[];
  bitRate?: string | string[];
  bitRateMax?: string;
  bitRateMin?: string;
  profile?: profile;
  level?: string;
  preset?: preset;
  target?: "xdcamhd422" | "dvcprohd" | "dvcpro" | "";
  tune?: tune;
  pixFmt?: "yuv420p";
  qscale?: number;
  colorPrimaries?: "bt709";
}

type codec =
  | "avs"
  | "flv1"
  | "libx264"
  | "h264"
  | "hevc"
  | "mpeg1video"
  | "mpeg2video"
  | "mpeg4"
  | "svq1"
  | "svq3"
  | "webp";

type profile = "high" | "main" | "baseline";
type preset =
  | "veryslow"
  | "slower"
  | "slow"
  | "medium"
  | "fast"
  | "faster"
  | "veryfast"
  | "ultrafast";
type tune = "film" | "animation" | "ssmr" | "grain";
