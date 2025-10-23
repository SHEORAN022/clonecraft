
// // const express = require("express");
// // const router = express.Router();
// // const multer = require("multer");
// // const path = require("path");
// // const {
// //   getTemplates,
// //   createTemplate,
// //   updateTemplate,
// //   deleteTemplate,
// // } = require("../controllers/templateController");

// // // ✅ Configure Multer Storage
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, path.join(__dirname, "../uploads")); // store inside /uploads folder
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, Date.now() + "-" + file.originalname); // avoid name collision
// //   },
// // });

// // const upload = multer({ storage });

// // // ✅ Routes
// // router.get("/", getTemplates);
// // router.post("/", upload.single("file"), createTemplate);
// // router.put("/:id", upload.single("file"), updateTemplate);
// // router.delete("/:id", deleteTemplate);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const {
//   getTemplates,
//   createTemplate,
//   updateTemplate,
//   deleteTemplate,
// } = require("../controllers/templateController");

// // Multer storage (temporary local upload)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });
// const upload = multer({ storage });

// router.get("/", getTemplates);
// router.post("/", upload.single("file"), createTemplate);
// router.put("/:id", upload.single("file"), updateTemplate);
// router.delete("/:id", deleteTemplate);

// module.exports = router;
const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

// ✅ Use memory storage for Vercel compatibility
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getTemplates);
router.post("/", upload.single("file"), createTemplate);
router.put("/:id", upload.single("file"), updateTemplate);
router.delete("/:id", deleteTemplate);

module.exports = router;

