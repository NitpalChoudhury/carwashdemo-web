const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    make: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
