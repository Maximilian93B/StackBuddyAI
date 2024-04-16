import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import styled from 'styled-components';


const Brand = styled.a`
  color: white; // Changed to a more subtle color
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
  background: #005C97;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // Subtle shadow for depth
  padding: 20px 25px; // Reduced padding for a slimmer nav bar
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Poppins', sans-serif; //
 
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;

// Styled NavLink for elegant navigation
const NavLink = styled(RouterNavLink)`
  color: white; // Elegant, darker grey for readability
  text-decoration: none;
  margin: 0 10px; // Reduced margin for a tighter nav
  font-size: 20px;
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
    <NavLink to="/introduction" style={activeStyle}>Introduction</NavLink>
    <NavLink to="/CreateWithStackBuddy" style={activeStyle}>Create With StackBuddy</NavLink>
    <NavLink to="/Workstation" style={activeStyle}>My Workstation</NavLink>
   
  </Nav>
);
}

export default NavBar; 


