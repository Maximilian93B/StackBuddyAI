// models/Projects.js
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Technology',
  }],
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