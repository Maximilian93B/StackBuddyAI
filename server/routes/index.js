const router = require('express').Router();
const path = require('path');
const apiRoutes = require('./api');

// API Routes
router.use('/api', apiRoutes);

// serve up react front-end in production
router.use((req, res) => {
    if (process.env.NODE_ENV === "production") {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
      } else {
        res.status(200).json({ message: "API is working" });
      }
});

module.exports = router;