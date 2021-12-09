import { utils } from ".";

describe("CAMBIANDO EL COMPORTAMIENTO DEL STRING", () => {
  test("Split the string", () => {
    const beforeSplit = utils.splitString(/\s+/);
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
    const string =
      "ffmpeg -i origin.mov -af 'volumedetect' -vn -sn -dn -f null /dev/null";
    const array = beforeSplit(string);
    expect(array).toStrictEqual(result);
  });
});
