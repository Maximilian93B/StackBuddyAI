const User = require('../models/Users');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const userResolvers = {
  Query: {
    me: async (_, args, context) => {
      
      if (!context.user) {
        throw new AuthenticationError('Not Logged in');
      }
        return await User.findById(context.user._id).populate('currentProjects');
    },

    // Query to fetch all users 
    users: async () => {
      return await User.find({}).populate('currentProjects');
    },

    // Query to fetch a single user 
    user: async (_, { id }) => {
      return await User.findById(id).populate('currentProjects');
    },    
    // Add querys as we need them 
  },
  Mutation: {

    // Sign up a new user and return  auth token and  user details
    signup: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };

    },

    // Login and return auth token 
    login: async (_, {email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      // Return user details with token 
      return { token , user }; 
    },
    
    // TO DO: 
    // Will need to include more mutations to handle users updating more than email 
    // Need to handle permissions for users still 
    
  },

  User: {
    projectCount: (parent) => {
      return parent.currentProjects?.length || 0;
    },
  },
  
};

module.exports = userResolvers;