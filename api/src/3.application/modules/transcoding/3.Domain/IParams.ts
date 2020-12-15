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
  audioRate: string;
  bitRate: string;
}

export interface IAudioFilter {
  status: boolean;
  volume?: {
    value: number;
    unit: string;
  };
}

export interface IVideoFilter {
  status: boolean;
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

export interface IMetada {
  audio: IAudio;
  video: IVideo;
  audioFilter: IAudioFilter;
  videoFilter: IVideoFilter;
}
