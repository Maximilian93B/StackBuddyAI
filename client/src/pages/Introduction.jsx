import React from "react"
import styled from "styled-components"
import Button1 from "../components/button1";
import InfoTab from './InfoTab';
import HighlevelSelection from "./HighlevelSelection";

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
  background-image: url(${YourImage});
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

       return  (
        <PageContainer>
        <ContentContainer>
        <Title>This is our title</Title>
        <SubHeader>Subheader example</SubHeader>
        <Button1></Button1>
        <InfoTab></InfoTab>
        <HighlevelSelection></HighlevelSelection>
        </ContentContainer>
        <ImageContainer> </ImageContainer>
        
        </PageContainer>
       );
    };
export default Introduction;