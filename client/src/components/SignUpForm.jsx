//Import all Modules 
// Import Hooks 
// Import Mutation

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGNUP_MUTATION } from '../utils/UserMutations';
import styled from 'styled-components';

// SignUp Form Styles
const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
  }
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;



function Signup() {
    // useState to hold form inputs
    const [formState, setFormState] = useState({
        email: '',
        password: '',
        username: '',
    });

    // Use SIGNUP mutation + loading state + errors
    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);

    // Function to update formState with current input values whenever a change occurs in the form fields
    // Uses the name attribute to identify the input field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value, // Dynamically update the state based on the input name
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        try {
            await signup({
                variables: {
                    ...formState, // Spread the formState to use its properties as variables for the mutation
                },
            });
            // Success handling logic here (e.g., clear form, show success message, or redirect)
        } catch (err) {
            // Error handling logic here
            // Error message can be accessed using error.message if needed
        }
    };

    // The signUp Form
    return (
        <Container>
            <StyledForm onSubmit={handleSubmit}>
                <StyledInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formState.username}
                    onChange={handleChange}
                />
                <StyledInput
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <StyledInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <StyledButton type="submit" disabled={loading}>Sign Up</StyledButton>
            </StyledForm>
            {error && <ErrorMessage>Error signing up: {error.message}</ErrorMessage>}
        </Container>
    );
}

export default Signup;