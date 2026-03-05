const multer = require("multer");
const maxUploadSizeMb = Number(process.env.MAX_UPLOAD_SIZE_MB || 20);
const maxUploadBytes = maxUploadSizeMb * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(new Error("Only image files (jpg, jpeg, png) are allowed."));
  }

  return cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxUploadBytes,
  },
});

module.exports = upload;
