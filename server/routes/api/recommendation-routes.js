const router = require('express').Router();
const { getTechStackRecommendation } = require('../../controllers/recommendation-controller.js');

// Route to get tech stack recommendations
router.route('/recommendations').post(getTechStackRecommendation);

module.exports = router;