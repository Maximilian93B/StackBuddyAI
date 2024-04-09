
/* Types 
Project
User
TechCategory --> Selected Tech stack for users projects 

These types will define our main data. 
! = Non Nullable = Must return values 

input type =  creating and updating projects 

CRUD OPS - Will need to elaborate 

TO DO : 

Error Handling ? 


*/

const { gql } = require('apollo-server-express');

const typeDefs = gql`

#       Define User type

type User {
    id: ID!
    username: String!
    email: String!
    currentProjects: [Project!] # Projects owned by the user
    projectCount: Int
}


#       Define Project type

type Project {
    id: ID!
    title: String!
    description: String!
    userQueries: [String!] # User queries for tech stack recommendation
    techSelection: [TechCategory] # Tech categories and selected technologies
    comments: [String!] # User comments on the project
    dateStamp: String! 
    owner: User! # The user who owns the project --> Will use for permissions for project
}

#       Define a Tech Category type

type TechCategory {
    category: String!
    technologies: [Technology!] # Technologies selected for each category
}

#       Define Technology type

  type Technology {
    id: ID!
    name: String!
    category: String!
    description: String # If we have a description field
    comments: [Comment] # each technology can have multiple comments
  }

#       Define a Comment 

type Comment {
    id: ID!
    text: String!
    postedBy: User!
    dateStamp: String!
}

type AuthPayload {
    token: String!
    user: User
}

type Query {
    projects: [Project!]!
    project(id: ID!): Project
    users: [User!]
    user(id: ID!): User
    me: User
    technologies: [Technology]
    technology(id: ID!): Technology
}

#           Mutations 

type Mutation {
    signup(
        username: String!, 
        email: String!, 
        password: String!
    ): AuthPayload
    login(
        email: String!, 
        password: String!
    ): AuthPayload
    createProject(
        title: String!,
        description: String!,
        userQueries: [String], # Made optional
        techSelection: [TechCategoryInput!], # require at least one TechCategoryInput
        comments: [String] # Made optional
    ): Project
    createTechnology(
        name: String!, 
        category: String!, 
        comments: [CommentInput]
    ): Technology
    updateProject(
        id: ID!,
        title: String,
        description: String,
        userQueries: [String], # optional as well
        techSelection: [TechCategoryInput], #  updating might not require changing tech selection
        comments: [String] #  optional 
    ): Project
    updateTechnology(
        id: ID!, 
        name: String, 
        category: String, 
        description: String, 
        comments: [String]
    ): Technology
    deleteProject(
        id: ID!
    ): Project
    deleteTechnology(
        id: ID!
    ): Technology
}
  

 #          Inpurt type for tech selection when creating/updating projects

    input TechCategoryInput {
        category: String!
        technologies: [String!]!
    }

    input CommentInput {
        text: String
        postedBy: ID
        dateStamp: String
    }

`;

module.exports = typeDefs;