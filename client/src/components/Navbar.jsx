import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import styled from 'styled-components';


const Brand = styled.a`
  color: #333; // Changed to a more subtle color
  font-weight: 700;
  text-decoration: none;
  margin-right: auto; // Keeps nav links to the right
  font-size: 1.5em; // Larger font size for the brand
  padding-left: 20px; // Spacing from the left edge
`;

// Styles for Nav Container 
const Nav = styled.nav`
  position: sticky; 
  top: 0; 
  z-index: 10; // Ensuring it stays above other content
  background: #fff; // Elegant white background
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  padding: 10px 25px; // Reduced padding for a slimmer nav bar
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Open Sans', sans-serif; // Switched to a more elegant and readable font
  border-bottom: 1px solid #f0f0f0; // Light border for a subtle division
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

// Styled NavLink for elegant navigation
const NavLink = styled(RouterNavLink)`
  color: #555; // Elegant, darker grey for readability
  text-decoration: none;
  font-weight: 600;
  margin: 0 15px; // Reduced margin for a tighter nav
  transition: color 0.3s ease; // Smooth transition for hover effect

  &:hover {
    color: #000; // Dark color on hover for contrast
  }
`;


// Function to style the active NavLink
const activeStyle = ({ isActive }) => isActive ? { color: '#007bff', fontWeight: 'bold' } : {};
    
const NavBar =() => {
return(
    <Nav>
    <Brand href="/">StackBuddyAI</Brand>
    <NavLink to="/" style={activeStyle}>Home</NavLink>
    <NavLink to="/introduction" style={activeStyle}>About Me</NavLink>
    <NavLink to="/HSL" style={activeStyle}>Projects</NavLink>
    <NavLink to="/Workstation" style={activeStyle}>Skills</NavLink>
  </Nav>
);
}

export default NavBar; 


