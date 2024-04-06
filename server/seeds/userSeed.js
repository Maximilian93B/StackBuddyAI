// to run from /server directory
// node seeds/userSeed.js

const mongoose = require('mongoose');
const db = require('../config/connection'); // Adjust the path as needed
const { User, Project, Technology } = require('../models');
const bcrypt = require('bcrypt');

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
  },
  {
    title: "API Development with Docker",
    description: "Developing scalable APIs using Node.js and Docker",
  },
];

async function seedDB() {
  await mongoose.connect('mongodb://localhost:27017/StackBuddyAI_DB');
  
  await User.deleteMany({});
  await Project.deleteMany({});
  await Technology.deleteMany({});

  const createdUsers = await User.insertMany(usersData.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10), // Ensure passwords are hashed
  })));

  const createdTechnologies = await Technology.insertMany(technologiesData);
  
  // For each project, find associated technologies and assign them
  for (let project of projectsData) {
    const techIdsForProject = createdTechnologies
      .filter(tech => project.description.includes(tech.name))
      .map(tech => tech._id);

    await Project.create({
      ...project,
      owner: createdUsers[0]._id,
      technologies: techIdsForProject,
    });
  }

  console.log("Database seeded successfully!");
  mongoose.connection.close();
}

seedDB().catch(err => {
  console.error("Seed script failed:", err);
  mongoose.connection.close();
});