
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import StackBuddyInsights from '../components/StackBuddy/AIinsight';
import { useProject } from '../utils/UserProjectContext';
// Added Genereal styles 
import QuillEditor from '../components/QuillEditor';

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
const StackBuddyContainer = styled.div`
width: 100%;
height: 50%;
margin: 150px;
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



const ToggleButton = styled.button`
cursor: pointer;
background-color: #4CAF50; /* Green background */
border: none;
color: white;
padding: 10px 20px;
text-align: center;
text-decoration: none;
font-size: 16px;
margin: 10px 2px;
transition: background-color 0.3s ease;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
font-family: 'Poppins', sans-serif; //
`;



function MyWorkSpace() {
  const navigate = useNavigate();
  // Custom hook for project context
  const { selectedProject } = useProject();

  useEffect(() => {
    console.log('Selected Project', selectedProject);
    // Right logic for project here
    

  }, [selectedProject]); 


  useEffect(() => {
    if (!AuthService.loggedIn()) {
        navigate('/login');
    }
}, [navigate]);


  //Quill Editor 
  const handleChange = (content, delta, source, editor) => {
    setContent(content);
    handleContentChange(editor.getHTML()); // or editor.getText() if you need the text
  };



  // Set state for StackBuddy 
  const [isStackBuddyOpen, setIsStackBuddyOpen] = useState(true);

// Function to toggle StackBuddy 
const toggleStackBuddy = () => {
  setIsStackBuddyOpen(!isStackBuddyOpen);
};


    return (
        <PageContainer>
            <ContentContainer>
            {selectedProject && <ProjectDetails project={selectedProject} />}
            <ToggleButton onClick={toggleStackBuddy}>
            {isStackBuddyOpen ? "Hide StackBuddy" : "Use StackBuddy"}
          </ToggleButton>
          {isStackBuddyOpen && <StackBuddyInsights />}
            <StackBuddyContainer>
            <QuillContainer>
          {selectedProject && <QuillEditor content={selectedProject.description} />}
           </QuillContainer>
          </StackBuddyContainer>
             
            </ContentContainer>
        </PageContainer>
    );
};

export default MyWorkSpace;