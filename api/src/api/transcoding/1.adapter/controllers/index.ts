import { IController } from "../../../../types/IController";
import apiResponse from "../../../../utils/apiResponse";
import httpStatusCodes from "http-status-codes";
import { executeProgram, transcoder } from "../../2.aplication";
import axios from "axios";
import { multerService } from "../../../upload/3.application";

const transcoding: IController = async (req, res) => {
  try {
    const { body } = req;
    const { params } = body;
    const data = await Promise.all(
      [...params].map(async (param) => {
        const data = await transcoder(param);
        return data;
      })
    );
    const response = await apiResponse.result(res, data, httpStatusCodes.OK);
  } catch (error) {
    console.log(error);
    await apiResponse.error(res, 400, error);
  }
};

const executeAnyProgram: IController = async (req, res) => {
  try {
    const {
      body: { params },
    } = req;
    const data = await executeProgram(params);
    const response = await apiResponse.result(
      res,
      { status: data.status },
      httpStatusCodes.OK
    );
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};
const executeProgramUploaded: IController = async (req, res) => {
  try {
    const {
      body: { params },
      file,
    } = req;
    let source = { ...params };
    const dataFile = multerService.handleData(file);
    source = { ...source, ...{ origin: dataFile.origin } };

    const data = await executeProgram(source);
    const response = await apiResponse.result(
      res,
      { status: data.status },
      httpStatusCodes.OK
    );
  } catch (error) {
    await apiResponse.error(res, 400, error);
  }
};

export default {
  transcoding,
  executeAnyProgram,
  executeProgramUploaded,
};
