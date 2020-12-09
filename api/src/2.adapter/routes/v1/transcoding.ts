import { Router } from "express";

import transcodingController from "../../../3.application/modules/transcoding/1.infraestructure/transcoding.controller";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);

  return router;
};

export default transcodingRouter;
