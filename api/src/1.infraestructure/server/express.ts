import express from "express";
import http from "http";
import morgan from "morgan";
//import compress from "compression"
import methodOverride from "method-override";
import cors from "cors";
//import helmet from "helmet"
import bodyParser from "body-parser";
import { IexpressConfig } from "types/IServer";
import apiRouter from "../../2.adapter/routes/v1";

export default async (config: IexpressConfig) => {
  const app = express();
  const server = http.createServer(app);
  //app.use(compress());
  app.use(methodOverride());
  //app.use(morgan("dev"))
  //app.use(helmet());
  app.use(cors(config.cors));
  // ROUTES
  app.use("/api", apiRouter);
  app.use("*", (req, res, next) => {
    res.status(404);
    res.type("txt").send("API SERVICE: NOT FOUND PATH!!");
  });
  return app;
};
