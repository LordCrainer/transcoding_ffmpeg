import { Enviroments } from "./enviroment.interface";

const configuration: Enviroments = {
  dataBase: {
    mongo: {
      url: "mongodb://soporte:Support@127.0.0.1:27017/lntv",
    },
  },
  server: {
    host: "localhost",
    port: process.env.PORT || 3002,
  },
  multer: {
    destiny: process.env.PATH_ORIGIN || "./data",
    fileSize: 1.5 * 1000 * 1000 * 2000,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "localhost:4000/",
    optionsSuccessStatus: 200,
  },
  secret: process.env.SECRET || "develop"
};

export default configuration;
