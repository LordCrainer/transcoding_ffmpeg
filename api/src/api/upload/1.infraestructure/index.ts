import { multerHandler } from "./multer";
import config from "../../../config";

const multer = multerHandler(config.multer);

export { multer };
