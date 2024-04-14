
import React from "react";
import styled from 'styled-components';



/*
const StyledButton = styled.button`
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #F04E08;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;
*/

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



/*
Add functionality to button component 
add accept onClick event , children
We handle the redirect in the AuthForm
 */
const Button = ({onClick, children }) => {
   
  return (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
  );
};
   
export default Button;



