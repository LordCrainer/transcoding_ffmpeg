import express from "express";
import transcodingRouter from "./transcoding";
import testingRoute from './test';

const router = express.Router();

router.use("/transcoding", transcodingRouter(router));
router.use("/test", testingRoute(router));

export default router;
