import { IMetadata, ISourceData } from "../../share/3.domain";

export interface IVolume {
  getVolume(source: ISourceData, fn?: Function): Promise<any>;
  subtractVolume(currentVolume: number, threshold: number): number;
  ajustVolume(
    source: ISourceData,
    metadata: IMetadata,
    volume: number,
    fn?: Function
  ): Promise<Object>;
  verifyVolume(
    maxVolume: number,
    normalizeVolume: { marginError: number; threshold: number }
  ): boolean;
}
