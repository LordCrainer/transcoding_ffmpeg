import { IFFmpegRepository } from "./ffmpeg.interface";
import { IParams } from "./../../params/params.interface";
import ffmpegCommands from "./ffmpeg.commands";

export class ffmpeg implements IFFmpegRepository {
    editVolume(params: IParams) {
    return ffmpegCommands.editVolume(params);
  }
}