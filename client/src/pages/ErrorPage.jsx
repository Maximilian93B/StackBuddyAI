import React from 'react'
import styled from 'styled-components';
import StackBuddyBot from '../assets/StackBuddyBot.svg'
import { useNavigate } from 'react-router-dom';
// useNavigate to let user go back to home page 


const ErrorPageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; 
height: 85vh; // Full height of the viewport

text-align: center;
background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
`;

const Title = styled.h1`
color: black; 
font-size: 3rem; 
text-shadow: 2px 2px 4px rgba(0,0,0,0.2); // Text shadow for depth
margin-bottom: 20px;  message
font-family: 'Verdana', sans-serif;
`;

const ChatBubble = styled.div`
background-color: #e0f7fa;  // Light cyan background, typical for chat bubbles
  color: black;
  font-size: 18px;
  padding: 15px 20px;
  border-radius: 25px; // Rounded corners for bubble effect
  margin-bottom: 30px;
  max-width: 40%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  border: 1px solid #b2ebf2; // Slight border for definition
  font-family: 'Verdana', sans-serif;
`;


const ImageContainer = styled.div`  
max-width: 70%;
max-height: 50%;
`;

const NotFoundImg = styled.img`
border-radius: 10px;
width: 60%;
height: auto;
border-radius: 10px;
`;


const NavigateButton = styled.button`
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

const NotFoundPage = () => {

    const navigate = useNavigate();

    // Handle the user transition back to home page in order to signup/login
        const handleNavigate = () => {
            navigate('/'); // Direct the user to the login/Sign in page 
        }
    return (
        <ErrorPageContainer>
            <Title>404: Page Not Found</Title>
            <ImageContainer>
                <NotFoundImg src={StackBuddyBot} />
            </ImageContainer>
            <ChatBubble>We can't find the page you're looking for...</ChatBubble>
            <ChatBubble>You may need to Sign Up or Log In...</ChatBubble>
            <NavigateButton onClick={handleNavigate}>Sign Up</NavigateButton>
        </ErrorPageContainer>
    );
};

export default NotFoundPage;