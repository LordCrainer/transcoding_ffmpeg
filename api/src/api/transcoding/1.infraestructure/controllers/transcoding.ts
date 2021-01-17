import { IController } from "../../../../types/IController";
import apiResponse from "../../../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import ffmpeg from "../../2.aplication/ffmpeg";
import { normalizeVolume, transcoder } from "./../../2.aplication/1.use-case/";

const transcoding: IController = async (req, res) => {
  const { body } = req;

  try {
    const { source, metadata } = body;
    const data2 = await transcoder(source, metadata);
    const data = await normalizeVolume(ffmpeg.handleVolume)(source, metadata);
    const response = await apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (error) {
    console.log(error);

    await apiResponse.error(res, 400, error);
  }
};

export default {
  transcoding,
};
