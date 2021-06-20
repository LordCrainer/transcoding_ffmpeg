import { IParams } from "./../../../share/3.domain/params.interface";
import { IVideoContainer } from "api/share/3.domain/video/videoMeta.interface";

export interface IFFmbc {
  dv25(params: IParams): string;
  dv(container: IVideoContainer): (params: IParams) => string;
  xdcamHD(params: IParams): string;
  sdPreAjust(params: IParams): string;
}

const af: IFFmbc = {
  dv({ name = "mov" }) {
    return (params) => {
      return "";
    };
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
