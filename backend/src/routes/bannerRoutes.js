const express = require("express");
const {
  getBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getBanner);
router.put("/", auth, admin, upload.single("image"), updateBanner);
router.delete("/", auth, admin, deleteBanner);

module.exports = router;
