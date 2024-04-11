import { useLocation } from "react-router-dom";
import React from "react";
import styled from  "styled-components";

const StyledButton = styled.button`
padding:15px;
background-color: b;
    
`;

const Button1 = () => {
    const location = useLocation (); //from react router to get the user location in the app
    let buttonText;
    switch (location.pathname){
        case'/':
        buttonText = 'login/signup';
        break;

        //add more cases here;


        default:
            buttonText = 'ClickMe';
    };
    return (
        <StyledButton>{buttonText}</StyledButton>)
};


export default Button1;