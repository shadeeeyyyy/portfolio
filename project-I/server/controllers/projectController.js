// backend/controllers/projectController.js
const Project = require("../models/Project"); // Import the Project Mongoose model

// GET all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ dateCompleted: -1 }); // Sort by most recent
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST create a new project
exports.createProject = async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    projectUrl,
    githubUrl,
    technologies,
    category,
  } = req.body;

  // Basic validation
  if (!title || !description || !imageUrl) {
    return res.status(400).json({
      message: "Please provide title, description, and image URL.",
    });
  }

  const newProject = new Project({
    title,
    description,
    imageUrl,
    projectUrl,
    githubUrl,
    technologies,
    category,
  });

  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject); // 201 Created
  } catch (error) {
    res.status(400).json({ message: error.message }); // Bad request
  }
};

// PUT update an existing project
exports.updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validation
      }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE a project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
