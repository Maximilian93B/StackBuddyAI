// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    currentProjects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project',
    }],
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Ensure password is not sent back to client
        delete ret.password;
        return ret;
      },
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Define a virtual property 'projectCount' that returns number of projects
userSchema.virtual('projectCount').get(function () {
  return this.currentProjects.length;
});

module.exports = mongoose.model('User', userSchema);