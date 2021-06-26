import { IParams } from './../../params/params.interface';

export interface IRegexFFmpeg {
  volume: {
    max: RegExp;
    mean: RegExp;
  };
  editVolume: RegExp;
}

export interface IFFmpegRepository {
  editVolume(params: IParams): string
  // getVolume(params: IParams): string
  // sdPreAjust(params: IParams): string
}