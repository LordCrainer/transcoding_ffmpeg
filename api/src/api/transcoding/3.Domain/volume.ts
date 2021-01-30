import { IMetadata, IParams } from "../../share/3.domain";

export interface IVolume {
  getVolume(source: IParams, fn?: Function): Promise<any>;
  subtractVolume(currentVolume: number, threshold: number): number;
  ajustVolume(
    source: IParams,
    metadata: IMetadata,
    volume: number,
    fn?: Function
  ): Promise<Object>;
  verifyVolume(
    maxVolume: number,
    normalizeVolume: { marginError: number; threshold: number }
  ): boolean;
}
