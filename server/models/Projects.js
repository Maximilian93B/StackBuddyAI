// models/Projects.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Reference to the project owner
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  // References to chosen technologies
  technologies: [{
    type: Schema.Types.ObjectId,
    ref: 'Technology'
  }],
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);