Promise = require("bluebird");
const http = require("http");
const { app, server } = require("./config/express");
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(
    "SERVER ON PORT:  ",
    "\x1b[36m",
    `http://localhost:${port}`,
    "\x1b[0m"
  );
});
