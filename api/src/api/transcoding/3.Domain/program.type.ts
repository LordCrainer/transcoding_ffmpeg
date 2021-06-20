import { IFFmpeg } from "./ffmpeg/ffmpeg.interface";
import { IFFmbc } from "./ffmbc/ffmbc.interface";

const listProgram = ["ffmbc", "ffmpeg"];

interface ITranscodingProgram {
  ffmpeg: IFFmpeg;
  ffmbc: IFFmbc;
}
