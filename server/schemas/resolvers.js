// Resolvers file 
const Project = require('../models/Projects');
const User = require('../models/Users');

const resolvers = {
    Query: {
        // Fetch all projects
        projects: async () => {
          return await Project.find({});
        },
        // Fetch a single project by ID 
        project: async (_, { id })=> {
            return await Project.findById(id);
        },
        // Fetch all Users 
        users: async () => {
            return await User.find({});
        },
        // Fetch a single user by ID 
        users: async () => {
            return await User.findByID(id);
        },
    },
    // We can add more resolvers as we need them!! 

    Mutation: {
        // Create a new Project
        createProject: async (_, { title, description, userQueries, techSelection, comments, ownerId }) => {
            const newProject = new Project ({
                title,
                description,
                userQueries,
                techSelection,
                comments,
                owner: ownerId,
            });

            return await newProject.save();
          
        },
          // Update an existing project
        updateProject: async(_, { id, title, description, userQueries, techSelection, comments }) => {
            return await Project.findByIdAndUpdate(
                id,
                { $set : { title, description, userQueries, techSelection, comments}},
                    // Return the updated object
                { new: true } 
            );
        },
    },
};



module.exports = resolvers;