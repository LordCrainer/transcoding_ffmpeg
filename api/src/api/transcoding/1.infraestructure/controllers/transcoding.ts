import { IController } from "../../../../types/IController";
import apiResponse from "../../../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import transcodingService from "../../2.aplication/1.use-case/transcoding";

const transcoding: IController = async (req, res) => {
  const { body } = req;

  try {
    const { source, metadata } = body;
    console.log(source);
    
    const data = await transcodingService.transcoding(source, metadata);
    const response = await apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};

export default {
  transcoding,
};
