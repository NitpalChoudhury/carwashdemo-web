const Booking = require("../models/Booking");

const allowedStatuses = [
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Cancelled",
];

const getAdminBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .populate("service", "name price")
      .populate("user", "name email phone");

    return res.json(bookings);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

const updateAdminBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: `status must be one of: ${allowedStatuses.join(", ")}`,
      });
    }

    const booking = await Booking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )
      .populate("service", "name price")
      .populate("user", "name email phone");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json(booking);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update booking status." });
  }
};

const deleteAdminBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.json({ message: "Booking deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete booking." });
  }
};

module.exports = {
  getAdminBookings,
  updateAdminBookingStatus,
  deleteAdminBooking,
  allowedStatuses,
};
