const express = require("express");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  getDashboard,
  getProfile,
  updateProfile,
  getBookings,
  createBooking,
  getCars,
  createCar,
  updateCar,
  deleteCar,
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  getUserReviews,
  createUserReview,
  deleteUserReview,
} = require("../controllers/userController");

const router = express.Router();

router.use(auth);

router.get("/dashboard", getDashboard);
router.get("/profile", getProfile);
router.put("/profile", upload.single("avatar"), updateProfile);

router.get("/bookings", getBookings);
router.post("/bookings", createBooking);

router.get("/cars", getCars);
router.post("/cars", createCar);
router.put("/cars/:id", updateCar);
router.delete("/cars/:id", deleteCar);

router.get("/addresses", getAddresses);
router.post("/addresses", createAddress);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

router.get("/my-reviews", getUserReviews);
router.post("/my-reviews", createUserReview);
router.delete("/my-reviews/:id", deleteUserReview);

module.exports = router;
