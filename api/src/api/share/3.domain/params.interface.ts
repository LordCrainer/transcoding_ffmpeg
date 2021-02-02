import { IAudioFilter } from "./audio/audioFilter.interface";
import { IVideoFilter } from "./video/videoFilter.interface";
import { IAudioMeta } from "./audio/audioMeta.interface";
import { IVideoMeta } from "./video/videoMeta.interface";
export interface IGeneral {
  fileExtension: string;
  format: string;
  fileSize: string;
  duration: string;
  videoCount: string;
  audioCount: string;
  perfil: string;
}
export interface IMetadata {
  general: IGeneral;
  audio: IAudioMeta;
  video: IVideoMeta;
}
export interface IFilter {
  status: boolean;
  fAudio: IAudioFilter;
  fVideo: IVideoFilter;
}
export interface IParams {
  origin: string;
  destiny: string;
  metadata: IMetadata;
  filter: IFilter;
}
