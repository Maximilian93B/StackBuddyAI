const { getTechStackRecommendation } = require('../services/openaiService');

module.exports = {

    // controller to interface with OpenAI service to obtain technology stack recommendations
    async getTechStackRecommendation(req, res) {
    try {
        // Extract project description from request
        const { description } = req.body;
        
        // Obtain a recommendation from the OpenAI service
        const recommendation = await getTechStackRecommendation(description);
        
        // Send the recommendation back to the client
        res.json({ recommendation });
    } catch (error) {
        console.error(`Error fetching recommendation: ${error}`);
        res.status(500).json({ message: 'Failed to provide tech stack advice due to an internal error.' });
    }
    },
};