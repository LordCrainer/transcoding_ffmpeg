import { IParams } from "./../../../share/3.domain/params.interface";

export interface IFFmbcRepository {
  dv25(params: IParams): string;
  dv(params: IParams): string;
  xdcamHD(params: IParams): string;
  sdPreAjust(params: IParams): string;
}

const af: IFFmbcRepository = {
  dv() {
    return "";
  },
  dv25(params) {
    return "";
  },
  sdPreAjust(params) {
    return "";
  },
  xdcamHD(params) {
    return "";
  },
};
