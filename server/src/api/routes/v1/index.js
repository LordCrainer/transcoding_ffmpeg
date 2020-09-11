const router = require("express").Router();

const transcoding = require("../../components/transcoding/transcoding.router");

router.use("transcoding", transcoding);

module.exports = router;
