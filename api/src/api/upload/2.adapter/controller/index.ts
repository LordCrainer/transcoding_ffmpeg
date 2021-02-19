import apiResponse from "../../../../utils/apiResponse";
import { IController } from "./../../../../types/IController";
import httpStatusCodes from "http-status-codes";
import { multerService } from "../../3.application";

const uploadOneFile: IController = async (req, res) => {
  try {
    const { body, file } = req;
    const data = multerService.handleData(file);
    const respose = await apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};

const uploadMetadata: IController = async (req, res) => {
  try {
    const { body, files } = req;

    await apiResponse.result(res, files, httpStatusCodes.OK);
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};

export default {
  uploadOneFile,
  uploadMetadata,
};
