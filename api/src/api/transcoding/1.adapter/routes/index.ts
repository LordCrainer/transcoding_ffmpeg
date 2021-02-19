import { Router } from "express";

import transcodingController from "../controllers";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);
  router.post("/custom", transcodingController.executeAnyProgram);

  return router;
};

export default transcodingRouter;
