// models/Technologies.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const technologySchema = new Schema({
    // The name of the technology
    name: { 
      type: String,
      required: true,
      unique: true
    },
    // Category "Database", "Backend", "Frontend"
    category: {
      type: String,
      required: true,
      enum: ['Database', 'Backend', 'Frontend', 'Tool', 'Service']
    },
    description: String,
});

module.exports = mongoose.model('Technology', technologySchema);