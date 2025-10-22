require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// Routes
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const categoryRoutes = require("./routes/categoryRoutes");
const templateRoutes = require("./routes/templateRoutes");
const adminAuthRoutes = require("./routes/adminAuth");
const dashboardRoutes = require("./routes/dashboard");
const subscriptionsRoutes = require("./routes/subscriptions");

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ✅ CORS Config
const allowedOrigins = [
  process.env.FRONTEND_URL, 
  "http://localhost:3000"
];

app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // Postman, mobile apps
    if(allowedOrigins.indexOf(origin) === -1){
      return callback(new Error(CORS Policy: ${origin} Not Allowed), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.options("*", cors()); // Preflight

// Static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err.message);
  process.exit(1);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/templates", templateRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/subscriptions", subscriptionsRoutes);

// Test
app.get("/", (req,res) => res.json({message:"✅ API Running"}));

// Global Error
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({success:false, message:err.message || "Something went wrong"});
});

// Start
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(🚀 Server running on port ${PORT}));
