export interface IMediaInfo {
  origin: string;
  destiny: string;
  metadata: string;
  filter: Array<Object>;
}

export interface IMetadata {
  audio: string;
  video: string;
}

export interface IFilter {}

const video = {
  origin: "/upload/video.mp4",
  destiny: "/upload/xdcam",
  metadata: {
    general: {
      profile: "dvcpro",
    },
    audio: {
      extension: ".mov",
    },
    video: {
      framerate: "29997/10000",
    },
  },
  filter: [
    {
      _id: 1,
      type: "audio",
      title: "normalize_volume",
      threshold: "number",
      marginError: "number",
      max: "number",
      min: "number",
      unit: "number",
    },
    { _id: 1, title: "volume", type: "video", value: "number", unit: "string" },
  ],
};
