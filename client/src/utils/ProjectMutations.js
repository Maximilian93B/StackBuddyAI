// This file handles all Project Mutations 

import { gql } from '@apollo/client';

// Create a new Project 
// Simplified the CREATE_PROJECT mutation to reflect the back end changes 


export const CREATE_PROJECT = gql`
mutation CreateProject(
  $title: String!, 
  $description: String!
) {
  createProject(
    title: $title,
    description: $description
  ) {
    id
    title
    description
    owner {
      id
      username
    }
  }
}
`;

// Update an exisiting project 
// Allows user to change all apsects of project details 
export const UPDATE_PROJECT = gql`
mutation UpdateProject(
  $id: ID!, 
  $title: String, 
  $description: String, 
  $userQueries: [String], 
  $techSelection: [UpdateTechCategoryInput], 
  $comments: [String]
) {
  updateProject(id: $id, 
    title: $title, 
    description: $description, 
    userQueries: $userQueries, 
    techSelection: $techSelection, 
    comments: $comments
  ) {
      id
      title
      description
      userQueries
      techSelection {
          category
          technologies
      }
      comments
      dateStamp
      owner {
          id
          username
      }
  }
}
`;

export const UPDATE_PROJECT_TECH = gql`
mutation updateProjectTech(
  $projectId: ID!, 
  $techSelection: [UpdateTechCategoryInput!] 
) {
updateProject(
  id: $projectId, 
  techSelection: $techSelection
) {
  id
  techSelection {
    category
    technologies
  }
}
}
`