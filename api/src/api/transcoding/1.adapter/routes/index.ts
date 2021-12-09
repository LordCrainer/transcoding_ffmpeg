import multer from "../../../../config/middleware/multer";
import { Router } from "express";

import transcoderCtrl from "../controllers";
const router = Router()

const transcodingRouter = () => {
  router.post("/", transcoderCtrl.createTranscoding);
  router.post(
    "/custom/upload",
    multer.handle.single("files"),
    transcoderCtrl.executeProgramUploaded
  );
  router.post("/custom", transcoderCtrl.executeAnyProgram);

  return router;
};

export default transcodingRouter;
