// to run from /server/seeds/ directory
// node userSeed.js

const mongoose = require('mongoose');
const db = require('../config/connection'); // Adjust the path as needed
const { User, Projects, Technologies } = require('../models');

// Sample data
const usersData = [
  {
    username: "Alice",
    email: "alice@example.com",
    password: "password1",
  },
  {
    username: "Bob",
    email: "bob@example.com",
    password: "password2",
  },
];

const technologiesData = [
  {
    name: "React",
    category: "Frontend",
  },
  {
    name: "Node.js",
    category: "Backend",
  },
];

const projectsData = [
  {
    title: "Project 1",
    description: "A project using React and Node.js",
    userQueries: ["Which tech stack is best for a web app?"],
    techSelection: [{ category: "Frontend", technologies: ["React"] }, { category: "Backend", technologies: ["Node.js"] }],
    comments: ["Looks good"],
    dateStamp: new Date(),
  },
];

async function seedDB() {
  await mongoose.connect('mongodb://localhost:27017/StackBuddyAI_DB');
  
  await User.deleteMany({});
  await Projects.deleteMany({});
  await Technologies.deleteMany({});

  const createdUsers = await User.insertMany(usersData);
  const createdTechnologies = await Technologies.insertMany(technologiesData);
  
  // Link the first user as the owner of the first project
  projectsData[0].owner = createdUsers[0]._id;
  await Projects.insertMany(projectsData);

  // Optionally, update the user's currentProjects with the newly created project
  await User.findByIdAndUpdate(createdUsers[0]._id, { $push: { currentProjects: projectsData[0]._id } });

  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seedDB().catch(err => {
  console.error("Seed script failed:", err);
  mongoose.connection.close();
});
