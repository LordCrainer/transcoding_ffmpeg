import { IMetada, ISourceData } from "./IParams";

export interface IVolume {
  getVolume(source: ISourceData, fn?: Function): Promise<any>;
  subtractVolume(currentVolume: number, threshold: number): number;
  ajustVolume(
    source: ISourceData,
    metadata: IMetada,
    volume: number,
    fn?: Function
  ): Promise<Object>;
  verifyVolume(
    maxVolume: number,
    normalizeVolume: { marginError: number; threshold: number }
  ): boolean;
}
