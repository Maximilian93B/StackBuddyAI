const router = require('express').Router();
const userRoutes = require('./user-routes');
// Import the AI routes
const aiRoutes = require('./ai-routes');

// User Routes
// All requests to `/api/users` are forwarded to `userRoutes` for handling
router.use('/users', userRoutes);

// AI Routes
// All requests to `/api/ai` are forwarded to `aiRoutes` for handling
router.use('/ai', aiRoutes);

module.exports = router;