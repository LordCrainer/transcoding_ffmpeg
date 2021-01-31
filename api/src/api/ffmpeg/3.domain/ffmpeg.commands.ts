import { IParams } from "../../share/3.domain";

const ajustVolume = (
  { metadata: { audio }, destiny, origin, filter: { fAudio } }: IParams,
  newVolume: number
) => {
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${newVolume}${fAudio.volume.unit} -acodec ${audio.codec} -y ${destiny}`;
};

const volumeDetect = (params: IParams) =>
  `ffmpeg -i ${params.origin} -af 'volumedetect' -vn -sn -dn -f null /dev/null`;
/*   { origin = "origin.mov", destiny = "destiny.mov" },
  { volume = 0, unit = "dB", audiocodec = "pcm_s24le" } */
const editVolume = ({
  metadata: { audio },
  destiny,
  origin,
  filter: { fAudio },
}: IParams) => {
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${fAudio.volume.value}${fAudio.volume.unit} -acodec ${audio.codec} -y ${destiny}`;
};

const preAjust = ({ destiny, origin }: IParams) =>
  `ffmpeg -i ${origin} -r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${destiny}`;

export default {
  volumeDetect,
  editVolume,
  ajustVolume,
};
