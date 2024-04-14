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
background: #005C97;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
box-shadow: 2px 0px 4px rgba(0, 0, 0, 0.3); // Subtle shadow for depth
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
            <Link></Link>
             </FooterLinks>
    </FooterContainer>
    );
};

export default Footer;