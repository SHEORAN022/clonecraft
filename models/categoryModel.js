

// const mongoose = require("mongoose");

// const CategorySchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
//     filePath: { type: String }, // for image/video file URL
//     status: { type: String, enum: ["active", "inactive"], default: "active" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Category", CategorySchema);
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  orientation: { type: String, enum: ["portrait", "landscape"], default: "portrait" },
  filePath: { type: String, default: null }, // Cloudinary URL
  status: { type: String, enum: ["active", "inactive"], default: "active" },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
