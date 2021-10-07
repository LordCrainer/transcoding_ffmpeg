import * as Bluebird from "bluebird";
declare global {
  export interface Promise<T> extends Bluebird<T> {}
}

import app from "./1.infraestructure/server/express";
import apiRouter from "./2.adapter/routes/index";

import config from "./config";
import appConfig from "./config/app";
import Logger from "./1.infraestructure/middleware/logger";
import mongo from "./1.infraestructure/db/mongo"

const main = async () => {
  mongo.connect(config.dataBase.mongo.url)
  await (await app(appConfig, apiRouter)).listen(config.server.port);
  Logger.info(
    `SERVER START: http://${config.server.host}:${config.server.port}`
  );
};

main();
