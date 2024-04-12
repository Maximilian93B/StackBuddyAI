// This file will handle project queries 

import { gql } from '@apollo/client';

export const GET_PROJECTS = gql`
query GetProjects {
    projects {
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

export const GET_PROJECT = gql`
query GetProject($id: ID!) {
    project(id: $id) {
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
