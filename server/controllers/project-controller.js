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
      // delete project by ID
      const deletedProject = await Project.findByIdAndDelete(req.params.projectId);
      if (!deletedProject) {
        return res.status(404).json({ message: "No project found with this ID!" });
      }

      // remove project from user's currentProjects
      await User.findByIdAndUpdate(
        deletedProject.owner,
        { $pull: { currentProjects: deletedProject._id } },
        { new: true }
      );

      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting project", error: error.message });
    }
  },

};