import { IMetada, ISourceData } from "./entities/IParams";
import { sourceData } from "./index";

const ajustVolume = (
  source: ISourceData,
  metadata: IMetada,
  newVolume: number
) => {
  const {
    audioFilter: { volume },
    audio: { codec },
  } = metadata;
  return `ffmpeg -i ${sourceData.getOriginPath(
    source
  )} -vcodec copy -af volume=${newVolume}${
    volume?.unit
  } -acodec ${codec} -y ${sourceData.getDestinyPath(source)}`;
};

const volumeDetect = (source: ISourceData) =>
  `ffmpeg -i ${sourceData.getOriginPath(
    source
  )} -af 'volumedetect' -vn -sn -dn -f null /dev/null`;
/*   { origin = "origin.mov", destiny = "destiny.mov" },
  { volume = 0, unit = "dB", audiocodec = "pcm_s24le" } */
const editVolume = (source: ISourceData, metadata: IMetada) => {
  const {
    audioFilter: { volume },
    audio: { codec },
  } = metadata;
  return `ffmpeg -i ${sourceData.getOriginPath(
    source
  )} -vcodec copy -af volume=${volume?.value}${
    volume?.unit
  } -acodec ${codec} -y ${sourceData.getDestinyPath(source)}`;
};

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

const preAjust = (source: ISourceData, metadata: IMetada) =>
  `ffmpeg -i ${sourceData.getOriginPath(
    source
  )} -r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${sourceData.getDestinyPath(
    source
  )}`;

const preAjustSD = (source: ISourceData, metadata: IMetada) =>
  `ffmbc -i ${sourceData.getOriginPath(
    source
  )} -r 29970/1000 -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${sourceData.getDestinyPath(
    source
  )}`;

export default {
  volumeDetect,
  editVolume,
  dv25Mov,
  dv25Mxf,
  preAjustSD,
  ajustVolume,
};
