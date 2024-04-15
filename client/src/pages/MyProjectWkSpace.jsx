import React from 'react';
import styled from 'styled-components';
import Dashboard from '../components/Dashboard';
import QuillEditor from '../components/QuillEditor';

// Added Genereal styles 

const PageContainer = styled.div` 
  display: flex;
  flex-grow:1;
  height: 100vh; // Full height of the viewport
  width: 100vw;
  font-family: "Open Sans", sans-serif;
  background: #134E5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #71B280, #134E5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #71B280, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
`;


const DashboardContainer = styled.div`
margin-top: 20px;
width: 20vw;
height: 100vh;
background-color: rgba(255, 255, 255, 0.1); // Semi-transparent or any other style
display: flex;
justify-content: center;
align-items: center; // Center the content inside
`;

const ContentContainer = styled.div`
width: 60vw;
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
overflow-y: auto; // In case the content overflows
`;

const ProjectsContainer = styled.div`
width: 20vw; 
height: 100vh;
background-color: white;
`;

// Takes up top of Content
const StackBuddyContianer = styled.div`
width: 100%;
height: 50%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;


// takes up bottom half on contnet container
const QuillContainer = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function MyWorkSpace() {
    return (
        <PageContainer>
          <DashboardContainer>
          <Dashboard />
          </DashboardContainer>
            <ContentContainer>
              <StackBuddyContianer>

              </StackBuddyContianer>
            <QuillContainer>
              <QuillEditor/>
            </QuillContainer>

            </ContentContainer>
            <ProjectsContainer>
              <Dashboard/>
            </ProjectsContainer>
        </PageContainer>
    );
};

export default MyWorkSpace;