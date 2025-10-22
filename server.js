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

const app = express();

// Middleware
app.use(helmet());

// ✅ CORS Config
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://sweet-cupcake-1857ea.netlify.app/authpage",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or Postman
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = CORS policy: ${origin} not allowed;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight requests for all routes
app.options("*", cors());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Static Folder for Uploaded Files
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

// Test Route
app.get("/", (req, res) => res.json({ message: "✅ API Running..." }));

// Global Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

// Start Server
const PORT = process.env.PORT || 7000;
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(🚀 Server running on http://localhost:${PORT}));
};
startServer();
