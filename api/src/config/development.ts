const configuration = {
  server: {
    host: "localhost",
    port: 3002,
  },
  multer: {
    destiny: process.env.PATH_ORIGIN || "./data",
    fileSize: 1.5 * 1000 * 1000 * 2000,
  },
};

export default configuration;
