export interface IVideoMeta {
  codec: string;
  container: "mov" | "mxf" | "mp4";
  format: string;
  frameRate: string;
  size: string;
  pixelFormat: string;
  scanType: string;
  fieldInterlaced: string;
  aspectRatio: string;
  bitRate: string;
  bitRateMax: string;
  bitRateMin: string;
}
