import {
  ISourceData,
  ISpawnCallBack,
  IMetada,
  sourceData,
} from "./../../share/3.domain";

const dv25Mov = (source: ISourceData, metadata: IMetada) =>
  `ffmbc -i ${sourceData.getOriginPath(
    source
  )}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00  -y ${sourceData.getDestinyPath(
    source
  )}`;

const dv25Mxf = (source: ISourceData, metadata: IMetada) =>
  `ffmbc -i ${sourceData.getOriginPath(
    source
  )}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s24le -sample_fmt s32 -ac 1  -y ${sourceData.getDestinyPath(
    source
  )} -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;

const preAjustSD = (source: ISourceData, metadata: IMetada) =>
  `ffmbc -i ${sourceData.getOriginPath(
    source
  )} -r 29970/1000 -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${sourceData.getDestinyPath(
    source
  )}`;

export default {
  dv25Mov,
  dv25Mxf,
  preAjustSD,
};
