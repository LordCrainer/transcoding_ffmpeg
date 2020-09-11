const path = require("path");

require("dotenv-safe").config({
  path: path.join(__dirname, "../../.env"),
  sample: path.join(__dirname, "../../.env.example"),
  allowEmptyValues: true,
});

const server = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  corsOptions: {
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  },
  logs: process.env.NODE_ENV === "production" ? "combined" : "dev",
};

module.exports = {
  server,
};
