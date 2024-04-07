// This file will handle all Tech Mutations 

import { gql } from '@apollo/client';


export const ADD_TECHNOLOGY = gql`
mutation addTechnology($name: String!, $category: String!) {
    addTechnology(name: $name, category: $category) {
        id
        name
        category
    }
}
`;

export const ADD_COMMENT_TO_TECHNOLOGY = gql`
mutation AddCommentToTechnology($technologyId: ID!, $text: String!, $userId: ID!) {
    addCommentToTechnology(technologyId: $technologyId, text: $text, userId: $userId) {
        id
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

