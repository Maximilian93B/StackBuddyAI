// models/Technologies.js
const mongoose = require('mongoose');

const TechnologySchema = new mongoose.Schema({
    // The name of the technology
    name: String,
    // Category like "Database", "Backend", "Frontend"
    category: String,
    comments: [{
      text: String,
      postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      dateStamp: { type: Date, default: Date.now },
    }],
});

const Technology = mongoose.model('Technology', TechnologySchema);
module.exports = Technology;