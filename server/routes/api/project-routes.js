const router = require('express').Router();
const {
    addProject,
    getProject,
    updateProject,
    deleteProject,
    updateUserProjects,
    deleteUserProject
} = require('../../controllers/project-controller');

// import middleware for authentication
const { authMiddleware } = require('../../utils/auth');

/*
 * Project Routes:
 * - POST `/` to create a new project
 * - GET `/:projectId` to get a specific project by ID
 * - PUT `/:projectId` to update a specific project
 * - DELETE `/:projectId` to delete a specific project
 * - PUT `/user-projects` to update user's current projects, requires authentication.
 * - DELETE `/user-projects/:projectId` to remove a project from user's list, requires authentication.
 * These routes support the core functionalities related to project handling
 * in the Tech Stack Buddy AI application.
 */

// Direct project management routes

// Create a new project
router.post('/', authMiddleware, addProject);

// Get a specific project by ID
router.get('/:projectId', authMiddleware, getProject);

// Update a specific project
router.put('/:projectId', authMiddleware, updateProject);

// Delete a specific project
router.delete('/:projectId', authMiddleware, deleteProject);

module.exports = router;