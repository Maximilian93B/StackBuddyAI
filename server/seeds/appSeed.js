// to run from /server directory
// node seeds/appSeed.js

const mongoose = require('mongoose');
const db = require('../config/connection'); // Adjust the path as needed
const { User, Project, Technology } = require('../models');
const bcrypt = require('bcrypt');

// Sample data
const usersData = [
  {
    username: "Bob",
    email: "bob@example.com",
    password: "password2",
  },
  {
    username: "Alice",
    email: "alice@example.com",
    password: "password1",
  },
];

const technologiesData = [
  {
    name: "MongoDB",
    category: "Database",
    description: "A NoSQL database.",
  },
  {
    name: "Express",
    category: "Backend",
    description: "A web application framework for Node.js.",
  },
  {
    name: "React",
    category: "Frontend",
    description: "A JavaScript library for building user interfaces.",
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "A JavaScript runtime built on Chrome's V8 JavaScript engine.",
  },
  {
    name: "GraphQL",
    category: "Tool",
    description: "A query language for your API.",
  },
  {
    name: "Docker",
    category: "Service",
    description: "A platform for developing, shipping, and running applications.",
  },
];

const projectsData = [
  {
    title: "Full Stack Project with MERN",
    description: "A full stack project using MongoDB, Express, React, and Node.js",
    technologiesNames: ["MongoDB", "Express", "React", "Node.js"]
  },
  {
    title: "API Development with Docker",
    description: "Developing scalable APIs using Node.js and Docker",
    technologiesNames: ["Node.js", "Docker"]
  },
];

async function seedDB() {
  await mongoose.connect('mongodb://localhost:27017/StackBuddyAI_DB');
  
  await User.deleteMany({});
  await Project.deleteMany({});
  await Technology.deleteMany({});

  // create technologies
  const createdTechnologies = await Technology.insertMany(technologiesData);

  // hash passwords and create users
  const hashedUsersData = usersData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  }));
  const createdUsers = await User.insertMany(hashedUsersData);

  // Iterate over projectsData to create projects
  for (let project of projectsData) {
    // Find technology IDs based on names
    const techIds = project.technologiesNames.map(name => 
      createdTechnologies.find(t => t.name === name)._id
    );

    // Assume second user (Bob) as owner for all projects
    const newProject = await Project.create({
      ...project,
      owner: createdUsers[0]._id, // Assign Bob as the owner
      technologies: techIds,
    });

    // Push newProject._id to Bob's currentProjects
    createdUsers[0].currentProjects.push(newProject._id);
  }

  // update Bob's documents
  await User.findByIdAndUpdate(createdUsers[0]._id, {
    $set: { currentProjects: createdUsers[0].currentProjects },
  });

  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seedDB().catch(err => {
  console.error("Seed script failed:", err);
  mongoose.connection.close();
});