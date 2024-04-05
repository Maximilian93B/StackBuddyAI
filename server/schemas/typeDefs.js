const { gql } = require('apollo-server-express');

/* Types 
Project
User
TechCategory

These types will define our main data. 
! = Non Nullable = Must return values 

input type =  creating and updating projects 

CRUD OPS - Will need to elaborate 

TO DO : 

Error Handling ? 


*/

const typeDefs = gql`
   
#       Define Project type

type Project {
    id: ID!
    title: String!
    description: String!
    useQueries: [String!] # User queries for tech stack recommendation
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


#       Define a Tech Category 

type TechCategory {
    categpry: String!
    technologies: [String!] # Technologies selected for each category
}


#            Queries
type Query {
    projects: [Project!]! # Fetch all projects
    project(id: ID! ): Project # Fetch a single project by ID 
    users: [User!] # Fetch all users
    user(id: ID): User # Fetch a single user by ID 
}



#           Mutations 

type Mutation {
    createProject(title: String!, description: String!, useQueries: [String], techSelection: [TechCategoryInput], comments: [String]): Project
    updateProject(id: ID!, title: String, description: String, userQueries: [String], techSelection: [TechCategoryInput], comments: [String]): Project
}

 #          Inpurt type for tech selection when creating/updating projects

 input TechCategoryInput {
    category: String!
    technologies: [String]!
  }


#           Auth payload for login/signup mutations 

type AuthPayload {
    token: String! # Authentication token
    user: User! # Logged in user information
}
`;

module.exports = typeDefs;