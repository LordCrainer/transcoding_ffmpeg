import { IParams } from 'api/share/3.domain';

export interface IRegexFFmpeg {
  volume: {
    max: RegExp;
    mean: RegExp;
  };
  editVolume: RegExp;
}

interface IFFmpeg {
  ajustVolume(params: IParams): string
  detectVolume(params: IParams): string
  sdPreAjust(params: IParams): string
}