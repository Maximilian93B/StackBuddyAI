const mongoose = require('mongoose');

// Mongo URI connection string 
const MONGODB_URI = 'mongodb://localhost:27017/StackBuddyAI_DB';

mongoose.connect(MONGODB_URI, {

});
 // Connect to Mongo
    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB');
    });
    // Log Connection Error 
    mongoose.connection.on('error', (err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    });

    // Export the connection 
    module.exports = mongoose.connection; 
