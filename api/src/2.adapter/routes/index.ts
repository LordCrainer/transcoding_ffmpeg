import express from "express";
import transcodingRouter from "../../api/transcoding/1.adapter/routes/transcoding";

const apiRouter = () => {
  const router = express.Router();
  router.use("/transcoding", transcodingRouter(router));
  return router;
};

export default apiRouter;
