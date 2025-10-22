const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Template = require("../models/templateModel"); // Agar template schema hai

// GET /api/dashboard
router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalTemplates = await Template.countDocuments();

    const downloadsAgg = await Template.aggregate([
      { $group: { _id: null, totalDownloads: { $sum: "$downloads" } } }
    ]);

    const viewsAgg = await Template.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } }
    ]);

    const recentTemplates = await Template.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title type downloads views");

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalTemplates,
          totalDownloads: downloadsAgg[0]?.totalDownloads || 0,
          totalViews: viewsAgg[0]?.totalViews || 0
        },
        recentTemplates
      }
    });
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
