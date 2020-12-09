const transcodingController = require("./transcoding.controller");

const transcodingRouter = (router) => {
  router.post("/", transcodingController.transcodingToMedia);
  router.post("/", transcodingController.transcodingMedia);

  return router;
};

module.exports = transcodingRouter;
