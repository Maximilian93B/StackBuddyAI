import React from 'react';
import styled from 'styled-components';
import BackgroundImg from '../assets/Summer_Beach_Background_Image.jpg';
import Button1 from '../components/button1';

// const Body = styled.div `
//  background: radial-gradient(circle at 7.5% 24%, rgb(237, 161, 193) 0%, rgb(250, 178, 172) 25.5%, rgb(190, 228, 210) 62.3%, rgb(215, 248, 247) 93.8%);
// `;

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
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
  background-image: url(${BackgroundImg});
  background-size: cover;
  background-position: center;
`;
const Header = styled.h1`
  margin-bottom: 20px; // Adjust spacing as needed
`;
const SubHeader = styled.h2`
  margin-bottom: 20px; // Adjust spacing as needed
`;


const IntroductionPage = () => {
return (
  <PageContainer>
    <ContentContainer>
        <Header>Test header hola :D</Header>
        <SubHeader>This is a subheader</SubHeader>
        <Button1/>
            </ContentContainer>
            <ImageContainer />
  </PageContainer>

 );

};



export default IntroductionPage;
