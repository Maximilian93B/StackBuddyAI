// Resolvers file 
const Project = require('../models/Projects');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');
const { getTechStackRecommendation } = require('../services/openaiService');
const User = require('../models/Users');


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
    createProject: async (_, { title, description, userQueries, techSelection, comments, notes }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to create a project');
      }

      // Create the new project object
      const newProjectData = {
        title,
        description,
        userQueries,
        techSelection,
        comments,
        owner: context.user._id,
      };

      // If 'notes' is provided, add it to the new project data
      if (notes) {
        newProjectData.notes = notes.map(note => ({
          content: note.content,
          dateAdded: note.dateAdded || new Date(),
        }));
      }
    
      try {
        const newProject = new Project({
          title,
          description,
          userQueries,
          techSelection,
          comments,
          owner: context.user._id,
        });

        // If 'notes' is provided, add it to the new project data
        if (notes) {
          newProjectData.notes = notes.map(note => ({
            content: note.content,
            dateAdded: note.dateAdded || new Date(),
          }));
        }
    
        await newProject.save();
       
    
        // Update user document to include the new project in currentProjects
        await User.findByIdAndUpdate(context.user._id, {
          $push: { currentProjects: newProject._id }
        });
        // repopulate owner to include updated currentProjects
        await newProject.populate('owner');

        // Response 
        const projectResponse = {
          ...newProject.toObject({ getters: true, virtuals: true }), // This ensures virtuals are applied
          id: newProject._id.toString(), // Convert _id to string
          owner: {
            id: newProject.owner._id.toString(), // Convert owner's _id to string
            username: newProject.owner.username, // Assuming owner is populated and has a username field
            // Add other owner fields as needed
          },
        };
        
        // Return response =  project Object
        return projectResponse;
      } catch (error) {
        console.error("Error creating project:", error);
        throw new Error('Failed to create project. Please try again.');
      }
    },
  
    // Update a projects properties
    // updateProject: async (_, {id, title, description, addUserQueries, removeUserQueryIds, addTechSelection, removeTechSelectionId, addComments, removeCommentIds, notes }, context) => {
      updateProject: async (_, { id, title, description, userQueries, techSelection, comments, notes }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You must be logged in to update a project');
      }
      try {
        // Find the project to update and check user has the right to update it
        const project = await Project.findById(id);
        // If the project does not exist
        if (!project) {
          throw new Error('Unable to locate Project with that ID');
        }
        // If not the project owner
        if (project.owner._id.toString() !== context.user._id.toString()) {
          throw new ForbiddenError('Unable to update project, You must be the owner of a project to make changes to it.');
        }
    
        // Initialize update object
        const updateObj = {};

        if (title) updateObj.title = title;
        if (description) updateObj.description = description;
        if (notes) updateObj.notes = notes.map(note => ({
          content: note.content,
          dateAdded: note.dateAdded || new Date()
        }));

        // Update techSelection by pulling removed items first
        if (techSelection && techSelection.remove && techSelection.remove.length) {
          await Project.findByIdAndUpdate(id, { $pull: { techSelection: { category: { $in: techSelection.remove } } } });
        }

        // Then pushing added items
        if (techSelection && techSelection.add && techSelection.add.length) {
          techSelection.add.forEach(async (addition) => {
            await Project.findByIdAndUpdate(id, {
              $push: { techSelection: { category: addition.category, technologies: addition.technologies } }
            });
          });
        }

        // Comments and userQueries can be updated in a similar manner
        if (comments && comments.remove) {
          await Project.findByIdAndUpdate(id, { $pull: { comments: { $in: comments.remove } } });
        }
        if (comments && comments.add) {
          comments.add.forEach(async (comment) => {
            await Project.findByIdAndUpdate(id, { $push: { comments: comment } });
          });
        }

        if (userQueries && userQueries.remove) {
          await Project.findByIdAndUpdate(id, { $pull: { userQueries: { $in: userQueries.remove } } });
        }
        if (userQueries && userQueries.add) {
          userQueries.add.forEach(async (query) => {
            await Project.findByIdAndUpdate(id, { $push: { userQueries: query } });
          });
        }





        // const updates = {};
        // if (title) updates.title = title;
        // if (description) updates.description = description;
        // if (notes) {
        //   updates.notes = notes; // Assuming direct set is fine for notes
        // }

        // const techAdditions = techSelection?.add || [];
        // const techRemovals = techSelection?.remove || [];

        // if (techAdditions.length > 0 || techRemovals.length > 0) {
        //   // Apply technology updates in two stages to avoid conflicts
        //   if (techRemovals.length > 0) {
        //     await Project.findByIdAndUpdate(id, {
        //       $pull: { techSelection: { _id: { $in: techRemovals } } }
        //     });
        //   }
        //   if (techAdditions.length > 0) {
        //     await Project.findByIdAndUpdate(id, {
        //       $push: { techSelection: { $each: techAdditions } }
        //     });
        //   }
        // }

        // // Apply simpler updates in a single go
        // if (Object.keys(updates).length > 0) {
        //   await Project.findByIdAndUpdate(id, { $set: updates });
        // }

      //   // Prepare update operations
      // const updates = { $set: {}, $push: {}, $pull: {} };

      // if (title) updates.$set.title = title;
      // if (description) updates.$set.description = description;
      // if (notes) updates.$set.notes = notes.map(note => ({ content: note.content, dateAdded: note.dateAdded || new Date() }));

      // // Update userQueries: handle add and remove operations
      // if (userQueries?.add?.length) {
      //   updates.$push.userQueries = { $each: userQueries.add };
      // }
      // if (userQueries?.remove?.length) {
      //   updates.$pull.userQueries = { $in: userQueries.remove };
      // }

      // // Update techSelection: handle add and remove operations
      // if (techSelection?.add?.length) {
      //   techSelection.add.forEach(tech => {
      //     updates.$push.techSelection = updates.$push.techSelection || { $each: [] };
      //     updates.$push.techSelection.$each.push({
      //       category: tech.category,
      //       technologies: tech.technologies
      //     });
      //   });
      // }
      // if (techSelection?.remove?.length) {
      //   updates.$pull.techSelection = { $in: techSelection.remove.map(techId => techId) };
      // }

      // // Update comments: handle add and remove operations
      // if (comments?.add?.length) {
      //   updates.$push.comments = { $each: comments.add };
      // }
      // if (comments?.remove?.length) {
      //   updates.$pull.comments = { $in: comments.remove };
      // }

      // // Execute the update operation
      // await Project.findByIdAndUpdate(id, updates, { new: true });


      




        // const updates = {
        //   ...(title && { title }),
        //   ...(description && { description })
        // };
        
        // // Perform basic updates first 
        // // await Project.findByIdAndUpdate(id, updates, { new: true });
        // await Project.findByIdAndUpdate(id, updates);

        // // Prepare complex updates with $push and $pull
        // const complexUpdates = { $set: {}, $push: {}, $pull: {} };

        // // Handle adding and removing for each array field 
        // const arrayUpdates = {};
        // if (addUserQueries && addUserQueries.length > 0) {
        //   arrayUpdates.$push = { userQueries: { $each: addUserQueries } }; // Corrected the field name
        // }
        // if (addTechSelection && addTechSelection.length > 0) {
        //   arrayUpdates.$push = {...(arrayUpdates.$push || {}), techSelection: {$each: addTechSelection } };
        // }
        // if (addComments && addComments.length > 0) {
        //   arrayUpdates.$push = {...(arrayUpdates.$push || {}), comments: { $each: addComments } }; // Corrected to comments
        // }
        // // Apply array updates if any exist
        // // if (Object.keys(arrayUpdates).length > 0) {
        // //   await Project.findByIdAndUpdate(id, arrayUpdates, { new: true });
        // // }
        // // Handle removing for each array field using $pull 
        // if (removeUserQueryIds && removeUserQueryIds.length > 0) {
        //   await Project.findByIdAndUpdate(id, { $pull: { userQueries: { $in: removeUserQueryIds } } }, { new: true });
        // }
        // if (removeTechSelectionId && removeTechSelectionId.length > 0) {
        //   await Project.findByIdAndUpdate(id, { $pull: { techSelection: { _id: { $in: removeTechSelectionId } } } }, { new: true });
        // }
        // if (removeCommentIds && removeCommentIds.length > 0) {
        //   await Project.findByIdAndUpdate(id, { $pull: { comments: { $in: removeCommentIds } } }, { new: true });
        // }

        // // Set updates, specifically for nested objects like notes
        // // if (notes) {
        // //   await Project.findByIdAndUpdate(id, { $set: { notes } }, { new: true });
        // // }
        // if (notes) complexUpdates.$set.notes = notes.map(note => ({
        //   content: note.content,
        //   dateAdded: note.dateAdded || new Date()
        // }));

        // // Apply complex updates if necessary
        // if (Object.keys(complexUpdates.$set).length || Object.keys(complexUpdates.$push).length || Object.keys(complexUpdates.$pull).length) {
        //   await Project.findByIdAndUpdate(id, complexUpdates, { new: true });
        // }

        // Apply other simple updates
        await Project.findByIdAndUpdate(id, { $set: updateObj });
    
        // Fetch and return the updated document
        return await Project.findById(id).populate('owner');
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