const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAnnouncements,
  getActiveAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} = require("../controllers/announcementController");

const router = express.Router();

router.get("/", getAnnouncements);
router.get("/active", getActiveAnnouncement);
router.post("/", auth, admin, createAnnouncement);
router.put("/:id", auth, admin, updateAnnouncement);
router.delete("/:id", auth, admin, deleteAnnouncement);

module.exports = router;
