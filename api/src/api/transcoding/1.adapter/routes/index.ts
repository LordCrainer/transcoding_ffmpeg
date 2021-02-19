import { multer } from "../../../upload/1.infraestructure";
import { Router } from "express";

import transcodingController from "../controllers";

const transcodingRouter = (router: Router) => {
  router.post("/", transcodingController.transcoding);
  router.post(
    "/custom/upload",
    multer.single("files"),
    transcodingController.executeProgramUploaded
  );
  router.post("/custom", transcodingController.executeAnyProgram);

  return router;
};

export default transcodingRouter;
