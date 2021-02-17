import express from "express";
import transcodingRouter from "../../api/transcoding/1.adapter/routes";
import uploadRouter from './../../api/upload/2.adapter/routes';

const apiRouter = () => {
  const router = express.Router();
  router.use("/transcoding", transcodingRouter(router));
  router.use("/upload", uploadRouter(router));
  return router;
};

export default apiRouter;
