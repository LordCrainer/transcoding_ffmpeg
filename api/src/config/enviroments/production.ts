import { Enviroments } from "./enviroment.interface";

const configuration: Enviroments = {
  dataBase: {
    mongo: {
      url: "" + process.env.MONGO_URL,
    },
  },
  server: {
    host: "" + process.env.HOST,
    port: "" + process.env.PORT,
  },
  multer: {
    destiny: process.env.MULTER_DESTINY || "./data",
    fileSize: 1.5 * 1000 * 1000 * 2000,
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "localhost:4000/",
    optionsSuccessStatus: 200,
  },
  secret: process.env.SECRET || "production",
};

export default configuration;
