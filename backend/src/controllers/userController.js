const Booking = require("../models/Booking");
const Car = require("../models/Car");
const Address = require("../models/Address");
const Service = require("../models/Service");
const UserReview = require("../models/UserReview");
const User = require("../models/User");
const { uploadImage } = require("../config/cloudinary");

const getDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const [bookingsCount, carsCount, addressesCount, reviewsCount, recentBooking] =
      await Promise.all([
        Booking.countDocuments({ user: userId }),
        Car.countDocuments({ user: userId }),
        Address.countDocuments({ user: userId }),
        UserReview.countDocuments({ user: userId }),
        Booking.findOne({ user: userId })
          .sort({ createdAt: -1 })
          .populate("service", "name price"),
      ]);

    return res.json({
      stats: {
        bookings: bookingsCount,
        cars: carsCount,
        addresses: addressesCount,
        reviews: reviewsCount,
      },
      recentBooking,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to load dashboard." });
  }
};

const getProfile = async (req, res) => {
  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      avatar: req.user.avatar || "",
      phone: req.user.phone || "",
      memberSince: req.user.createdAt,
    },
  });
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const { name, phone } = req.body;
    if (name !== undefined) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (req.file) {
      user.avatar = await uploadImage(req.file.buffer);
    }

    await user.save();

    return res.json({
      message: "Profile updated.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || "",
        phone: user.phone || "",
        memberSince: user.createdAt,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update profile." });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("service", "name price");
    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

const createBooking = async (req, res) => {
  try {
    const { serviceId, fullName, phone, preferredDate, pickupAddress } = req.body;
    if (!serviceId || !fullName || !phone || !preferredDate || !pickupAddress) {
      return res.status(400).json({
        message: "serviceId, fullName, phone, preferredDate and pickupAddress are required.",
      });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    const booking = await Booking.create({
      user: req.user._id,
      service: service._id,
      fullName,
      phone,
      preferredDate,
      pickupAddress,
    });

    const populated = await Booking.findById(booking._id).populate("service", "name price");
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create booking." });
  }
};

const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(cars);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch cars." });
  }
};

const createCar = async (req, res) => {
  try {
    const { make, model, year, registrationNumber } = req.body;
    if (!make || !model || !year || !registrationNumber) {
      return res.status(400).json({ message: "make, model, year and registrationNumber are required." });
    }

    const car = await Car.create({
      user: req.user._id,
      make,
      model,
      year: Number(year),
      registrationNumber,
    });

    return res.status(201).json(car);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create car." });
  }
};

const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    const { make, model, year, registrationNumber } = req.body;
    if (make !== undefined) updates.make = make;
    if (model !== undefined) updates.model = model;
    if (year !== undefined) updates.year = Number(year);
    if (registrationNumber !== undefined) updates.registrationNumber = registrationNumber;

    const car = await Car.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    return res.json(car);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update car." });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await Car.findOneAndDelete({ _id: id, user: req.user._id });
    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    return res.json({ message: "Car deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete car." });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.json(addresses);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch addresses." });
  }
};

const createAddress = async (req, res) => {
  try {
    const { label, line1, city, state, pincode } = req.body;
    if (!label || !line1 || !city || !state || !pincode) {
      return res.status(400).json({ message: "label, line1, city, state and pincode are required." });
    }

    const address = await Address.create({
      user: req.user._id,
      label,
      line1,
      city,
      state,
      pincode,
    });

    return res.status(201).json(address);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create address." });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};
    const { label, line1, city, state, pincode } = req.body;
    if (label !== undefined) updates.label = label;
    if (line1 !== undefined) updates.line1 = line1;
    if (city !== undefined) updates.city = city;
    if (state !== undefined) updates.state = state;
    if (pincode !== undefined) updates.pincode = pincode;

    const address = await Address.findOneAndUpdate(
      { _id: id, user: req.user._id },
      updates,
      { new: true, runValidators: true }
    );
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    return res.json(address);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update address." });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOneAndDelete({ _id: id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ message: "Address not found." });
    }

    return res.json({ message: "Address deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete address." });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const reviews = await UserReview.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate("service", "name");
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch user reviews." });
  }
};

const createUserReview = async (req, res) => {
  try {
    const { serviceId, rating, comment } = req.body;
    if (!serviceId || !rating || !comment) {
      return res.status(400).json({ message: "serviceId, rating and comment are required." });
    }

    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    const review = await UserReview.create({
      user: req.user._id,
      service: service._id,
      rating: Number(rating),
      comment,
    });

    const populated = await UserReview.findById(review._id).populate("service", "name");
    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create user review." });
  }
};

const deleteUserReview = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await UserReview.findOneAndDelete({ _id: id, user: req.user._id });
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json({ message: "Review deleted." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete review." });
  }
};

module.exports = {
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
};
