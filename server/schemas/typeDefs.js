
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


#           User type

type User {
    id: ID!
    username: String!
    email: String!
    projects: [Project!]! # Projects owned by the user
}


type AuthPayload {
    token: String!
    user: User
}


#       Define a Tech Category 

type TechCategory {
    category: String!
    technologies: [String!] # Technologies selected for each category
}


type Query {
    projects: [Project!]!
    project(id: ID!): Project
    users: [User!]
    user(id: ID!): User
    me: User
}

#           Mutations 

type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createProject(title: String!, description: String!, userQueries: [String!], techSelection: [TechCategoryInput], comments: [String!]): Project
    updateProject(id: ID!, title: String, description: String, userQueries: [String!], techSelection: [TechCategoryInput], comments: [String!]): Project
}

 #          Inpurt type for tech selection when creating/updating projects

 input TechCategoryInput {
    category: String!
    technologies: [String!]!
}

`;

module.exports = typeDefs;