import { IParams } from './../../params/params.interface';

export interface IRegexFFmpeg {
  volume: {
    max: RegExp;
    mean: RegExp;
  };
  editVolume: RegExp;
}

export interface IFFmpegRepository {
  ajustVolume(params: IParams): string
  detectVolume(params: IParams): string
  sdPreAjust(params: IParams): string
}