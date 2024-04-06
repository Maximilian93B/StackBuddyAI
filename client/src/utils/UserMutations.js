// This file will hold all mutations 

import { gql } from '@apollo/client';

// Handle User SignUp/Login

export const SIGNUP_MUTATION = gql`
mutation Singup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
        token
        user{
            id
            username
            emial
        }
    }
}
`;

export const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token 
        user {
            id
            username
            email
        }
    }
}
`;