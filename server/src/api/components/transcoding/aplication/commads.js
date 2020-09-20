const volumeDetect = ({ origin = "prueba.mov" }) =>
  `ffmpeg -i ${origin} -af 'volumedetect' -vn -sn -dn -f null /dev/null`;

const editVolume = (
  { origin = "origin.mov", destiny = "destiny.mov" },
  { volume = 0, unit = "dB" }
) => {
  return `ffmpeg -i ${origin} -vcodec copy -af volume=${volume}${unit} -y ${destiny}`;
};

const dv25 = ({ origin, destiny }) => {
  return `ffmbc -i ${origin}  -r 29970/1000 -aspect 3:2 -bff -target dvcpro -b 50M -minrate 50M -maxrate 50M -bufsize 8M  -timecode 00:00:00:00  -y ${destiny}`;
};

module.exports = {
  volumeDetect,
  editVolume,
  dv25,
};
