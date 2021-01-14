import { IexpressConfig } from "types/IServer";

import express, { Router } from "express";
import http from "http";
import morgan from "morgan";
//import compress from "compression"
import methodOverride from "method-override";
import cors from "cors";
//import helmet from "helmet"
import bodyParser from "body-parser";

export default async (config: IexpressConfig, apiRouter: () => Router) => {
  const app = express();
  const server = http.createServer(app);
  //app.use(compress());
  app.use(methodOverride());
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(morgan("dev"))
  //app.use(helmet());
  app.use(cors(config.cors));
  // ROUTES
  app.use("/api", apiRouter());
  app.use("*", (req, res, next) => {
    res.status(404);
    res.type("txt").send("API SERVICE: NOT FOUND PATH!!");
  });
  return app;
};
