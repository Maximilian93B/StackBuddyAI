//Import all Modules 
// Import Hooks 
// Import Mutation

import React, { useState, } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; 
import { SIGNUP_MUTATION, LOGIN_MUTATION} from '../utils/UserMutations';
// Import Auth Service for JWT decode and handling 
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
  padding: 20px;
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
font-family: "Open Sans", sans-serif;
font-size: 16px;
letter-spacing: 1px;  // Reduced for subtlety
color: black; // White text color for better contrast on darker backgrounds
cursor: pointer;
background-color:white; // A soft, elegant green
border: none; // No border for a cleaner look
padding: 10px 20px; // Increased padding for a better touch area
border-radius: 25px; // Fully rounded edges
box-shadow: 0 4px 8px rgba(0,0,0,0.15); // Soft shadow for a subtle depth effect
transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s; // Smooth transitions for hover effects

&:hover, &:focus {
  background-color: #367C2B; // A darker shade of green on hover/focus for feedback
  box-shadow: 0 6px 12px rgba(0,0,0,0.2); // Slightly deeper shadow on hover/focus
  transform: translateY(-2px); // Slight lift effect on hover/focus
}

&:active {
  transform: translateY(1px); // Subtle press down effect
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Less depth when button is pressed
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
    const [signup,{ loading: loadingSignup, error: errorSignup }] = useMutation(SIGNUP_MUTATION, {
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
    const [login, { loading: loadingLogin, error: errorLogin }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            AuthService.login(data.login.token); 
            navigate('/workstation');
        },
        onError: error =>  setFormError(error.message) 
    });
    

    // APP security 
    // validate user input 
    const validateForm = () => {
        const { username, email, password } = formState;
        if(!email || !password || (!isLogin && !username)) {
            setFormError('All fields must be filed to Sign Up');
            return false;
        }
        // Regex email format 
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormError('Must be valid email format');
            return false;
        }
        if(!isLogin  && password.length < 8) {
            setFormError('Password must be at least 8 characters long');
            return false;
        }
        return true;
    };
    
    // Function to update formState with current input values whenever a change occurs in the form fields
    const handleChange = e => {
        const { name, value } = e.target;
        setFormState(prev => ({...prev, [name]: value }));
        setFormError(''); // Clean up
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;


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
            <StyledButton onClick={toggleForm} style={{ marginTop: '10px' }}>
                {isLogin ? 'Need to create an account?' : 'Already have an account? Log In'}
            </StyledButton>
        </StyledForm>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
    </Container>
);
}

export default AuthForm;