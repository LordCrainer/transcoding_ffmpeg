const router = require("express").Router();

const transcoding = require("../../components/transcoding/transcoding.router");

router.use("transcoding", transcoding(router));

module.exports = router;
