import { Router } from "express";

import transcodingController from "../controllers/transcoding";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);

  return router;
};

export default transcodingRouter;
