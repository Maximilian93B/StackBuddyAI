// Import rall modules required 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
require('dotenv').config();

// Axios is used for OpenAPI testing 
const axios = require('axios');

const {formatError, errorLoggingPlugin } = require('./utils/apolloBugHutner');
const logger = require ('morgan') // Import morgan for HTTP request logging



async function startApolloServer(typeDefs, resolvers) {
 //Define the PORT , use .env or default to 3001 
 const PORT = process.env.PORT || 3001;
 const app = express();

// Use Morgan for detailed request logging during dev phase 
app.use(logger('dev'));
app.use(express.json());



// Apollo Instance , GraphQL --> typeDefs, resolvers from schemas 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : async ({ req }) => {
        // Use the authMiddleware to extract authen data 
        const authData = authMiddleware ({ req });
        // Pass tje auth Data to resolvers
        return{...authData};
    },
    formatError, // Custom error format
    plugins: [errorLoggingPlugin],// custom plugin for logging
});
    // Start the server 
    await server.start();

    // OpenAI Route for fetching data 

    app.post('/openai', async (req, res) => {
        const { query } = req.body;
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "Your system prompt here."
                        },
                        {
                            role: "user",
                            content: query,
                        },
                    ],
                    temperature: 0.7,
                    max_tokens: 150,
                    top_p: 1.0,
                    frequency_penalty: 0.0,
                    presence_penalty: 0.0,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    },
                }
            );
    
            // Accessing the 'content' from the first choice's message
            const botReply = response.data.choices[0].message.content;
            res.json({ message: botReply });
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(500).send('Failed to get response from OpenAI');
        }
    });
    

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