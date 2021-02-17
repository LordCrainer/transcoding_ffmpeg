import multer from "multer";
import { IMulter } from "../multer.interface";

const multerHandler = (multerConf: IMulter) => {
  const storage = multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, multerConf.destiny);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: multerConf.fileSize,
    },
    // fileFilter: fileFilter,
  });
  return upload;
};

export { multerHandler };
