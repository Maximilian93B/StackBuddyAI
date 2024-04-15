// Import rall modules required 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas/index');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const cors = require('cors');
require('dotenv').config();


// Axios is used for OpenAPI testing 
const axios = require('axios');

const {formatError, errorLoggingPlugin } = require('./utils/apolloBugHutner');
const logger = require ('morgan') // Import morgan for HTTP request logging



async function startApolloServer(typeDefs, resolvers) {
 //Define the PORT , use .env or default to 3001 
 const PORT = process.env.PORT || 3001;
 const app = express();

 app.use(cors());
 // Use Morgan for detailed request logging during dev phase 
app.use(logger('dev'));
app.use(express.json());

app.use(express.static('public'));


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

// OPEN AI ROUTE 
// We are making a RESTFUL route in a REST API, yes unconventional i know, but it works! with the lack of supper for Graph from OpenAI currently this is how i figured we could do it
// Technically there is no reason why we couldnt do this
// This endpoint is desinged to take a users query and send it to OpenAIs GPT model,

    // OpenAI Route for fetching data 
    app.post('/openai', async (req, res) => {
       // Extract the 'query' from the request body. This 'query' represents the users input ( question or message from the user to GPT)
        const { query } = req.body;
        try {
            const response = await axios.post(
                // use axios and Point to the GPT API 
                'https://api.openai.com/v1/chat/completions',
                {
                    model: "gpt-3.5-turbo", // GPT model we are using 
                    messages: [
                        {
                            role: "system", // A 'system' role message is used to provide the context to our model. This is Sysyem Level context so the more specific and concise the better 
                            content: "The assistant is a senior software engineer who helps project managers and developers understand project status, suggests improvements, and identifies risks." // Our content can be more specific to our Case of it acting a senior software engineer 
                        },
                        {
                            role: "user", // This 'user' role containes the actual query from the user 
                            content: query, // The users query is extracted from the request 
                        },
                    ],
                    temperature: 0.7, // this controls the randomness of the response. Higher Temp = more creative responses
                    max_tokens: 100, // This will set the maximum tokens in the response. Very high level definition (Token = word) 
                    top_p: 1.0, //  Allows for a more diverse response if hte number is higher// Still trying to figure this one out but this "Controls the diversity via nucleus sampling" 1 = no sampling, the lower the value the more "focused" the response 
                    frequency_penalty: 0.0,// This helps reduce the chance of the model repeating the same thing verbatim ( exactly line for line)
                    presence_penalty: 0.0, // This Encourages the model to introduce new concepts as the use talks to it  to it will not get in the DEATH LOOP.  
                },
                {
                    headers: {
                        'Content-Type': 'application/json', // Send the request headers to specify JSON  
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // No explanation needed 
                    },
                }
            );
    
            // The OpenAI Response
            // OpenAIs response includes an array of choices AWLAYS, even though we request one subject 
            // Send the extracted message back to the client as JSON
            const botReply = response.data.choices[0].message.content;
            res.json({ message: botReply });
            // Log the errors
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            res.status(500).send('Failed to get response from OpenAI');
        }my 
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