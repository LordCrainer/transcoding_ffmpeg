Promise = require("bluebird");
const http = require("http");
const { app, server } = require("./config/express");
const { port, host } = require("./config/vars");

server.listen(port, () => {
  console.log(
    "SERVER ON PORT:  ",
    "\x1b[36m",
    `http://${host}:${port}`,
    "\x1b[0m"
  );
});
