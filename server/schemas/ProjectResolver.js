// Resolvers file 
const Project = require('../models/Projects');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { getTechStackRecommendation } = require('../services/openaiService');

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
    createProject: async (_, { title, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a project');
      }
    
      try {
        const newProject = new Project({
          title,
          description,
          owner: context.user._id,
        });
    
        await newProject.save();
        await newProject.populate('owner');
    
        const projectResponseObject = {
          ...newProject.toObject({ getters: true, virtuals: true }), // This ensures virtuals are applied
          id: newProject._id.toString(), // Convert _id to string
          owner: {
            id: newProject.owner._id.toString(), // Convert owner's _id to string
            username: newProject.owner.username, // Assuming owner is populated and has a username field
            // Add other owner fields as needed
          },
        };
    
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
        // wait for project to be found 
        // update 
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
        // Log error updating project
        console.error('Error updating project:', error);
        // tell the user about it ! 
        throw new Error('Failed to update project. Please try again.');
      }
    },
    getTechStackRecommendation: async (_, { projectDescription }) => {
      // Use the OpenAI service to get a recommendation
      const recommendation = await getTechStackRecommendation(projectDescription);
      return { recommendation };
    },
  },
};

module.exports = projectResolvers;



    /*
    // Create a new project 
    // We only need the user to pass the title and description to create a new project
    // They will add the Tech stack after discussing with StackBuddy  --> use UPDATE_PROJECT mutation!.
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
  
      await newProject.save(); 
      // Log for debug ISSUE # 26 
      console.log('New Project with owner:', newProject);

      // Prepare the project object for the response. This includes:
      // Converting the project document to a plain vanilla object
      // Ensuring getters and virtuals are applied, which might be necessary
      //  for fields that are computed or transformed when converting the document
      const projectResponseObject = {
        ...newProject.toObject({ getters: true, virtuals: true }), 
        id: newProject._id.toString(), // Convert the MongoDB ObjectId (_id) to a string // ISSUE # 26 Solution 
        owner: {
          id: newProject.owner._id.toString(),
          username: newProject.owner.username, // Include the owner's username 
        },
      };
    
      //---- This solution is a work around for now ---- // 
      // Directly transform the owners field if it's already an ObjectId
      // Check and handle if owner needs to be populated for further details
      if (newProject.owner) {
        projectResponseObject.owner = {
          id: newProject.owner.toString(), // Assuming owner is not populated and is an ObjectId
        };
      }
         // Debugging 
         console.log("Project response:", projectResponseObject);
         console.log('Populated Owner:', newProject.owner);

      // Return the transformed project object
      return projectResponseObject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw new Error('Failed to create project. Please try again.');
    }
  },
  */