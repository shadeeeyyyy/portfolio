// backend/routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
// const authMiddleware = require('../middleware/authMiddleware'); // Will be added in Step 13

// Public routes (no authentication needed to view projects)
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);

// Protected routes (require authentication for CRUD operations)
// router.post('/', authMiddleware, projectController.createProject); // Add authMiddleware later
// router.put('/:id', authMiddleware, projectController.updateProject);
// router.delete('/:id', authMiddleware, projectController.deleteProject);

// For now, let's make them unprotected for testing purposes.
router.post("/", projectController.createProject);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
