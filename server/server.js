// Import rall modules required 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
//const { authMiddleware } = require('./utils/auth');
const logger = require ('morgan') // Import morgan for HTTP request logging


async function startApolloServer(typeDefs, resolvers) {
 //Define the PORT , use .env or default to 3001 
 const PORT = process.env.PORT || 3001;
 const app = express();

// Use Morgan for detailed request logging during dev phase 
app.use(logger('dev'));

// Apollo Instance , GraphQL --> typeDefs, resolvers from schemas 
const server = new ApolloServer({
    typeDefs,
    resolvers,
   /* context : async ({ req }) => {
        // Use the authMiddleware to extract authen data 
        const authData = authMiddleware ({ req });
        // Pass tje auth Data to resolvers
        return{...authData};
    },
    */
});
    // Start the server 
    await server.start();
    // Apply Apollo GraphQL middleware and set the path to '/graphql'
    server.applyMiddleware({ app, path: '/graphql'});

    // Connect the DB 
    db.once('open', () => {
        // Start the server once the DB is connected 
        app.listen( PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
        });
    }).on('error', (error) => {
        // Handle connection errors for DB 
        console.error('Database connection error:', error);
        // Exit process with (1) error code in case of DB connection failure 
        process.exit(1)
    });
}

startApolloServer(typeDefs,resolvers); 
