export interface IVideo {
  codec: string;
  format: string;
  frameRate: string;
  size: string;
  pixelFormat: string;
  fieldInterlaced: string;
  aspectRatio: string;
  bitRate: string;
}

export interface IAudio {
  codec: string;
  format: string;
  frameRate: string;
  bitRate: string;
}

export interface IAudioFilter {
  volume: {
    value: number;
    unit: string;
  };
  normalizeVolume: {
    threshold: number;
    marginError: number;
    max: number;
    min: number;
    unit: number;
  };
}

export interface IVideoFilter {
  pad?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface IGeneral {
  fileExtension: string;
  format: string;
  fileSize: string;
  duration: string;
  videoCount: string;
  audioCount: string;
}
export interface IMetadata {
  general: IGeneral;
  audio: IAudio;
  video: IVideo;
}
export interface IFilter {
  status: boolean;
  audio: IAudioFilter;
  video: IVideoFilter;
}
export interface IParams {
  origin: string;
  destiny: string;
  metadata: IMetadata;
  filter: {
    audio: Array<IAudioFilter>;
    video: Array<IVideoFilter>;
  };
}