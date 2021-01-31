import { IMetadata, IParams } from "../../share/3.domain";
import { IRegexFFmpeg } from './../../ffmpeg/3.domain/ffmpeg.interface';

export interface IAudioVolume {
  getVolume(params: IParams, fn?: Function): Promise<IRegexFFmpeg>;
  subtractVolume(currentVolume: number, threshold: number): number;
  ajustVolume(
    params: IParams,
    newVolume: number,
    fn?: Function
  ): Promise<Object>;
  verifyVolume(
    maxVolume: number,
    normalizeVolume: { marginError: number; threshold: number }
  ): boolean;
}