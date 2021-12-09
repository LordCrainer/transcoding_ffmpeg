import express from "express";
import http from "http";
import transcodingRouter from "../api/transcoding/1.adapter/routes";
import uploadRouter from "../api/upload/2.adapter/routes";
import swaggerRouter from "./swaggerRouter";

const init = (app: express.Application) => {
  const router: express.Router = express.Router();

  app.use("v1/transcoding", transcodingRouter);

  app.use("v1/upload", uploadRouter());

  swaggerRouter.init(app);

  app.use((req, res, next) => {
    res.status(404).send(http.STATUS_CODES[404]);
  });

  /**
   * @constructs all routes
   */
  app.use(router);
};

export default { init };
