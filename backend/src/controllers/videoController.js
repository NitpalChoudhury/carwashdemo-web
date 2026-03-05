const VideoContent = require("../models/VideoContent");
const { uploadVideo } = require("../config/cloudinary");

const normalizeVideoList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }
  return [];
};

const resolveShortVideos = (videos) => {
  const list = normalizeVideoList(videos?.shortVideos);
  if (list.length) return list;
  return normalizeVideoList(videos?.shortVideo);
};

const resolveLandscapeVideos = (videos) => {
  const list = normalizeVideoList(videos?.landscapeVideos);
  if (list.length) return list;
  return normalizeVideoList(videos?.landscapeVideo);
};

const buildVideoPayload = (videos) => {
  const shortVideos = resolveShortVideos(videos);
  const landscapeVideos = resolveLandscapeVideos(videos);
  const shortVideo = shortVideos[shortVideos.length - 1] || "";
  const landscapeVideo = landscapeVideos[landscapeVideos.length - 1] || "";

  return {
    shortVideo,
    landscapeVideo,
    shortVideos,
    landscapeVideos,
  };
};

const getOrCreateVideosDoc = async () => {
  let videos = await VideoContent.findOne();
  if (!videos) {
    videos = await VideoContent.create({});
  }
  return videos;
};

const getVideos = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    return res.json(buildVideoPayload(videos));
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch videos." });
  }
};

const getShortVideo = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    const payload = buildVideoPayload(videos);
    return res.json({
      shortVideo: payload.shortVideo,
      shortVideos: payload.shortVideos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch short video." });
  }
};

const getLongVideo = async (req, res) => {
  try {
    const videos = await VideoContent.findOne().sort({ updatedAt: -1 });
    const payload = buildVideoPayload(videos);
    return res.json({
      landscapeVideo: payload.landscapeVideo,
      landscapeVideos: payload.landscapeVideos,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch long video." });
  }
};

const updateVideos = async (req, res) => {
  try {
    const shortFiles = req.files?.shortVideo || [];
    const landscapeFiles = req.files?.landscapeVideo || [];

    if (!shortFiles.length && !landscapeFiles.length) {
      return res.status(400).json({
        message: "Please upload at least one video file: shortVideo or landscapeVideo.",
      });
    }

    const videos = await getOrCreateVideosDoc();
    const shortVideos = resolveShortVideos(videos);
    const landscapeVideos = resolveLandscapeVideos(videos);

    if (shortFiles.length) {
      const shortUrls = await Promise.all(
        shortFiles.map((file) => uploadVideo(file.buffer, "short"))
      );
      shortVideos.push(...shortUrls);
    }

    if (landscapeFiles.length) {
      const landscapeUrls = await Promise.all(
        landscapeFiles.map((file) => uploadVideo(file.buffer, "landscape"))
      );
      landscapeVideos.push(...landscapeUrls);
    }

    videos.shortVideos = shortVideos;
    videos.landscapeVideos = landscapeVideos;
    videos.shortVideo = shortVideos[shortVideos.length - 1] || "";
    videos.landscapeVideo = landscapeVideos[landscapeVideos.length - 1] || "";
    await videos.save();

    return res.json({
      message: "Videos added successfully.",
      ...buildVideoPayload(videos),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update videos." });
  }
};

const deleteVideos = async (req, res) => {
  try {
    const videos = await VideoContent.findOne();
    if (!videos) {
      return res.status(404).json({ message: "Video content not found." });
    }

    videos.shortVideos = [];
    videos.landscapeVideos = [];
    videos.shortVideo = "";
    videos.landscapeVideo = "";
    await videos.save();

    return res.json({ message: "All videos deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete videos." });
  }
};

const clearVideoCollection = async (field, legacyField, label, res) => {
  try {
    const videos = await VideoContent.findOne();
    if (!videos) {
      return res.status(404).json({ message: "Video content not found." });
    }

    videos[field] = [];
    videos[legacyField] = "";
    await videos.save();

    return res.json({
      message: `${label} videos deleted successfully.`,
      ...buildVideoPayload(videos),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete videos." });
  }
};

const deleteVideoAtIndex = async (field, legacyField, label, req, res) => {
  try {
    const index = Number(req.params.index);
    if (!Number.isInteger(index) || index < 0) {
      return res.status(400).json({ message: "Invalid video index." });
    }

    const videos = await VideoContent.findOne();
    if (!videos) {
      return res.status(404).json({ message: "Video content not found." });
    }

    const list = field === "shortVideos" ? resolveShortVideos(videos) : resolveLandscapeVideos(videos);
    if (index >= list.length) {
      return res.status(404).json({ message: `${label} video not found at index ${index}.` });
    }

    list.splice(index, 1);
    videos[field] = list;
    videos[legacyField] = list[list.length - 1] || "";
    await videos.save();

    return res.json({
      message: `${label} video deleted successfully.`,
      ...buildVideoPayload(videos),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete video." });
  }
};

const deleteVideoByUrl = async (field, legacyField, label, req, res) => {
  try {
    const url = String(req.body?.url || "").trim();
    if (!url) {
      return res.status(400).json({ message: "url is required." });
    }

    const videos = await VideoContent.findOne();
    if (!videos) {
      return res.status(404).json({ message: "Video content not found." });
    }

    const list = field === "shortVideos" ? resolveShortVideos(videos) : resolveLandscapeVideos(videos);
    const index = list.indexOf(url);
    if (index === -1) {
      return res.status(404).json({ message: `${label} video not found.` });
    }

    list.splice(index, 1);
    videos[field] = list;
    videos[legacyField] = list[list.length - 1] || "";
    await videos.save();

    return res.json({
      message: `${label} video deleted successfully.`,
      ...buildVideoPayload(videos),
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete video." });
  }
};

const deleteShortVideos = async (req, res) =>
  clearVideoCollection("shortVideos", "shortVideo", "Short", res);

const deleteLongVideos = async (req, res) =>
  clearVideoCollection("landscapeVideos", "landscapeVideo", "Landscape", res);

const deleteShortVideoByIndex = async (req, res) =>
  deleteVideoAtIndex("shortVideos", "shortVideo", "Short", req, res);

const deleteLongVideoByIndex = async (req, res) =>
  deleteVideoAtIndex("landscapeVideos", "landscapeVideo", "Landscape", req, res);

const deleteShortVideoByUrl = async (req, res) =>
  deleteVideoByUrl("shortVideos", "shortVideo", "Short", req, res);

const deleteLongVideoByUrl = async (req, res) =>
  deleteVideoByUrl("landscapeVideos", "landscapeVideo", "Landscape", req, res);

module.exports = {
  getVideos,
  getShortVideo,
  getLongVideo,
  updateVideos,
  deleteVideos,
  deleteShortVideos,
  deleteLongVideos,
  deleteShortVideoByIndex,
  deleteLongVideoByIndex,
  deleteShortVideoByUrl,
  deleteLongVideoByUrl,
};
