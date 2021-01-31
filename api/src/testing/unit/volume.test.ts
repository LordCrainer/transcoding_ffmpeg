import { IParams } from "api/share/3.domain";
import { volume } from "../../api/transcoding/2.aplication";

const params = <IParams>{
  origin: "C:/Users/camog/Desktop/CONVERT/original.mov",
  destiny: "C:/Users/camog/Desktop/CONVERT/output.mov",
};

describe("FUNCIONES DEL AUDIO, VOLUMEN", () => {
  test("Should get volume from the file ", async (done) => {
    const data = await volume.getVolume(params);
    expect(data).toEqual({ max: "0.0", mean: "-10.1" });
    done();
  });
});
