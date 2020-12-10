import express from "express";
import transcodingRouter from "../../3.application/modules/transcoding/1.infraestructure/routes/transcoding";

const router = express.Router();

router.use("/transcoding", transcodingRouter(router));

export default router;
