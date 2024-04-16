
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
    notes: [Note] # Include Note type in the Project type
    dateStamp: String! 
    owner: User! # The user who owns the project --> Will use for permissions for project
}


#        Define User type

type User {
    id: ID!
    username: String!
    email: String!
    currentProjects: [Project] # Projects owned by the user
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

type Note {
  content: String!
  dateAdded: String!
}

type Query {
    projects: [Project!]!
    project(id: ID!): Project
    users: [User!]
    user(id: ID!): User
    me: User
}

type TechStackRecommendation {
    recommendation: String
}

#           Mutations 

type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    createProject(
      title: String!,
      description: String!,
      userQueries: [String], # Made optional
      techSelection: [TechCategoryInput!], # require at least one TechCategoryInput
      comments: [String] # Made optional
      notes: [NoteInput] # Added notes input for project creation
    ): Project
    updateProject(
      id: ID!,
      title: String,
      description: String,
      userQueries: UpdateUserQueriesInput,
      techSelection: [UpdateTechCategoryInput],
      comments: UpdateCommentsInput
      notes: [NoteInput] # Added notes input for project updates
    ): Project
    getTechStackRecommendation( # add recommendation for OpenAI
      projectDescription: String!
    ): TechStackRecommendation
  }
  

 #          Input type for tech selection when creating/updating projects

  input TechCategoryInput {
    category: String!
    technologies: [String!]!
  }

  input UpdateUserQueriesInput {
    add: [String] # IDs or values to add
    remove: [ID] # IDs to remove
  }

  input UpdateTechCategoryInput {
    add: [TechCategoryInput] # Tech Categories to add
    remove: [ID] # IDs of Tech Categories to remove
  }
  
  input UpdateCommentsInput {
    add: [String] # Comments to add
    remove: [ID] # IDs of Comments to remove
  }

  input NoteInput {
    content: String!
    dateAdded: String
  }
`;

module.exports = typeDefs;