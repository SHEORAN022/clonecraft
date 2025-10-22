// // server.js
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const path = require("path");

// // Import Routes
// const categoryRoutes = require("./routes/categoryRoutes");
// const templateRoutes = require("./routes/templateRoutes");
// const usersRoutes = require("./routes/users");
// const authRoutes = require("./routes/auth");
// const adminAuthRoutes = require("./routes/adminAuth");
// const dashboardRoutes = require("./routes/dashboard");
// const subscriptionsRoutes = require("./routes/subscriptions");

// // Initialize app
// const app = express();
 
// // Middleware
// app.use(helmet());
// app.use(
//   cors({
//     origin:
//       process.env.FRONTEND_URL ||
//       "https://craft-clone-frontend-qoix.vercel.app",
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// // Static folder for uploads
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose.set("strictQuery", false);
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB Connected");
//   } catch (err) {
//     console.error("❌ DB Connection Error:", err.message);
//     process.exit(1);
//   }
// };

// // Routes
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/users", usersRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/templates", templateRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/subscriptions", subscriptionsRoutes);

// // Test route
// app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error("❌ Server Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong",
//     error: err.message,
//   });
// });

// // For local development
// if (process.env.NODE_ENV !== "production") {
//   const PORT = process.env.PORT || 7000;
//   connectDB().then(() =>
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on http://localhost:${PORT}`)
//     )
//   );
// }

// // For Vercel deployment (serverless)
// module.exports = app;
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Import Routes
const categoryRoutes = require("./routes/categoryRoutes");
const templateRoutes = require("./routes/templateRoutes");
const usersRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const adminAuthRoutes = require("./routes/adminAuth");
const dashboardRoutes = require("./routes/dashboard");
const subscriptionsRoutes = require("./routes/subscriptions");

// Initialize app
const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Logger in development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS configuration
const allowedOrigin = process.env.FRONTEND_URL || "https://craft-clone-frontend-qoix.vercel.app";
app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true,
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

// Static folder for uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
    process.exit(1);
  }
};

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);

// Test route
app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong",
    error: err.message,
  });
});

// Start server
const PORT = process.env.PORT || 7000;

if (process.env.NODE_ENV !== "production") {
  // Local dev
  connectDB().then(() =>
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    )
  );
} else {
  // For serverless deployment like Vercel
  connectDB();
  module.exports = app;
}
