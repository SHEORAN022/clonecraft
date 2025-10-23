

// // const Template = require("../models/templateModel");
// // const Category = require("../models/categoryModel");

// // // GET all templates
// // const getTemplates = async (req, res) => {
// //   try {
// //     const templates = await Template.find().populate("category");
// //     res.json({ success: true, templates });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // CREATE a new template
// // const createTemplate = async (req, res) => {
// //   try {
// //     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

// //     if (!title || !type || !category) {
// //       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
// //     }

// //     const file = req.file ? `http://localhost:7000/uploads/${req.file.filename}` : null;

// //     const template = await Template.create({
// //       title,
// //       type,
// //       status: status || "active",
// //       category,
// //       profilePosition: profilePosition || "center",
// //       transitionType: transitionType || "fade",
// //       orientation: orientation || "landscape",
// //       file,
// //     });

// //     const populated = await template.populate("category");
// //     res.json({ success: true, template: populated });
// //   } catch (err) {
// //     console.error("❌ Add Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // UPDATE a template
// // const updateTemplate = async (req, res) => {
// //   try {
// //     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

// //     if (!title || !type || !category) {
// //       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
// //     }

// //     const file = req.file ? `http://localhost:7000/uploads/${req.file.filename}` : undefined;

// //     const updated = await Template.findByIdAndUpdate(
// //       req.params.id,
// //       {
// //         title,
// //         type,
// //         status: status || "active",
// //         category,
// //         profilePosition: profilePosition || "center",
// //         transitionType: transitionType || "fade",
// //         orientation: orientation || "landscape",
// //         ...(file && { file }),
// //       },
// //       { new: true, runValidators: true }
// //     ).populate("category");

// //     if (!updated) {
// //       return res.status(404).json({ success: false, message: "Template not found" });
// //     }

// //     res.json({ success: true, template: updated });
// //   } catch (err) {
// //     console.error("❌ Update Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // // DELETE a template
// // const deleteTemplate = async (req, res) => {
// //   try {
// //     const deleted = await Template.findByIdAndDelete(req.params.id);
// //     if (!deleted) {
// //       return res.status(404).json({ success: false, message: "Template not found" });
// //     }
// //     res.json({ success: true, message: "Template deleted" });
// //   } catch (err) {
// //     console.error("❌ Delete Template Error:", err);
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // };

// // module.exports = {
// //   getTemplates,
// //   createTemplate,
// //   updateTemplate,
// //   deleteTemplate,
// // };
// const Template = require("../models/templateModel");
// const cloudinary = require("../config/cloudinary");

// // GET all templates
// exports.getTemplates = async (req, res) => {
//   try {
//     const templates = await Template.find().populate("category");
//     res.json({ success: true, templates });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // CREATE a template
// exports.createTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || !category) {
//       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: type === "video" ? "video" : "image",
//         folder: "templates",
//       });
//       fileUrl = result.secure_url;
//     }

//     const template = await Template.create({
//       title,
//       type,
//       status: status || "active",
//       category,
//       profilePosition: profilePosition || "center",
//       transitionType: transitionType || "fade",
//       orientation: orientation || "landscape",
//       file: fileUrl,
//     });

//     const populated = await template.populate("category");
//     res.json({ success: true, template: populated });
//   } catch (err) {
//     console.error("❌ Add Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // UPDATE template
// exports.updateTemplate = async (req, res) => {
//   try {
//     const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

//     if (!title || !type || !category) {
//       return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
//     }

//     let fileUrl;
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         resource_type: type === "video" ? "video" : "image",
//         folder: "templates",
//       });
//       fileUrl = result.secure_url;
//     }

//     const updated = await Template.findByIdAndUpdate(
//       req.params.id,
//       { title, type, status, category, profilePosition, transitionType, orientation, ...(fileUrl && { file: fileUrl }) },
//       { new: true, runValidators: true }
//     ).populate("category");

//     if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

//     res.json({ success: true, template: updated });
//   } catch (err) {
//     console.error("❌ Update Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // DELETE template
// exports.deleteTemplate = async (req, res) => {
//   try {
//     const deleted = await Template.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
//     res.json({ success: true, message: "Template deleted" });
//   } catch (err) {
//     console.error("❌ Delete Template Error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

const Template = require("../models/templateModel");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

// Function for Cloudinary stream upload (no local file needed)
const streamUpload = (buffer, type) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: type === "video" ? "video" : "image", folder: "templates" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ✅ GET all templates
exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find().populate("category");
    res.json({ success: true, templates });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ CREATE a template (Cloudinary upload via buffer)
exports.createTemplate = async (req, res) => {
  try {
    const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

    if (!title || !type || !category) {
      return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
    }

    let fileUrl;
    if (req.file) {
      const result = await streamUpload(req.file.buffer, type);
      fileUrl = result.secure_url;
    }

    const template = await Template.create({
      title,
      type,
      status: status || "active",
      category,
      profilePosition: profilePosition || "center",
      transitionType: transitionType || "fade",
      orientation: orientation || "landscape",
      file: fileUrl,
    });

    const populated = await template.populate("category");
    res.json({ success: true, template: populated });
  } catch (err) {
    console.error("❌ Add Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE a template
exports.updateTemplate = async (req, res) => {
  try {
    const { title, type, status, category, profilePosition, transitionType, orientation } = req.body;

    if (!title || !type || !category) {
      return res.status(400).json({ success: false, message: "Title, Type and Category are required" });
    }

    let fileUrl;
    if (req.file) {
      const result = await streamUpload(req.file.buffer, type);
      fileUrl = result.secure_url;
    }

    const updated = await Template.findByIdAndUpdate(
      req.params.id,
      { title, type, status, category, profilePosition, transitionType, orientation, ...(fileUrl && { file: fileUrl }) },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updated) return res.status(404).json({ success: false, message: "Template not found" });

    res.json({ success: true, template: updated });
  } catch (err) {
    console.error("❌ Update Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ DELETE a template
exports.deleteTemplate = async (req, res) => {
  try {
    const deleted = await Template.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Template not found" });
    res.json({ success: true, message: "Template deleted" });
  } catch (err) {
    console.error("❌ Delete Template Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
