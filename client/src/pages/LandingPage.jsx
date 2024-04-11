import React from 'react';
import styled from 'styled-components';
import Signup from '../components/AuthForm';


// Added Genereal styles 

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Full height of the viewport
  background: linear-gradient(135deg, #eceff1 0%, #f9f9f9 100%); // Subtle gradient background
`;


const ContentWrapper = styled.div`
  max-width: 1200px; // Maximum width of the content
  width: 100%; // Full width
  padding: 20px; // Padding around the content
  display: flex;
  justify-content: center; // Center the content horizontally
  align-items: center; // Center the content vertically
`;


function LandingPage() {
    return (
        <PageContainer>
            <ContentWrapper>
                <Signup />
            </ContentWrapper>
        </PageContainer>
    );
};

export default LandingPage;