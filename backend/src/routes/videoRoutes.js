const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const uploadVideo = require("../middleware/uploadVideo");
const {
  getVideos,
  getShortVideo,
  getLongVideo,
  updateVideos,
  deleteVideos,
  deleteShortVideos,
  deleteLongVideos,
  deleteShortVideoByIndex,
  deleteLongVideoByIndex,
  deleteShortVideoByUrl,
  deleteLongVideoByUrl,
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
    { name: "shortVideo", maxCount: 10 },
    { name: "landscapeVideo", maxCount: 10 },
  ]),
  updateVideos
);
router.delete("/", auth, admin, deleteVideos);
router.delete("/short", auth, admin, deleteShortVideos);
router.delete("/long", auth, admin, deleteLongVideos);
router.delete("/short/item", auth, admin, deleteShortVideoByUrl);
router.delete("/long/item", auth, admin, deleteLongVideoByUrl);
router.delete("/short/:index", auth, admin, deleteShortVideoByIndex);
router.delete("/long/:index", auth, admin, deleteLongVideoByIndex);

module.exports = router;
