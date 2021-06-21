import { IParams, ISpawnCallBack, IMetadata } from "../../../share/3.domain";

const xdcamHD = (() => {
  const mxf = ({ origin, destiny }: IParams) =>
    `ffmbc -i ${origin} -r 29.97 -target xdcamhd422 -y -tff -an ${destiny} -acodec pcm_s24le -ar 48000 -newaudio -acodec pcm_s24le -ar 48000 -newaudio -map_audio_channel 0:1:0:0:1:0 -map_audio_channel 0:1:1:0:2:0`;
  return {
    mxf,
  };
})();

/* const dv25 = (() => {
  const mov = ({ origin, destiny, metadata: { video } }: IParams) =>
    `ffmbc -i ${origin}  -r ${video.frameRate} -aspect ${video.aspectRatio} -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00  -y ${destiny}`;
  const mxf = ({ origin, destiny }: IParams) =>
    `ffmbc -i ${origin}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -acodec pcm_s24le -sample_fmt s32 -ac 1  -y ${destiny} -ac 1 -ar 48000 -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;
  return {
    mov,
    mxf,
  };
})(); */

const dv25 = ({ origin, destiny, metadata: { video, audio } }: IParams) => {
  let pre = `ffmbc -i ${origin}  -r ${video.frameRate} -aspect ${video.aspectRatio} -bff -target dvcpro -b 30M -minrate 30M -maxrate 30M -bufsize 4M  -timecode 00:00:00:00 -y`;
  if (video.container === "mov") {
    pre = `${pre} ${destiny}`;
  }
  if (video.container === "mxf") {
    pre = `${pre} -acodec pcm_s24le -sample_fmt s32 -ac 1 ${destiny} -ac 1 -ar ${audio.frameRate} -acodec pcm_s24le -sample_fmt s32  -newaudio  -map_audio_channel  0:1:0:0:1:0  -timecode 00:00:00:00`;
  }
  return pre;
};

const sdPreAjust = ({ origin, destiny, metadata: { video } }: IParams) =>
  `ffmbc -i ${origin} -r ${video.frameRate} -vcodec mpeg4  -pix_fmt yuv420p -vf pad=720:576:0:72:black:aspect=4:3  -qscale 1 -color_primaries bt709 -b ${video.bitRate} -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${destiny}`;

export default {
  dv25,
  xdcamHD,
  sdPreAjust,
};
