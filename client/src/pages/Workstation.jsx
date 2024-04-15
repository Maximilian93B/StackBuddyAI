import React, { useEffect , useState } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StackBuddy from '../components/StackBuddyAI';
import { useProject } from '../utils/UserProjectContext';



// StackBuddy Overlay 
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent background
  z-index: 1000; // Ensure it's on top of everything
`;


const PageContainer = styled.div` 
  display: flex;
  flex-grow:1;
  height:auto; //100vh; // Full height of the viewport
  width: auto;
  font-family: "Open Sans", sans-serif;
  background: #134E5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #71B280, #134E5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #71B280, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
`;


const ContentContainer = styled.div`
display: flex;
flex-grow: 1; // Takes up the remaining space
padding: 10px;
flex-direction: column; // Stack children vertically
align-items: center; // Center children horizontally
font-family: 'Poppins', sans-serif; //
`;

const ToggleButton = styled.button`
cursor: pointer;
background-color: #52E370;
// background: #134E5E;  /* fallback for old browsers */
// background-color: #71B280;  /* Chrome 10-25, Safari 5.1-6 */

// background-color: #4CAF50; /* Green background */
border: none;
// color: white;
padding: 10px 20px;
text-align: center;
text-decoration: none;
font-size: 1.2rem;
margin: 10px 2px;
transition: background-color 0.3s ease;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
font-family: 'Poppins', sans-serif; 
// animation

@keyframes shake {
  0% { 
    transform: rotate(3deg);
  }
  50% {
   transform: rotate(-5deg);
  }
  70% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(3deg);
  }
}
    animation: shake 2s ease-in-out infinite;
`;




function Workstation() {
  const navigate = useNavigate();
  const [isStackBuddyOpen, setIsStackBuddyOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  // Custom hook for managing when a user selects a project
const { selectedProject, setSelectedProject} = useProject();
  
// UseEffect to manage if user is authorized to enter page or not 
useEffect(() => {
      if (!AuthService.loggedIn()) {
          navigate('/login');
      }
  }, [navigate]);

  useEffect(() => {
    // There is where we will do something when the user selects a project 
    console.log('Selected Project in Workstation:', selectedProject)
  }, [selectedProject]);

  
  const toggleStackBuddy = () => setIsStackBuddyOpen(prev => !prev);

  // Quill Editor handler 
  const handleContentChange = (content) => {
    setEditorContent(content);
  };



  return (
    <DndProvider backend={HTML5Backend}>
      <ToggleButton onClick={toggleStackBuddy}>
            {isStackBuddyOpen ? "Hide StackBuddy" : "👨🏽‍💻 StackBuddy"}
          </ToggleButton>
      <PageContainer>
        <Dashboard />
        <TechDragDrop />
        <ContentContainer>
          
          
        </ContentContainer>
        {isStackBuddyOpen && (
          <Overlay>
            <StackBuddy isVisible={isStackBuddyOpen} onClose={() => setIsStackBuddyOpen(false)} />
          </Overlay>
        )}
      </PageContainer>
      
    </DndProvider>
  );
}


export default Workstation;