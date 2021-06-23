import { IParams } from "../../params";
import { IRegexFFmpeg } from "../../programs/ffmpeg/ffmpeg.interface";

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
