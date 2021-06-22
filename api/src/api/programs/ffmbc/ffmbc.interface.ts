import { IParams } from './../../params/params.interface';

export interface IFFmbcRepository {
  dv25(params: IParams): string;
  xdcamHD(params: IParams): string;
  sdPreAjust(params: IParams): string;
}
