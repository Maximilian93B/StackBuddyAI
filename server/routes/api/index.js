const router = require('express').Router();
const userRoutes = require('./user-routes');

// User Routes
// All requests to `/api/users` are forwarded to `userRoutes` for handling
router.use('/users', userRoutes);

module.exports = router;