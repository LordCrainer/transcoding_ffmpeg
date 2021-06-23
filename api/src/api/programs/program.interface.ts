import { IFFmpegRepository } from "./ffmpeg/ffmpeg.interface";
import { IFFmbcRepository } from "./ffmbc/ffmbc.interface";
const listProgram = ["ffmbc", "ffmpeg"];

interface ITranscodingProgram {
  ffmpeg: IFFmpegRepository;
  ffmbc: IFFmbcRepository;
}
export interface IProgram {
  application: string;
  args: Array<string>;
}
