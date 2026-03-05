const multer = require("multer");

const maxVideoSizeMb = Number(process.env.MAX_VIDEO_SIZE_MB || 50);
const maxVideoBytes = maxVideoSizeMb * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["video/mp4", "video/quicktime", "video/webm"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only video files (mp4, mov, webm) are allowed."));
  }

  return cb(null, true);
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxVideoBytes,
  },
});

module.exports = uploadVideo;
