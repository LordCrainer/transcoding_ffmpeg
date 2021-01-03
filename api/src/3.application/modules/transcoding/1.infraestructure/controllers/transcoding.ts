import { IController } from "../../../../../types/IController";
import apiResponse from "../../../../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import transcodingService from "../../2.aplication/1.use-case/transcoding";

const transcoding: IController = async (req, res) => {
  const { body } = req;
  const { source, metadata } = body;
  try {
    const data = await transcodingService.transcoding(source, metadata);
    await apiResponse.result(res, {}, httpStatusCodes.OK);
  } catch (error) {
    apiResponse.error(res, 400, error);
  }
};

export default {
  transcoding,
};
