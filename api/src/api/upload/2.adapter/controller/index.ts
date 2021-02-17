import apiResponse from "utils/apiResponse";
import { IController } from "./../../../../types/IController";
import httpStatusCodes from "http-status-codes";

const uploadOneFile: IController = async (req, res) => {
  try {
    const { body } = req;
    const respose = await apiResponse.result(res, {}, httpStatusCodes.OK);
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};

export default {
  uploadOneFile,
};
