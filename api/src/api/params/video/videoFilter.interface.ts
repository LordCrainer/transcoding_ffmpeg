interface ICrop {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

interface IPad {
  width: number;
  height: number;
  x: number;
  y: number;
  color: "black" | "white";
}

export interface IVideoFilter {
  crop?: ICrop;
  pad?: IPad;
}
