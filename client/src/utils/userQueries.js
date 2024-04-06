
// This file will handle all our User Queries

import { gql } from '@apollo/client';

export const GET_USERS = gql`
querey GetUsers {
    users {
        id
        username
        email
    }
}
`;

export const GET_USER = gql`
query GetUser($id: ID!) {
    user(id: $id) {
        id
        username
        email
        projects {
            id
            title
        }
    }
}
`;

export const GET_ME = gql`
query me {
    me {
        id 
        username
        email
        projects {
            id 
            title
        }
    }
}
`;