const Announcement = require("../models/Announcement");

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
  }
  return undefined;
};

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    return res.json(announcements);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch announcements." });
  }
};

const getActiveAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findOne({ isActive: true }).sort({
      updatedAt: -1,
    });

    if (!announcement) {
      return res.json(null);
    }

    return res.json(announcement);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch active announcement." });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { message, isActive } = req.body;

    if (!message) {
      return res.status(400).json({ message: "message is required." });
    }

    const normalizedIsActive = parseBoolean(isActive);
    const announcement = await Announcement.create({
      message,
      isActive: normalizedIsActive !== undefined ? normalizedIsActive : true,
    });

    return res.status(201).json(announcement);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create announcement." });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, isActive } = req.body;
    const updates = {};

    if (message !== undefined) updates.message = message;
    const normalizedIsActive = parseBoolean(isActive);
    if (normalizedIsActive !== undefined) updates.isActive = normalizedIsActive;

    const announcement = await Announcement.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    return res.json(announcement);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update announcement." });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const announcement = await Announcement.findByIdAndDelete(id);

    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found." });
    }

    return res.json({ message: "Announcement deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete announcement." });
  }
};

module.exports = {
  getAnnouncements,
  getActiveAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
};
