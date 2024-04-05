// Import User model
const User = require('../models/User');
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
  
  // Update user projects by adding a new project
  async updateUserProjects(req, res) {
    const { user, body } = req;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { currentProjects: body.projectId } },
        { new: true, runValidators: true }
      ).populate('currentProjects');

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  },
  
  // Delete a project from user's currentProjects
  async deleteUserProject(req, res) {
    const { user, params } = req;
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $pull: { currentProjects: params.projectId } },
        { new: true }
      ).populate('currentProjects');

      if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this ID." });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  },
};