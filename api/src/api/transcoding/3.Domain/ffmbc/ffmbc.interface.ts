import { IParams } from "./../../../share/3.domain/params.interface";

interface FFmbc {
  dv25Mov(params: IParams): string;
  dv25Mxf(params: IParams): string;
  sdPreAjust(params: IParams): string;
}
