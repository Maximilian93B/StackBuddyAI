//Import all Modules 
// Import Hooks 
// Import Mutation

import React, { useState, } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Corrected import for useNavigate
import { SIGNUP_MUTATION, LOGIN_MUTATION} from '../utils/UserMutations';
// Correct import for a default export
import AuthService from '../utils/auth';
import styled from 'styled-components';

// SignUp Form Styles
const Container = styled.div`
  width: 360px; // Define a fixed width or use width instead of max-width if preferred
  margin: 5% auto; // Adjust as necessary to vertically center
  padding: 20px;
  background-color: #f9f9f9; // Light background color
  border-radius: 8px; // Rounded corners
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // Subtle shadow
  border: 1px solid #ddd; // Light border
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

function AuthForm() {
    // useState to hold form inputs
    const [formState, setFormState] = useState({ email: '',password: '', username: '', });// Will be used for signup only
    // Toggle between login and signup
    const [isLogin, setIsLogin] = useState(true);
    const [formError, setFormError] = useState(''); // Handle errors for form submit 
    const navigate = useNavigate(); // useNavigate to redirect the users after success or failure 


    // Define our mutations + handle SingUp/login redirect to workstation
    // On successfull SignUp redirect the user to our landing page so they can log in and begin onboarding
    const [signup, { loading: loadingSignup, error: errorSignup }] = useMutation(SIGNUP_MUTATION, {
        onCompleted: (data) => {
            AuthService.login(data.signup.token);
            navigate('/')
            setFormState({ email: '', password: '', username: '',}); // Clean up - clear the form 
        },
        onError: (error) => {
            setFormError(error.message); // Set error message 
        }
    });
    // On successful login redirect the user to their workstation and forgo all the onboarding. 
    const [login, { loading: loadingLogin, error : errorLogin }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            AuthService.login(data.login.token); 
            navigate('/workstation');
        },
        onError: (error) => { setFormError(error.message); }
    });
    
    
    // Function to update formState with current input values whenever a change occurs in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: value });
        setFormError(''); // Clean up
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password } = formState;
        try {
            if (isLogin) {
                // Handle login
                await login({ variables: { email, password } });
            } else {
                // Handle signup
                await signup({ variables: { username, email, password } });
            }
            // Success handling logic here (e.g., clear form, show success message, or redirect)
        } catch (error) {
            // Handled indivudually 
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormState({ email: '', password: '', username: '' });
        setFormError('') // Clean up form errors
    };

    const loading = isLogin ? loadingLogin : loadingSignup;

    return (
        <Container>
        <StyledForm onSubmit={handleSubmit}>
            {!isLogin && (
                <StyledInput
                    name="username"
                    type="text"
                    placeholder="Username"
                    value={formState.username}
                    onChange={handleChange}
                />
            )}
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
            <StyledButton type="submit" disabled={loading}>
                {isLogin ? 'Login' : 'Sign Up'}
            </StyledButton>
        </StyledForm>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
        <button onClick={toggleForm}>
            {isLogin ? 'Need to create an account?' : 'Already have an account?'}
        </button>
    </Container>
);
}

export default AuthForm;