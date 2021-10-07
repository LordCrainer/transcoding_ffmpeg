import mongoose from "mongoose";

const connect = async (path: string) => {
  try {
    await mongoose.connect(path, {
      //   useNewUrlParser: true,
      //   useCreateIndex: true,
    });
    console.log("✔ MongoDB connected");
    return;
  } catch (error) {
    console.log(`x Error connecting to MongoDB. ${error}`);
  }
};

mongoose.connection.on("reconnect", () => {
  console.log("Reconnected to MongoDB");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export default {
  connect,
};
