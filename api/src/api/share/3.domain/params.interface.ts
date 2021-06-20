import { IAudioFilter } from "./audio/audioFilter.interface";
import { IVideoFilter } from "./video/videoFilter.interface";
import { IAudioMeta } from "./audio/audioMeta.interface";
import { IVideoMeta } from "./video/videoMeta.interface";

export interface IParams {
  origin: string;
  destiny: string;
  metadata: IMetadata;
  filter: IFilter;
}

export interface IMetadata {
  general: IGeneral;
  audio: IAudioMeta;
  video: IVideoMeta;
}

export interface IGeneral {
  fileExtension: string;
  format: string;
  fileSize: string;
  duration: string;
  videoCount: string;
  audioCount: string;
  profile: any;
}

export interface IFilter {
  status: boolean;
  fAudio: IAudioFilter;
  fVideo: IVideoFilter;
}

export interface ISource {
  origin: string;
  destiny: string;
}

export interface ICustomConfig {
  origin: string;
  destiny: string;
  commands: string;
  program: string;
}
