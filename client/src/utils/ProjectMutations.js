// This file handles all Project Mutations 

import { gql } from '@apollo/client';

// Create a new Project 
export const CREATE_PROJECT = gql`
mutation CreateProject(
    $title: String!, 
    $description: String!, 
    $userQueries: [String!],
    $techSelection: [TechCategoryInput!],
    $comments: [String!]
) {
   createProject(title: $title,description: $description, userQueries: $userQueries,techSelection: $techSelection, comments: $comments){
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

// Update an exisiting project 
export const UPDATE_PROJECT = gql`
mutation UpdateProject($id: ID!, $title: String, $description: String, $userQueries: [String!], $techSelection: [TechCategoryInput!], $comments: [String!]) {
    updateProject(id: $id, title: $title, description: $description, userQueries: $userQueries, techSelection: $techSelection, comments: $comments) {
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