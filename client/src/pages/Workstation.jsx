import React, { useEffect , useState } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StackBuddyAI from '../components/StackBuddyAI';  // Adjust the path according to your project structure
import { useProject } from '../utils/UserProjectContext';
import QuillEditor from '../components/QuillEditor';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const PageContainer = styled.div` 
  display: flex;
  flex-grow:1;
  height:auto; //100vh; // Full height of the viewport
  width: 100vw;
  font-family: "Open Sans", sans-serif;
  background: #134E5E;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #71B280, #134E5E);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ffffff, #134E5E); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */ 
`;


const ContentContainer = styled.div`
 width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const ButtonContainer = styled.div`
position: fixed; // Fix the button on the viewport
  bottom: 10%;
  right: 86%;
  z-index: 1100; // Higher z-index to ensure it's on top of all other conten
`;




const ToggleButton = styled.button`
cursor: pointer;
background-color: #52E370;
border: none;
padding: 10px 20px;
text-align: center;
text-decoration: none;
font-size: 1.2rem;
margin: 10px 2px;
transition: background-color 0.3s ease;
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
font-family: 'Poppins', sans-serif;
color: white; // Ensure text is visible
`;




function Workstation() {
  const navigate = useNavigate();
  const [isStackBuddyOpen, setIsStackBuddyOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  // Custom hook for managing when a user selects a project
  const { selectedProject, setSelectedProject} = useProject();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
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

  
 // StackBuddy Toggle 
 const toggleStackBuddy = () => setIsStackBuddyOpen(!isStackBuddyOpen);


  // Quill Editor handler 
  const handleContentChange = (content) => {
    setEditorContent(content);
  };
  // Toggle quill edtior 
  const toggleEditor = () => {
    setIsEditorOpen(!isEditorOpen);
    console.log("Editor toggled", isEditorOpen); // Debug: Check if state changes
  };


  return (
    <DndProvider backend={HTML5Backend}>
      <PageContainer>
        <Dashboard />
        <TechDragDrop />
        <ButtonContainer>
          <ToggleButton onClick={toggleStackBuddy}>
            {isStackBuddyOpen ? 'Hide StackBuddy' : 'Show StackBuddy'}
          </ToggleButton>
          <ToggleButton onClick={toggleEditor}>
            {isEditorOpen ? 'Hide Editor' : 'Show Editor'}
          </ToggleButton>
        </ButtonContainer>
        {isStackBuddyOpen && (
          <Overlay>
            <StackBuddyAI isVisible={isStackBuddyOpen} onClose={() => setIsStackBuddyOpen(false)} />
          </Overlay>
        )}
        {isEditorOpen && (
          <Overlay>
          <QuillEditor
            initialContent={editorContent}
            handleContentChange={handleContentChange}
          />
          </Overlay>
        )}
      </PageContainer>
    </DndProvider>
  );
}


export default Workstation;