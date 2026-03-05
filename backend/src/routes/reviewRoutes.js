const express = require("express");
const {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getReviews);
router.post("/", auth, admin, upload.single("photo"), createReview);
router.put("/:id", auth, admin, upload.single("photo"), updateReview);
router.delete("/:id", auth, admin, deleteReview);

module.exports = router;
