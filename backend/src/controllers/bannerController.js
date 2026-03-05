const Banner = require("../models/Banner");
const { uploadImage } = require("../config/cloudinary");

const getBanner = async (req, res) => {
  try {
    const banner = await Banner.findOne().sort({ updatedAt: -1 });
    if (!banner) {
      return res.json(null);
    }

    return res.json(banner);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch banner." });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { title, subtitle } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (subtitle !== undefined) updates.subtitle = subtitle;
    if (req.file) updates.image = await uploadImage(req.file.buffer);

    let banner = await Banner.findOne();

    if (!banner) {
      if (!updates.title || !updates.subtitle || !updates.image) {
        return res.status(400).json({
          message:
            "title, subtitle and image are required when creating banner for the first time.",
        });
      }

      banner = await Banner.create(updates);
      return res.json(banner);
    }

    Object.assign(banner, updates);
    await banner.save();

    return res.json(banner);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update banner." });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findOneAndDelete();

    if (!banner) {
      return res.status(404).json({ message: "Banner not found." });
    }

    return res.json({ message: "Banner deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete banner." });
  }
};

module.exports = {
  getBanner,
  updateBanner,
  deleteBanner,
};
