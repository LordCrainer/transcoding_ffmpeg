const router = require("express").Router();

const transcoding = require("../../components/transcoding/Infrastructure/router");

router.use("transcoding", transcoding(router));

module.exports = router;
