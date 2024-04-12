import {useLocation} from "react-router-dom";
import React from "react";
import styled from 'styled-components';

const StyledButton = styled.button`
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px, 5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
`;

/*
Add functionality to button component 
add accept onClick event , children

 */
const Button = ({onClick, children }) => {
   
  return (
  <StyledButton onClick={onClick}>
    {children}
  </StyledButton>
  );
};
   
export default Button;



