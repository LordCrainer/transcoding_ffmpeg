import multer from "multer";
import enviroments from "../enviroments";

export interface IMulter {
  destiny: string;
  fileSize: number;
}

const configuration = (multerConf: IMulter) => {
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
    //fileFilter: fileFilter,
  });
  return upload;
};

const setStorage = (destiny: string, format?: string) =>
  multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, destiny);
    },
    filename: (req, metadata, cb) => {
      cb(null, format || metadata.filename);
    },
  });

const setOptions = ({ storage, limits }: multer.Options) =>
  multer({
    storage,
    limits,
  });

const setLimits = (options: IMulter): multer.Options["limits"] => ({
  fieldSize: options.fileSize,
});

const handle = configuration(enviroments.multer);

export default { handle, configuration, setStorage, setLimits };
