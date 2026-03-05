const VideoContent = require("../models/VideoContent");
const { uploadVideo } = require("../config/cloudinary");

const getVideos = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    if (!videos) {
      return res.json({ shortVideo: "", landscapeVideo: "" });
    }

    return res.json({
      shortVideo: videos.shortVideo || "",
      landscapeVideo: videos.landscapeVideo || "",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch videos." });
  }
};

const getShortVideo = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    return res.json({ shortVideo: videos?.shortVideo || "" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch short video." });
  }
};

const getLongVideo = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    return res.json({ landscapeVideo: videos?.landscapeVideo || "" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch long video." });
  }
};

const updateVideos = async (req, res) => {
  try {
    const shortFile = req.files?.shortVideo?.[0];
    const landscapeFile = req.files?.landscapeVideo?.[0];

    if (!shortFile && !landscapeFile) {
      return res.status(400).json({
        message: "Upload at least one video field: shortVideo or landscapeVideo.",
      });
    }

    let videos = await VideoContent.findOne();
    if (!videos) {
      videos = await VideoContent.create({});
    }

    if (shortFile) {
      videos.shortVideo = await uploadVideo(shortFile.buffer, "short");
    }

    if (landscapeFile) {
      videos.landscapeVideo = await uploadVideo(landscapeFile.buffer, "landscape");
    }

    await videos.save();

    return res.json({
      message: "Videos updated successfully.",
      shortVideo: videos.shortVideo || "",
      landscapeVideo: videos.landscapeVideo || "",
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update videos." });
  }
};

module.exports = {
  getVideos,
  getShortVideo,
  getLongVideo,
  updateVideos,
};
