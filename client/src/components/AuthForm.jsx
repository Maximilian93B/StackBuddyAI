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
import { useSpring, animated } from 'react-spring';



// SignUp Form Styles
const Container = styled(animated.div)`
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
letter-spacing: 1px; 
color: black; 
cursor: pointer;
background-color:white; 
border: none; 
padding: 10px 20px; 
border-radius: 25px; 
box-shadow: 0 4px 8px rgba(0,0,0,0.15); // Soft shadow for a subtle depth effect
transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s; // Smooth transitions for hover effects

&:hover, &:focus {
  background-color: #367C2B; 
  box-shadow: 0 6px 12px rgba(0,0,0,0.2); 
  transform: translateY(-2px); 
}

&:active {
  transform: translateY(1px); 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
}
`;

const ErrorMessage = styled.p`
olor: #D8000C; 
background-color: #FFD2D2; 
padding: 10px 20px; 
margin-top: 10px; 
border-radius: 5px; 
border: 1px solid #FFBABA; 
box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
font-size: 0.9rem; 
text-align: center; 
width: 100%; 
box-sizing: border-box; 
`;

// Set the initial form stat outside of the block


const initialFormState = { email: '', password: '', username: '' };


function AuthForm({ style }) {
    const [formState, setFormState] = useState(initialFormState);// Will be used for signup only
    const [isLogin, setIsLogin] = useState(true);
    const [formError, setFormError] = useState(''); // Handle errors for form submit 
    const navigate = useNavigate(); // useNavigate to redirect the users after success or failure 


    // Define our mutations + handle SingUp/login redirect to workstatio
    // Reset form after successful sign up
    // clear form to empty strings 

    const [signup,{ loading: loadingSignup, error: errorSignup }] = useMutation(SIGNUP_MUTATION, {
        onCompleted: (data) => {
            AuthService.login(data.signup.token);
            navigate('/introduction')
            setFormState(initialFormState);
            setIsLogin(true); // Switch to prompt the user to log in 
        },
        onError: (error) => {
            const errorMessage = error.message.includes('already exists') ?
            'An account with this email already exsists.' :
            error.message;
            // set state to errorMessage
            setFormError(errorMessage);
        }
    });
    
    
    // On successful login redirect the user to their workstation and forgo all the onboarding. 
    // Custom handling added to handle user errors 
    const [login, { loading: loadingLogin, error: errorLogin }] = useMutation(LOGIN_MUTATION, {
        onCompleted: (data) => {
            AuthService.login(data.login.token); 
            navigate('/workstation');
        },
        onError: error => {
            const errorMessage = error.message;
            // if the response is "User not found" from the server 
            if(errorMessage.includes('User not found')) {
                // setFormError to display error
                setFormError("No account with this email has been registered.");
            } else if (errorMessage.includes('Invalid Credentials')) {
                setFormError('Passwords do not match');
            } else {
                setFormError(errorMessage); // Default message for further handling 
            }
        } 
    });
    

    // APP security 
    // validate user input 
    const validateForm = () => {
        const { username, email, password } = formState;
        if(!email || !password || (!isLogin && !username)) {
            setFormError('Please fill out all fields to Sign Up');
            return false;
        }
        // Regex email format 
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setFormError('The email entered does not match a valid format');
            return false;
        }
        if(!isLogin  && password.length < 8) {
            setFormError('Your password must be at least 8 characters long');
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
                if(signup) {

                }
            }
            // Success handling logic here (e.g., clear form, show success message, or redirect)
        } catch (error) {
           setFormError('Unexpected Error: Sorry, Try again later - If you see this message please contact the Developers');
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormState({ email: '', password: '', username: '' });
        setFormError('') // Clean up form errors
    };

    const loading = isLogin ? loadingLogin : loadingSignup;

    // useSpring, animations for form 

    // Originally called locally 
    // Adding prop and calling in parent component 'Introduction'
    /*
    const formAnimation = useSpring({
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-30px)',
        from: { opacity: 0, transform: 'translateY(-30px)' },
        config: { tension: 170, friction: 26 }
    });
    */



    return (
        <Container style={style}>
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
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </  StyledButton>
            <StyledButton onClick={toggleForm} style={{ marginTop: '10px' }}>
                {isLogin ? 'Need to create an account?' : 'Already have an account? Log In'}
            </StyledButton>
        </StyledForm>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
    </Container>
);
}

export default AuthForm;
