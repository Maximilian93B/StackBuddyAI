const router = require('express').Router();
const {
  createUser,
  login,
  getSingleUser,
  updateUserProjects,
  deleteUserProject,
} = require('../../controllers/user-controller');

// import middleware for authentication
const { authMiddleware } = require('../../utils/auth');

/*
 * User Routes:
 * - POST `/` to create a new user (sign up).
 * - POST `/login` for user login, returning a JWT for authenticated sessions.
 * - GET `/me` to retrieve the logged-in user's profile, leveraging the `authMiddleware` for authentication.
 * - PUT `/projects` to update user's current projects, requires authentication.
 * - DELETE `/projects/:projectId` to remove a project from user's list, requires authentication.
 * These routes support the core functionalities related to user account management,
 * authentication, and project handling in the Tech Stack Buddy AI application.
 */

// Route to sign up a new user
router.route('/').post(createUser);

// Route for user login
router.route('/login').post(login);

// Route to get the current authenticated user's details
router.route('/me').get(authMiddleware, getSingleUser);

// Route to update (add to) user's projects
router.route('/projects').put(authMiddleware, updateUserProjects);

// Route to delete a specific project from the user's account
router.route('/projects/:projectId').delete(authMiddleware, deleteUserProject);

module.exports = router;