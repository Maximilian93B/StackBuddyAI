const router = require('express').Router();
const {
    addProject,
    getProject,
    updateProject,
    deleteProject
} = require('../../controllers/user-controller');

const {
    updateUserProjects,
    deleteUserProjectFromUser
} = require('../../controllers/user-controller');

// import middleware for authentication
const { authMiddleware } = require('../../utils/auth');

/*
 * Project Routes:
 * - PUT `/projects` to update user's current projects, requires authentication.
 * - DELETE `/projects/:projectId` to remove a project from user's list, requires authentication.
 * These routes support the core functionalities related to user account management,
 * authentication, and project handling in the Tech Stack Buddy AI application.
 */
// Route to update (add to) user's projects
router.route('/projects').put(authMiddleware, updateUserProjects);

// Route to delete a specific project from the user's account
router.route('/projects/:projectId').delete(authMiddleware, deleteUserProject);

// Direct project management routes
router.post('/', authMiddleware, addProject); // Create a new project
router.get('/:projectId', authMiddleware, getProject); // Get a specific project by ID
router.put('/:projectId', authMiddleware, updateProject); // Update a specific project
router.delete('/:projectId', authMiddleware, deleteProject); // Delete a specific project

// User-project association management routes
router.put('/user-projects', authMiddleware, updateUserProjects); // Add a project to user's list
router.delete('/user-projects/:projectId', authMiddleware, deleteUserProjectFromUser); // Remove a project from user's list


module.exports = router;