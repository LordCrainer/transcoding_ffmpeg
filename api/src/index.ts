import * as Bluebird from "bluebird";
declare global {
  export interface Promise<T> extends Bluebird<T> {}
}

import app from "1.infraestructure/web/express";

import config from "config";
import appConfig from "config/app";

const main = async () => {
  await (await app(appConfig)).listen(config.server.port);
  console.log(`SERVER START: ${config.server.host}:${config.server.port}`);
};

main();
