import { Router } from "express";
import uploadController from "../controller";
import { multer } from "../../1.infraestructure";

const uploadRouter = (router: Router) => {
  router.post(
    "/onefile",
    multer.single("files"),
    uploadController.uploadOneFile
  );

  return router;
};

export default uploadRouter;
