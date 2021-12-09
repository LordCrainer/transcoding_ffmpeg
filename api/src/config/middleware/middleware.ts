import express from "express";
import compress from "compression";
import methodOverride from "method-override";
// import cors from "cors";
import helmet from "helmet";
import apiResponse from "../../Shared/utils/apiResponse";
import morganMiddleware from "./morganMiddleware";
import cors from "./cors";

const configure = async (app: express.Application) => {
  app.use(compress());
  app.use(methodOverride());
  app.use(morganMiddleware);
  /* app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); */
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());
  app.use(cors.set());

  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS "
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With," +
        " Content-Type, Accept," +
        " Authorization," +
        " Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });

  return app;
};

export default { configure };
