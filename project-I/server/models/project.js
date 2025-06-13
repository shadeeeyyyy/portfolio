// backend/models/Project.js
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Remove whitespace from both ends of a string
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    projectUrl: {
      // Link to live project (optional)
      type: String,
      trim: true,
    },
    githubUrl: {
      // Link to GitHub repo (optional)
      type: String,
      trim: true,
    },
    technologies: [
      // Array of strings for technologies used
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      // e.g., 'Web Development', 'Mobile App', 'UI/UX'
      type: String,
      trim: true,
    },
    dateCompleted: {
      type: Date,
      default: Date.now,
    },
    // Add any other fields relevant to your projects
  },
  { timestamps: true }
); // Mongoose adds createdAt and updatedAt fields automatically

module.exports = mongoose.model("Project", projectSchema);
