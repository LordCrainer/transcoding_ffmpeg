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
  source?: ISource;
  general?: IGeneral;
  audio?: IAudioMeta | IAudioMeta[];
  video?: IVideoMeta | IVideoMeta[];
  filter?: IAudioFilter & IVideoFilter;
}

export interface IGeneral {
  fileExtension?: string;
  format?: string;
  fileSize?: string;
  duration?: string;
  videoCount?: string;
  audioCount?: string;
  container: container;
}

type container = "mov" | "mxf" | "mp4" | "avi" | "flv";

export interface IFilter {
  status: boolean;
  fAudio: IAudioFilter;
  fVideo: IVideoFilter;
}

export interface ISource {
  origin?: IPath;
  destiny?: IPath;
}

interface IPath {
  fullPath?: string;
  prefix?: string;
  path?: string;
  filename?: string;
  extension?: string;
}

export interface ICustomConfig {
  origin: string;
  destiny: string;
  commands: string;
  program: string;
}
