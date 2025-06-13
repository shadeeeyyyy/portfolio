// backend/index.js
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors

// Import routes
const projectRoutes = require("./routes/projectRoutes");
/* const skillRoutes = require("./routes/skillRoutes"); */
// const authRoutes = require('./routes/authRoutes'); // Will be added in Step 13

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Allows us to parse JSON bodies from incoming requests

// Use routes
app.use("/api/projects", projectRoutes);
/* app.use('/api/skills', skillRoutes); */
// app.use('/api/auth', authRoutes); // Add auth routes later

app.get("/", (req, res) => {
  res.send("Portfolio CMS Backend is running!");
});

// Database Connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
    // Start the server only after successful database connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });
