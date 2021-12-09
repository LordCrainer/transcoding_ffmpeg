import { Router } from "express";
import uploadController from "../controller";
import multer from "../../../../config/middleware/multer";
const cpUpload = multer.handle.fields([
  { name: "files", maxCount: 1 },
  { name: "params", maxCount: 8 },
]);
const router = Router();
const uploadRouter = () => {
  router.post(
    "/onefile",
    multer.handle.single("files"),
    uploadController.uploadOneFile
  );
  router.post("/metadata", cpUpload, uploadController.uploadMetadata);

  return router;
};

export default uploadRouter;
