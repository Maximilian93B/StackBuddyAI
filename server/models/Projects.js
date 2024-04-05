// models/Projects.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // Array to store user queries for tech stack recommendations
  userQueries: [String],
  techSelection: [{
    // Example categories: "Database", "Backend", "Frontend", etc.
    category: String,
    // Array of recommended technologies for each category
    technologies: [String],
  }],
  comments: [String],
  dateStamp: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;