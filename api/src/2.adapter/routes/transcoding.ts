import { Router } from "express";

import transcodingController from "../controllers/transcoding.controller";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);

  return router;
};

export default transcodingRouter;
