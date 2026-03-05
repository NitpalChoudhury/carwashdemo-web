const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const uploadVideo = require("../middleware/uploadVideo");
const {
  getVideos,
  getShortVideo,
  getLongVideo,
  updateVideos,
} = require("../controllers/videoController");

const router = express.Router();

router.get("/", getVideos);
router.get("/short", getShortVideo);
router.get("/long", getLongVideo);
router.put(
  "/",
  auth,
  admin,
  uploadVideo.fields([
    { name: "shortVideo", maxCount: 1 },
    { name: "landscapeVideo", maxCount: 1 },
  ]),
  updateVideos
);

module.exports = router;
