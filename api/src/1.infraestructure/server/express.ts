import { IexpressConfig } from "types/IServer";
import express, { Router } from "express";
import http from "http";
import compress from "compression";
import methodOverride from "method-override";
import cors from "cors";
import helmet from "helmet";
import apiResponse from "../../utils/apiResponse";
import morganMiddleware from "../middleware/morganMiddleware";

export default async (config: IexpressConfig, apiRouter: () => Router) => {
  const app = express();
  const server = http.createServer(app);
  app.use(compress());
  app.use(methodOverride());
  app.use(morganMiddleware);
  /* app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); */
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors(config.cors));
  // ROUTES
  app.use("/api/services/", apiRouter());
  app.use("*", (req, res, next) => {
    apiResponse.error(res, 404, { message: "Page not found!!" });
    // res.status(404).send({ apiResponse: "API SERVICE: NOT FOUND PATH!!" });
  });
  return app;
};
