const mongoose = require("mongoose");

const videoContentSchema = new mongoose.Schema(
  {
    shortVideo: {
      type: String,
      default: "",
      trim: true,
    },
    landscapeVideo: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VideoContent", videoContentSchema);
