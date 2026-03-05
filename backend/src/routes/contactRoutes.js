const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  createContactMessage,
  getContactMessages,
  markContactMessageAsRead,
  deleteContactMessage,
} = require("../controllers/contactController");

const router = express.Router();

router.post("/", createContactMessage);
router.get("/", auth, admin, getContactMessages);
router.patch("/:id/read", auth, admin, markContactMessageAsRead);
router.delete("/:id", auth, admin, deleteContactMessage);

module.exports = router;
