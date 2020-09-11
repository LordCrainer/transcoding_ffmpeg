const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
const morgan = require("morgan"); //Gestor de logging
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const helmet = require("helmet");

const { logs, corsOptions } = require("./vars");
const apiRoute = require("../api/routes/v1/index");

app.use(compress()); // gzip compression
app.use(methodOverride()); //For client doesn't support PUT or DELETE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions)); //Cross Origin Resource Sharing
app.use(morgan(logs)); // request logging. dev: console | production: file
app.use(helmet()); // secure apps by setting various HTTP headers

// API
app.use("/v1", apiRoute); //Version: 1

module.exports = { app, server };
