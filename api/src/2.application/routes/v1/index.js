const router = require("express").Router();

const transcoding = require("../../components/transcoding/1.infrastructure/router");

router.use("transcoding", transcoding(router));

module.exports = router;
