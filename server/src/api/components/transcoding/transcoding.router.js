const transcodingController = require("./transcoding.controller");

const transcodingRouter = (router) => {
  router.get("/", transcodingController);

  return router;
};

module.exports = transcodingRouter;
