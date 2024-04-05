
// Import all modules 
const Technology = require('../models/Technologies');
const { AuthenticationError, ForbiddenError } = require('apollo-server-express');


const technologyResolvers = {

    Query: {
        // Fetch all technologies
        technologies: async () => {
          return await Technology.find({});
        },
        // Fetch a single technology by ID
        technology: async (_, { id }) => {
          return await Technology.findById(id).populate('comments.postedBy');
        },
        // Fetch technologies by category
        technologiesByCategory: async (_, { category }) => {
          return await Technology.find({ category });
        },
      },
      Mutation: {
        // Add a new technology
        addTechnology: async(_, { name, category }, context) => {
            
          if(!context.user) {
            throw new AuthenticationError('You must be logged in to add new tech');
          }

          // Role based checks --> For Future ? 
          /* 
          if(context.user.role !== 'DEV') {
            throw new ForbiddenError('Unable to add tech, You must be a project owner')
          }
          */
        
          const newTechnology = new Technology({ name, category });
          return await newTechnology.save();
        },
        // Add a comment to a tech 
        addCommentToTechnology: async(_, {technologyId, text, userId }) => {
            const comment = { text, postedBy: userId };
            return await Technology.findByIdAndUpdate(
                technologyId,
                {$push: { comments: comment} },
                { new: true, safe: true, upsert: true }
            ). populate('comments.postedBy');
        },
      },
      // We need to add resolvers for nested fields 
}

module.exports = technologyResolvers;