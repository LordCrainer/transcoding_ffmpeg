import { IMetadata, IParams } from "../../share/3.domain";

export interface IAudioVolume {
  getVolume(params: IParams, fn?: Function): Promise<any>;
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
