import {useLocation} from "react-router-dom";
import React from "react";
import styled from 'styled-components';

const StyledButton = styled.button`
padding: 15px;
background-color: red;
color: black;
border-radius: 4px;
`;

const Button1 = () => {
    const location = useLocation(); //From react router to get the user location in the app
    let buttonText;
    switch (location.pathname){
        case'/introduction':
        buttonText = 'Login/SignUp';
        break;

        //add more cases here

        default: 
        buttonText = 'ClickMe';

    }
    return(<StyledButton>{buttonText}</StyledButton>);
};



export default Button1;






