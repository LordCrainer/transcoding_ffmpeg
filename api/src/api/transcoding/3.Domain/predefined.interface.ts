import { IParams } from "../../../api/share/3.domain";

export interface IPredefined {
  dvcpro25(params: IParams, fn?: Function): Promise<any>;
  h264(params: IParams, fn?: Function): Promise<any>;
}
