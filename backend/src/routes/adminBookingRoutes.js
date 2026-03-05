const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const {
  getAdminBookings,
  updateAdminBookingStatus,
  deleteAdminBooking,
} = require("../controllers/adminBookingController");

const router = express.Router();

router.use(auth, admin);

router.get("/", getAdminBookings);
router.patch("/:id/status", updateAdminBookingStatus);
router.delete("/:id", deleteAdminBooking);

module.exports = router;
