// Resolvers file 
const Project = require('../models/Projects');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');

const projectResolvers = {
  Query: {
    // Find all projects by owner 
    projects: async () => {
      return await Project.find({}).populate('owner');
    },
    // Find projects by Id for owner
    project: async (_, { id }) => {
      return await Project.findById(id).populate('owner');
    },
  },

  Mutation: {
    // Create a new project 
    createProject: async (_, { title, description, userQueries, techSelection, comments },context) => {
    // If user is not logged in throw auth error 
      if(!context.user) {
        throw new AuthenticationError('You must be logged in to create a project');
      }

      const newProject = new Project(id, { 
        $set: {
          title,
          description,
          userQueries,
          techSelection,
          comments,
          owner: context.user._id,
        }
      });
    
      // Save the new project 
      await newProject.save();
     
      return newProject;
    },
    // Update a projects properties 
    updateProject: async (_, { id, title, description, userQueries, techSelection, comments }, context) => {
    // If user is not logged in throw auth error 
    if(!context.user) {
      throw new AuthenticationError(' You must be logged in to update a project');
    }
      // Find project to update 
      const project = await Project.findById(id);
      // If project does not exsist
      if(!project) {
        throw new Error('Project not found')
      }
      // If not project owner 
      if (project.owner.toString() !== context.user._id) {
        throw new ForbiddenError (' Unable to update project, You are not the owner')
      }

      await Project.findByIdAndUpdate(id, {
      $set:
      title,
      description,
      userQueries,
      techSelection,
      comments,
    });
    // Fetch and populate the updated doc (project)
    return Project.findById(id).populate('owner');
    },
  },
};

module.exports = projectResolvers;