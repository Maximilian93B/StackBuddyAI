// Import User model
const { User } = require('../models');
// Import sign token function from auth utilities
const { signToken } = require('../utils/auth');

module.exports = {
    
  // Create a user, sign a token, and send it back
  async createUser(req, res) {
    const { body } = req;
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something went wrong with user registration.' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  
  // Log in a user, sign a token, and send it back
  async login(req, res) {
    const { body } = req;
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user." });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Incorrect password.' });
    }

    const token = signToken(user);
    res.json({ token, user });
  },

  // Get a single user by their ID or username
  async getSingleUser(req, res) {
    const { user = null, params } = req;
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    }).populate('currentProjects');

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this ID or username.' });
    }

    res.json(foundUser);
  },
};