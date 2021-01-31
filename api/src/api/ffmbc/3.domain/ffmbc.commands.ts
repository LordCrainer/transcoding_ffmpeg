import {
  IParams,
  ISpawnCallBack,
  IMetadata,
  sourceData,
} from "./../../share/3.domain";

const dv25Mov = ({ origin, destiny, metadata: { video } }: IParams) =>
  `ffmbc -i ${origin}  -r ${video.frameRate} -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00  -y ${destiny}`;

const dv25Mxf = ({ origin, destiny }: IParams) =>
  `ffmbc -i ${origin}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s24le -sample_fmt s32 -ac 1  -y ${destiny} -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;

const preAjustSD = ({ origin, destiny, metadata: { video } }: IParams) =>
  `ffmbc -i ${origin} -r ${video.frameRate} -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${destiny}`;

export default {
  dv25Mov,
  dv25Mxf,
  preAjustSD,
};
