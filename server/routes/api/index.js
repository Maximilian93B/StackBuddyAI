const router = require('express').Router();
const userRoutes = require('./user-routes');
const projectRoutes = require('./project-routes');
const technologyRoutes = require('./technology-routes');
// Import the AI routes
const recommendationRoutes = require('./recommendation-routes');

// User Routes: All requests to `/api/users` are forwarded to `userRoutes` for handling
router.use('/users', userRoutes);

// Project Routes: this is for test purposes as it won't be use with front-end
router.use('/project', projectRoutes);

// Technology Routes: this is for test purposes as it won't be use with front-end
router.use('/technology', technologyRoutes);

// AI Routes: Routes: this is for test purposes as it won't be use with front-end
// All requests to `/api/ai` are forwarded to `aiRoutes` for handling
router.use('/ai', recommendationRoutes);

module.exports = router;