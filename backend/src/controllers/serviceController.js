const Service = require("../models/Service");
const { uploadImage } = require("../config/cloudinary");

const extractServiceFiles = (req) => {
  const filesFromArray = Array.isArray(req.files) ? req.files : [];
  const filesFromFields = req.files && req.files.images ? req.files.images : [];
  const singleFile = req.file ? [req.file] : [];
  const legacySingle = req.files && req.files.image ? req.files.image : [];

  return [...filesFromArray, ...filesFromFields, ...singleFile, ...legacySingle].filter(
    Boolean
  );
};

const normalizeFeatures = (features) => {
  if (Array.isArray(features)) {
    return features.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof features === "string") {
    return features
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    return res.json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services." });
  }
};

const getServiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json(service);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch service." });
  }
};

const createService = async (req, res) => {
  try {
    const { name, category, description, price, features } = req.body;

    if (!name || !description || price === undefined) {
      return res
        .status(400)
        .json({ message: "name, description and price are required." });
    }

    const uploadedFiles = extractServiceFiles(req);
    if (!uploadedFiles.length) {
      return res.status(400).json({ message: "At least one service image is required." });
    }

    const imageUrls = await Promise.all(
      uploadedFiles.map((file) => uploadImage(file.buffer))
    );
    const service = await Service.create({
      name,
      category: category ? String(category).trim() : "Other Services",
      description,
      price: Number(price),
      image: imageUrls[0],
      images: imageUrls,
      features: normalizeFeatures(features),
    });

    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create service." });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, features } = req.body;
    const updates = {};

    if (name !== undefined) updates.name = name;
    if (category !== undefined) updates.category = String(category).trim() || "Other Services";
    if (description !== undefined) updates.description = description;
    if (price !== undefined) updates.price = Number(price);
    if (features !== undefined) updates.features = normalizeFeatures(features);
    const uploadedFiles = extractServiceFiles(req);
    if (uploadedFiles.length) {
      const imageUrls = await Promise.all(
        uploadedFiles.map((file) => uploadImage(file.buffer))
      );
      updates.image = imageUrls[0];
      updates.images = imageUrls;
    }

    const service = await Service.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json(service);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update service." });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    return res.json({ message: "Service deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete service." });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
