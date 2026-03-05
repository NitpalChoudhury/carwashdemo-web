const express = require("express");
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const router = express.Router();
const serviceImageUpload = upload.fields([
  { name: "images", maxCount: 8 },
  { name: "image", maxCount: 1 },
]);

router.get("/", getServices);
router.get("/:id", getServiceById);
router.post("/", auth, admin, serviceImageUpload, createService);
router.put("/:id", auth, admin, serviceImageUpload, updateService);
router.delete("/:id", auth, admin, deleteService);

module.exports = router;
