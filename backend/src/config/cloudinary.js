const { v2: cloudinary } = require("cloudinary");
const sharp = require("sharp");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (fileBuffer) => {
  if (!fileBuffer) {
    throw new Error("Image file buffer is required.");
  }

  // Auto-compress and resize before upload to reduce payload size and bandwidth.
  const optimizedBuffer = await sharp(fileBuffer)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true, fit: "inside" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "carwashdemo",
        resource_type: "image",
        format: "jpg",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.secure_url);
      }
    );

    stream.end(optimizedBuffer);
  });
};

const uploadVideo = async (fileBuffer, tag = "video") => {
  if (!fileBuffer) {
    throw new Error("Video file buffer is required.");
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "carwashdemo/videos",
        resource_type: "video",
        public_id: `${tag}-${Date.now()}`,
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer);
  });
};

module.exports = {
  cloudinary,
  uploadImage,
  uploadVideo,
};
