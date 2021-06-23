import { IParams } from '../../params/params.interface';

export interface IPredefined {
  dvcpro25(params: IParams, fn?: Function): Promise<any>;
  h264(params: IParams, fn?: Function): Promise<any>;
}
