import express from "express";
import transcodingRouter from "./transcoding";

const router = express.Router();

router.use("/transcoding", transcodingRouter(router));

export default router;
