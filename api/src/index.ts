import * as Bluebird from "bluebird";
declare global {
  export interface Promise<T> extends Bluebird<T> {}
}

import app from "./config/server/";
import * as http from "http";
import enviroments from "./config/enviroments";
import Logger from "./config/middleware/logger";
import mongo from "./config/db/mongo";

const main = async () => {
  await mongo.connect(enviroments.dataBase.mongo.url);

  const server: http.Server = http.createServer(app);

  await server.listen(app.get("port"), () =>
    Logger.info(`💻 http://${enviroments.server.host}:${app.get("port")}`)
  );
};
main();
