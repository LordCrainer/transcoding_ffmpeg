import { IController } from "../../../../types/IController";
import apiResponse from "../../../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { normalizeVolume, transcoder } from "../../2.aplication";

const transcoding: IController = async (req, res) => {
  const { body } = req;

  try {
    const { source, metadata } = body;
    const data = await transcoder(source, metadata);
    const response = await apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (error) {
    console.log(error);

    await apiResponse.error(res, 400, error);
  }
};

export default {
  transcoding,
};
