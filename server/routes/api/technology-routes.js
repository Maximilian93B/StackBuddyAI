const router = require('express').Router();
const { authMiddleware } = require('../../utils/auth');
const {
  addTechnology,
  getAllTechnologies,
  getTechnologyById,
  updateTechnology,
  deleteTechnology,
} = require('../../controllers/technology-controller');

/*
 * Technology Routes:
 * - POST `/` to add a new technology
 * - GET `/` to get all technologies
 * - GET `/:techId` to get a single technology by ID
 * - PUT `/:techId` to update a technology
 * - DELETE `/:techId` to delete a technology
 * These routes support the core functionalities related to user account management and
 * authenticationin the Tech Stack Buddy AI application.
 */

// Route to add a new technology
router.post('/', authMiddleware, addTechnology);

// Route to get all technologies
router.get('/', authMiddleware, getAllTechnologies);

// Route to get a single technology by ID
router.get('/:techId', authMiddleware, getTechnologyById);

// Route to update a technology
router.put('/:techId', authMiddleware, updateTechnology);

// Route to delete a technology
router.delete('/:techId', authMiddleware, deleteTechnology);

module.exports = router;