
const typeDefs = require('./typeDefs');
const projectResolvers = require('./ProjectResolver');
const userResolvers = require('./UserResolver');
const technologyResolvers = require('./UserResolver');

// Merge Resolvers 

const resolvers = { 
    Query: {
        ...projectResolvers.Query,
        ...userResolvers.Query,
        ...technologyResolvers.Query
    },
    // More queries can go here as we need them 
    Mutation: {
        ...projectResolvers.Mutation,
        ...userResolvers.Mutation,
        ...technologyResolvers.Mutation,
    },
    // Other resolvers can go here 
}

module.exports = { typeDefs, resolvers };