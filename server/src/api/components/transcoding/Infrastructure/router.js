const transcodingController = require("./transcoding.controller");

const transcodingRouter = (router) => {
  router.get("/", transcodingController.transcodingToMedia);

  return router;
};

module.exports = transcodingRouter;
