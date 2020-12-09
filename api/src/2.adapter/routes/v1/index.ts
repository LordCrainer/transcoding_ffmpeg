import express from "express";
const router = express.Router();
import transcodingRouter from "./transcoding";

router.use("transcoding", transcodingRouter(router));

module.exports = router;
