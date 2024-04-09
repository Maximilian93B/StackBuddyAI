// models/Projects.js
const mongoose = require('mongoose');

// Define a schema for individual technology recommendations within a response
const RecommendedTechSchema = new mongoose.Schema({
  technologyName: String,
  reason: String, // why this technology is recommended
}, { _id: false }); // Prevent separate _id for sub-document

const RecommendationQuerySchema = new mongoose.Schema({
  queryText: {
    type: String,
    required: true
  },
  queryDate: {
    type: Date,
    default: Date.now
  },
  // Add a field to store responses.
  response: {
    receivedDate: Date, // When the response was received
    recommendations: [RecommendedTechSchema], // Array of recommended technologies and reasons
    additionalNotes: String, // Any additional notes from the recommendation service
  },
}, { _id: false });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technology',
  }],
  // Array to store user queries for tech stack recommendations
  recommendationQueries: [RecommendationQuerySchema],
  comments: [{
    text: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateStamp: { type: Date, default: Date.now },
  }],
  dateStamp: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // No project Can exist without an Owner 
}, {
  // Enable virtuals to be included in toJSON and toObject
  toJSON: { virtuals: true, getters: true },
  toObject: { virtuals: true, getters: true },
});


//Custom transformation for toJSON and toObject -- Related to issue #26 
ProjectSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id.toString();
    if (ret.owner && typeof ret.owner === 'object' && ret.owner._id) {
      ret.owner.id = ret.owner._id.toString();
    }
    // Rempove mongo specifics to clean JSON output 
    delete ret._id;
    delete ret.__v;
  }
});


const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;