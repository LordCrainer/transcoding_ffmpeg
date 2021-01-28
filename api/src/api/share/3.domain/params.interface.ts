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
  status: boolean;
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
export interface ISourceData {
  origin: {
    path: string;
    originalName: string;
  };
  destiny: {
    suffix: string;
    prefix: string;
    path: string;
    fieldName: string;
    extension: string;
  };
  getOriginPath(source: ISourceData): string;
  getDestinyPath(source: ISourceData): string;
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

export interface IOptions {
  general: IGeneral;
  audio: IAudio;
  video: IVideo;
  audioFilter: IAudioFilter;
  videoFilter: IVideoFilter;
}

export interface IParams {
  origin: string;
  destiny: string;
  options: IOptions;
}

export interface IFilter {
  list: {
    video: Array<String>;
    audio: Array<String>;
  };
  audio: IAudioFilter;
  video: IVideoFilter;
}
