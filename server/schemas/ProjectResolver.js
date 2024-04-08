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
      // Create a new project with title , description and project owner
      const newProject = new Project({
        title,
        description,
        owner: context.user._id
      });
      // save New project instance 
      await newProject.save();

      // Log for debug ISSUE # 26 
      console.log('New Project with owner:', newProject);



      // Prepare the project object for the response. This includes:
      // - Converting the project document to a plain JavaScript object
      // - Ensuring getters and virtuals are applied, which might be necessary
      //   for fields that are computed or transformed when converting the document
      const projectResponseObject = {
        ...newProject.toObject({ getters: true, virtuals: true }), // Ensure getters and virtuals are applied
        id: newProject._id.toString(), // Convert the MongoDB ObjectId (_id) to a string for the ID field
        owner: {
          id: newProject.owner._id.toString(),
        username: newProject.owner.username, // Include the owner's username 
        },
      };

      // Directly transform the owner field if it's already an ObjectId
      // Check and handle if owner needs to be populated for further details
      if (newProject.owner) {
        projectResponseObject.owner = {
          id: newProject.owner.toString(), // Assuming owner is not populated and is an ObjectId
        };
      }

         // Log the final project response object to be returned
         console.log("Project response:", projectResponseObject);

      // Return the transformed project object
      return projectResponseObject;
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