import * as dotenv from "dotenv";
const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

import development from "./development";
import production from "./production";

const { NODE_ENV } = process.env;
let currentEnv = development;

currentEnv = NODE_ENV === "production" ? production : development;

export default currentEnv;
