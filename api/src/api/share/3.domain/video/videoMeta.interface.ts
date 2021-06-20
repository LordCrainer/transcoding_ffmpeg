export interface IVideoMeta {
  codec: string;
  format: string;
  frameRate: string;
  size: string;
  pixelFormat: string;
  fieldInterlaced: string;
  aspectRatio: string;
  bitRate: string;
  bitRateMax: string;
  bitRateMin: string;
}

export interface IVideoContainer {
  name: "mov" | "mxf";
}
