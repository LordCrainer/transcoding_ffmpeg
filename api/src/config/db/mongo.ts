import Logger from "../middleware/logger";
import mongoose from "mongoose";

const connect = async (path: string) => {
  try {
    Logger.info("💾 MongoDB Connected");
    return await mongoose.connect(path);
  } catch (err) {
    Logger.error(`❌ ${err.message}`);
    process.exit(1);
  }
};

mongoose.connection.on("reconnect", () => {
  Logger.info(`🔁 Reconnected to MongoDB`);
});

mongoose.connection.on("disconnected", () => {
  Logger.info(`❌ Disconnected from MongoDB`);
});

export default {
  connect,
};
