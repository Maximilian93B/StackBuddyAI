import {useLocation} from "react-router-dom";
import React from "react";
import styled from 'styled-components';

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

// animation

@keyframes shake {
  0% { 
    transform: rotate(3deg);
  }
  50% {
   transform: rotate(-5deg);
  }
  70% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(3deg);
  }
}
    animation: shake 2s ease-in-out infinite;
   //

  `;

const Button = () => {
    const location = useLocation(); //From react router to get the user location in the app
    let buttonText;
    switch (location.pathname){
        case'/':
        buttonText = 'Login/SignUp';
        break;

        //add more cases here

        default: 
        buttonText = 'ClickMe';

    }
    return(<StyledButton>{buttonText}</StyledButton>);
};



export default Button;



// Button design: https://getcssscan.com/css-buttons-examples by Michael McMillan