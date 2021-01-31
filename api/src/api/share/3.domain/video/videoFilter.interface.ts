interface ICrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

interface IPad {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface IVideoFilter {
  crop: ICrop;
  IPad: IPad;
}
