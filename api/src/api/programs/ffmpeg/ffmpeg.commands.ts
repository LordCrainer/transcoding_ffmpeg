import { fpFunctions } from "api/share/2.application";
import { IParams } from "./../../params/params.interface";

const ffmpeg = (params: IParams) => {
  const {
    origin,
    destiny,
    metadata: { audio, video },
  } = params;
  return {
    origin: `-i ${origin}`,
    destiny,
    metadata: {
      video: {
        frameRate: `-r ${video.frameRate}`,
        bitRate: `-b ${video.bitRate}`,
        codec: `-c:a ${audio.codec}`,
        scanType: video.scanType.startsWith("inter")
          ? `-top ${video.fieldInterlaced}`
          : "",
      },
    },
  };
};

const h264 = (params: IParams) => {
  const {
    origin,
    destiny,
    metadata: {
      video: {
        codec = "pcm_s24le",
        frameRate = "29.97",
        scanType = "interlace",
      },
    },
  } = ffmpeg(params);
  return `${origin}  ${frameRate}  -c:v libx264 -b:v 20M -maxrate 20M -minrate 20M -bufsize 4M -flags +ildct+ilme ${scanType}
  } -crf 2 -preset:v fast ${codec} -ac 2  -y ${destiny}`;
};

const ajustVolume = (
  { metadata: { audio }, destiny, origin, filter: { fAudio } }: IParams,
  newVolume: number
) => {
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${newVolume}${fAudio.normalizeVolume.unit} -acodec ${audio.codec} -y ${destiny}`;
};

const detectVolume = ({ origin }: IParams) =>
  `ffmpeg -i ${origin} -af 'volumedetect' -vn -sn -dn -f null /dev/null`;

const editVolume = ({
  metadata: { audio },
  destiny,
  origin,
  filter: { fAudio },
}: IParams) => {
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${fAudio.volume.value}${fAudio.volume.unit} -acodec ${audio.codec} -y ${destiny}`;
};

const sdPreAjust = ({ destiny, origin }: IParams) =>
  `ffmpeg -i ${origin} -r 29970/1000 -vcodec mpeg4 -pix_fmt yuv420p  -vf eq=saturation=1.06,scale=640:480:force_original_aspect_ratio=decrease,pad=640:480:(ow-iw)/2:(oh-ih)/2,setsar=1 -q:v 1 -b:v 50M -maxrate 50M  -minrate 50M -bufsize 8M  -acodec pcm_s16le  -timecode 00:00:00:00 -y ${destiny}`;

export default {
  detectVolume,
  editVolume,
  ajustVolume,
  sdPreAjust,
};
