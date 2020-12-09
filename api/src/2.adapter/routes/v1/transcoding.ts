// const transcodingController = require("./transcoding.controller");

import transcodingController from "3.application/modules/transcoding/1.infraestructure/transcoding.controller";
import { Router } from "express";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);

  return router;
};

export default transcodingRouter;
