import { IOverrideRequest } from "Shared/domain/apiReponse.interface";
import { Response } from "express";
import httpStatusCodes from "http-status-codes";

const result = (
  res: Response,
  data: object,
  status: number = 200,
  cookie?: any
): void => {
  res.status(status).json({ data, success: true });
};
const error = (
  res: Response,
  status: number = 404,
  error = {
    message: httpStatusCodes.getStatusText(status),
  },
  override?: IOverrideRequest
): void => {
  res.status(status).json({ error, success: false, override });
};

export default {
  result,
  error,
};
/* export default class ApiResponse {
  static result = (res: Response, data: object,
                   status: number = 200,
                   cookie: ICookie = null) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      data,
      success: true,
    });
  }

  static error = (res: Response,
                  status: number = 400,
                  error: string = httpStatusCodes.getStatusText(status),
                  override: IOverrideRequest = null) => {
    res.status(status).json({
      override,
      error: {
        message: error,
      },
      success: false,
    });
  }

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  }
} */
