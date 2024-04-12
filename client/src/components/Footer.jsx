import React from 'react';
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
const FooterContainer = styled.nav`
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
  border-top: 1px solid #f0f0f0; // Light border for a subtle division
  border-bottom: 1px solid #f0f0f0; 
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px 0;
  }
`;


const FooterText = styled.p`
  font-size: 1rem; 
`;

const FooterLinks = styled.div`
  margin: 10px 0;
  display: flex; // To layout links horizontally
  flex-wrap: wrap; // Allow wrapping for multiple links
  justify-content: center; // Center links for better aesthetics
`;


const Link = styled.a`
  color: #e60073; // Neon color for links
  margin: 0 10px; // Space out the links
  text-decoration: none;
  font-size: 0.8rem; 

  &:hover {
    animation: glow 1.5s infinite alternate;
  }
`;



const Footer  = () => {
    return (
    <FooterContainer>
        <FooterText>©{new Date().getFullYear()} StackBuddyAI.All rights reserved</FooterText>
        <FooterLinks>
            <Link> <a href="https://github.com/Maximilian93B/StackBuddyAI" target="_blank">Repository</a></Link>
             </FooterLinks>
    </FooterContainer>
    );
};

export default Footer;