import { multer } from "../../../upload/1.infraestructure";
import { Router } from "express";

import transcoderCtrl from "../controllers";

const transcodingRouter = (router: Router) => {
  router.post("/", transcoderCtrl.createTranscoding);
  router.post(
    "/custom/upload",
    multer.single("files"),
    transcoderCtrl.executeProgramUploaded
  );
  router.post("/custom", transcoderCtrl.executeAnyProgram);

  return router;
};

export default transcodingRouter;
