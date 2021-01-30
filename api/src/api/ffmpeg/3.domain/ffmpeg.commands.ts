import { IParams, IMetadata, sourceData } from "../../share/3.domain";

const ajustVolume = (
  { metadata, destiny, origin, filter }: IParams,
  newVolume: number
) => {
  const { audio } = metadata;
  const {
    audio: { volume },
  } = filter;
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${newVolume}${volume.unit} -acodec ${audio.codec} -y ${destiny}`;
};

const volumeDetect = (params: IParams) =>
  `ffmpeg -i ${params.origin} -af 'volumedetect' -vn -sn -dn -f null /dev/null`;
/*   { origin = "origin.mov", destiny = "destiny.mov" },
  { volume = 0, unit = "dB", audiocodec = "pcm_s24le" } */
const editVolume = (params: IParams) => {
  const {
    filter: {
      audio: { volume },
    },
    metadata: {
      audio: { codec },
    },
  } = params;
  return `ffmpeg -i ${params.origin} -vcodec copy -af volume=${volume.value}${volume.unit} -acodec ${codec} -y ${params.destiny}`;
};

const dv25Mov = (params: IParams) =>
  `ffmbc -i ${params.origin}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00  -y ${params.destiny}`;

const dv25Mxf = (params: IParams) =>
  `ffmbc -i ${params.origin}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s24le -sample_fmt s32 -ac 1  -y ${params.destiny} -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;

const preAjust = (params: IParams) =>
  `ffmpeg -i ${params.origin} -r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${params.destiny}`;

const preAjustSD = (params: IParams) =>
  `ffmbc -i ${params.origin} -r 29970/1000 -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${params.destiny}`;

export default {
  volumeDetect,
  editVolume,
  dv25Mov,
  dv25Mxf,
  preAjustSD,
  ajustVolume,
};
