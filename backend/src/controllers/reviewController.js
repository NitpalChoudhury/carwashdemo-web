const Review = require("../models/Review");
const { uploadImage } = require("../config/cloudinary");

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch reviews." });
  }
};

const createReview = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "title and description are required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "photo image is required." });
    }

    const photoUrl = await uploadImage(req.file.buffer);

    const review = await Review.create({
      title,
      description,
      photo: photoUrl,
    });

    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create review." });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updates = {};

    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;

    if (req.file) {
      updates.photo = await uploadImage(req.file.buffer);
    }

    const review = await Review.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json(review);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update review." });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json({ message: "Review deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete review." });
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview,
};
