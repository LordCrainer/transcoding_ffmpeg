const configuration = {
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
};

export default configuration;
