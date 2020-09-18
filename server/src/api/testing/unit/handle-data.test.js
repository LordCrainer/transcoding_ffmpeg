const {
  splitString,
  mapGeneric,
} = require("../../components/transcoding/aplication/handled-data");

const {
  volumeDetect,
  editVolume,
  dv25,
} = require("../../components/transcoding/aplication/commads");

describe("Function to handle data", () => {
  test("Map and exec a function ", () => {
    const double = (item) => item * 2;
    const array = [1, 2, 3, 4];
    expect(mapGeneric(array, double)).toEqual([2, 4, 6, 8]);
  });
});

describe("Converting text plain commands in array", () => {
  const data = {
    properties: {
      origin: "origin.mov",
      destiny: "destiny.mov",
    },
    volume: { factor: -6, unit: "dB" },
  };
  test("GET VOLUME", () => {
    const result = [
      "ffmpeg",
      "-i",
      "origin.mov",
      "-af",
      "'volumedetect'",
      "-vn",
      "-sn",
      "-dn",
      "-f",
      "null",
      "/dev/null",
    ];
    expect(splitString(volumeDetect(data.properties))).toStrictEqual(result);
  });
  test("CHANGE VOLUME", () => {
    const result = [
      "ffmpeg",
      "-i",
      "origin.mov",
      "-vcodec",
      "copy",
      "-af",
      "volume=-6dB",
      "-y",
      "destiny.mov",
    ];
    expect(splitString(editVolume(data.properties, data.volume))).toStrictEqual(
      result
    );
  });
  test("TRANSCODING DVCPRO SD", () => {
    const result = [
      "ffmbc",
      "-i",
      "origin.mov",
      "-r",
      "29.970",
      "-aspect",
      "3:2",
      "-bff",
      "-target",
      "dvcpro",
      "-b",
      "50M",
      "-minrate",
      "50M",
      "-maxrate",
      "50M",
      "-bufsize",
      "8M",
      "-timecode",
      "00:00:00:00",
      "-y",
      "destiny.mov",
    ];
    expect(
      splitString(dv25(data.properties, data.volume), /\s+/)
    ).toStrictEqual(result);
  });
});
