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
    // We only need the user to pass the title and description to create a new project
    // They will add the Tech stack after discussing with StackBuddy 
    createProject: async (_, { title, description,},context) => {
    // If user is not logged in throw auth error 
      if(!context.user) {
        throw new AuthenticationError('You must be logged in to create a project');
      }

      try {
      // Create a new project with onle the title and description+ owner is required 
          const newProject = new Project({ 
              title,
              description,
              owner: context.user._id,
            });
            // Save the new project and return 
            await newProject.save();
            return {
              ...newProject.toObject(),
              id: newProject._id.toString(),
              // Add owner to the return // This will become tidious -- > Change shcmeas in models ??
              owner: {
                ...newProject.owner.toObject(),
                id: newProject.owner._id.toString(), // Ensure the owner's ID is a string
            },
            };
      // Catch errors
            } catch (error) {
              console.error("Error creating project:", error);
              throw new Error('Failed to create project. Please try again.');
            }
          },

    // Update a projects properties 
    updateProject: async (_, { id, title, description, userQueries, techSelection, comments }, context) => {
      // If user is not logged in, throw auth error
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a project');
      }
    
      try {
        // Find the project to update
        const project = await Project.findById(id);
        // If the project does not exist
        if (!project) {
          throw new Error('Unable to locate Project with that ID');
        }
        // If not the project owner
        if (project.owner.toString() !== context.user._id) {
          throw new ForbiddenError('Unable to update project, You must be the owner of a project to make changes to it.');
        }
    
        // Perform the update
        await Project.findByIdAndUpdate(id, {
          $set: {
            ...(title && { title }),
            ...(description && { description }),
            ...(userQueries && { userQueries }),
            ...(techSelection && { techSelection }),
            ...(comments && { comments }),
          }
        });
    
        // Fetch and return the updated document
        return Project.findById(id).populate('owner');
      } catch (error) {
        console.error('Error updating project:', error);
        throw new Error('Failed to update project. Please try again.');
      }
    },
  },
};

module.exports = projectResolvers;