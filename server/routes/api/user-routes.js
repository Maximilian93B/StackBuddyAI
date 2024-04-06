const router = require('express').Router();
const {
  createUser,
  login,
  getSingleUser,
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
 * These routes support the core functionalities related to user account management and
 * authenticationin the Tech Stack Buddy AI application.
 */

// Route to sign up a new user
router.route('/').post(createUser);

// Route for user login
router.route('/login').post(login);

// Route to get the current authenticated user's details
router.route('/me').get(authMiddleware, getSingleUser);

module.exports = router;