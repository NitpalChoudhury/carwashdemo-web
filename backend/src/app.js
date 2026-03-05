const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const userRoutes = require("./routes/userRoutes");
const videoRoutes = require("./routes/videoRoutes");
const announcementRoutes = require("./routes/announcementRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminBookingRoutes = require("./routes/adminBookingRoutes");

const app = express();
const allowedOrigins = (process.env.CORS_ORIGIN || "*")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.includes("*") ||
      allowedOrigins.includes(origin) ||
      ["http://localhost:5173", "http://localhost:3000"].includes(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/reviews", reviewRoutes);
app.use("/services", serviceRoutes);
app.use("/banner", bannerRoutes);
app.use("/user", userRoutes);
app.use("/videos", videoRoutes);
app.use("/announcements", announcementRoutes);
app.use("/contacts", contactRoutes);
app.use("/admin/bookings", adminBookingRoutes);

app.use((err, req, res, next) => {
  const maxUploadSizeMb = Number(process.env.MAX_UPLOAD_SIZE_MB || 20);

  if (err && err.message && err.message.includes("Only image files")) {
    return res.status(400).json({ message: err.message });
  }
  if (err && err.message && err.message.includes("Only video files")) {
    return res.status(400).json({ message: err.message });
  }

  if (err && err.name === "MulterError") {
    const maxVideoSizeMb = Number(process.env.MAX_VIDEO_SIZE_MB || 50);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: `File too large. Max allowed image size is ${maxUploadSizeMb}MB and max video size is ${maxVideoSizeMb}MB.`,
      });
    }
    return res.status(400).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error." });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found." });
});

module.exports = app;
