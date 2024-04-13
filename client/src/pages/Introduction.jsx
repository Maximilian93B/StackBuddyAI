
import React, {useState} from 'react';
import styled from 'styled-components';
import BackgroundImg from '../assets/tree1.png';
import Button from '../components/button';
import AuthForm from '../components/AuthForm';
// Import AuthForm to render onClick 

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height of the viewport
  background: rgb(237,173,249);
  background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
 `;

const ContentWrapper = styled.div`
  max-width: 1200px; // Maximum width of the content
  width: 100%; // Full width
  padding: 20px; // Padding around the content
  display: flex;
  justify-content: center; // Center the content horizontally
  align-items: center; // Center the content vertically
  
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center; // Centers the text for smaller screens
`;
const ImageContainer = styled.div`
  flex: 1;
  min-height: 550px;
  background-image: url(${BackgroundImg});
  z-index: 100;
  background-size: cover;
  background-position: center;
  color: none;
 
`;
const Header = styled.h1`
  margin-bottom: 20px; // Adjust spacing as needed
   font-family: "Open Sans", sans-serif;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
`;
const SubHeader = styled.p`
  margin-bottom: 20px; // Adjust spacing as needed
  font-family: "Open Sans", sans-serif;
  text-align: justify;
  text-justify: inter-word;
  font-size: 1.25rem;
  
`;


function IntroductionPage() {

  const [isAuthVisible, setIsAuthVisible] = useState(false)

  const toggleAuthForm = () => {
    console.log('Auth Form Toggled:', isAuthVisible);
    setIsAuthVisible(true);
  };

       return (
        <PageContainer>
            <ContentWrapper>
              <ContentContainer>
        <Header>Welcome to Stack-Buddy-AI</Header>
        <SubHeader>Your go-to app for simplifying technology selection in full-stack application development. With the power of AI, we provide personalized recommendations based on your project needs, saving you time and resources. Say goodbye to guesswork and hello to smarter decisions. Join us today and unlock the potential of AI-driven technology selection.</SubHeader>
        <Button onClick={toggleAuthForm}>Join Now</Button>
        {isAuthVisible && <AuthForm/>}
        </ContentContainer>
        <ImageContainer> . </ImageContainer> 
        </ContentWrapper>
        </PageContainer>
    );
};

export default IntroductionPage;

