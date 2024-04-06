// This file will handle all Tech Selection Queries 

import { gql } from '@apollo/client';

export const GET_TECHNOLOGIES = gql`
query GetTechnologies {
    technologies {
        id 
        name 
        category 
        comments {
            text 
            postedBy {
                id 
                username
            }
        }
    }
}
`;

export const GET_TECHNOLOGY = gql`
query GetTechnology($id: ID!) {
    technology(id: $id) {
        id
        name
        category
        comments {
            text
            postedBy {
            id
            username
            }
        }
    }
}
`;

export const GET_TECHNOLOGIES_BY_CATEGORY = gql `
query GetTechnologiesByCategory($category: String!) {
    technologiesByCategory(category: $category) {
        id
        name
        category
        comments {
            text
            postedBy {
                id
                username
            }
        }
    }
}
`;