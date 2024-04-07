// Import User model
const { User, Project, Technology } = require('../models');
// Import sign token function from auth utilities
const { signToken } = require('../utils/auth');

module.exports = {

  // Function to add a new project
  async addProject(req, res) {
    try {
      const { title, description, technologies } = req.body;
      const newProject = await Project.create({
        title,
        description,
        technologies,
        owner: req.user._id
      });

      // add project ID to the user's currentProjects
      await User.findByIdAndUpdate(req.user._id, { $push: { currentProjects: newProject._id } }, { new: true });

      res.status(201).json(newProject);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error creating new project", error: error.message });
    }
  },

  // Function to get a project by ID
  async getProject(req, res) {
    try {
      const project = await Project.findById(req.params.projectId).populate('owner technologies');
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching project", error: error.message });
    }
  },

  // Function to update a project
  async updateProject(req, res) {
    try {
      const updatedProject = await Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true }).populate('owner technologies');
      res.json(updatedProject);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Error updating project", error: error.message });
    }
  },

  // Function to delete a project
  async deleteProject(req, res) {
    try {
      await Project.findByIdAndRemove(req.params.projectId);
      // Optionally, remove the project from the user's currentProjects
      await User.findByIdAndUpdate(req.user._id, { $pull: { currentProjects: req.params.projectId } }, { new: true });
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting project", error: error.message });
    }
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