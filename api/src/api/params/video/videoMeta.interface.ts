export interface IVideoMeta {
  codec: codec;
  container: container;
  format: string;
  frameRate: string;
  size: string;
  pixelFormat: string;
  scanType: "interlace" | "progressive";
  fieldInterlaced: "1" | "0";
  aspectRatio: string;
  bitRate: string;
  bitRateMax: string;
  bitRateMin: string;
  profile: profile;
  level: string;
  preset: preset;
  tune: tune;
}

type container = "mov" | "mxf" | "mp4" | "avi" | "flv";
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
