// Import Technology model
const Technology = require('../models/Technologies'); // Adjust the path as needed

module.exports = {
    
    // Add a new technology
    async addTechnology(req, res) {
        try {
            const technology = await Technology.create(req.body);
            res.status(201).json(technology);
        } catch (error) {
            res.status(400).json({ message: 'Error adding technology', error: error.message });
        }
    },

    // Get all technologies
    async getAllTechnologies(req, res) {
        try {
            const technologies = await Technology.find({});
            res.json(technologies);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching technologies', error: error.message });
        }
    },

    // Get a single technology by ID
    async getTechnologyById(req, res) {
        try {
            const technology = await Technology.findById(req.params.techId);
            if (!technology) {
                return res.status(404).json({ message: 'Technology not found' });
            }
            res.json(technology);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching technology', error: error.message });
        }
    },

    // Update a technology
    async updateTechnology(req, res) {
        try {
            const technology = await Technology.findByIdAndUpdate(req.params.techId, req.body, { new: true });
            if (!technology) {
                return res.status(404).json({ message: 'Technology not found' });
            }
            res.json(technology);
        } catch (error) {
            res.status(400).json({ message: 'Error updating technology', error: error.message });
        }
    },

    // Delete a technology
    async deleteTechnology(req, res) {
        try {
            const technology = await Technology.findByIdAndDelete(req.params.techId);
            if (!technology) {
                return res.status(404).json({ message: 'Technology not found' });
            }
            res.json({ message: 'Technology deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting technology', error: error.message });
        }
    },
};