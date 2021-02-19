import { Router } from "express";
import uploadController from "../controller";
import { multer } from "../../1.infraestructure";
const cpUpload = multer.fields([
  { name: "files", maxCount: 1 },
  { name: "params", maxCount: 8 },
]);

const uploadRouter = (router: Router) => {
  router.post(
    "/onefile",
    multer.single("files"),
    uploadController.uploadOneFile
  );
  router.post("/metadata", cpUpload, uploadController.uploadMetadata);

  return router;
};

export default uploadRouter;
