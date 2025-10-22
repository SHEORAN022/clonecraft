
// const Category = require("../models/categoryModel");
// const path = require("path");

// // ✅ Get all categories
// exports.getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find();
//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Create new category
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : null;

//     const category = await Category.create({ name, orientation, filePath });
//     res.json(category);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Update category
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, orientation } = req.body;
//     const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

//     const updateData = { name, orientation };
//     if (filePath) updateData.filePath = filePath;

//     const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
//     if (!updated) return res.status(404).json({ message: "Category not found" });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Delete category
// exports.deleteCategory = async (req, res) => {
//   try {
//     const deleted = await Category.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const Category = require("../models/categoryModel");
const path = require("path");

// ✅ Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Create new category (image only)
exports.createCategory = async (req, res) => {
  try {
    const { name, orientation } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    const category = await Category.create({
      name,
      orientation,
      filePath,
    });

    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, orientation } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, orientation };
    if (filePath) updateData.filePath = filePath;

    const updated = await Category.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Delete category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
