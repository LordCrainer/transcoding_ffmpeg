const configuration = {
  server: {
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
  },
  multer: {
    destiny: process.env.PATH_ORIGIN || "./data",
    fileSize: 1.5 * 1000 * 1000 * 2000,
  },
};

export default configuration;
