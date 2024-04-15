import React, { useEffect , useState } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StackBuddy from '../components/StackBuddyAI';
 

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




function Workstation() {
  const navigate = useNavigate();
  const [isStackBuddyOpen, setIsStackBuddyOpen] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
      if (!AuthService.loggedIn()) {
          navigate('/login');
      }
  }, [navigate]);

  const toggleStackBuddy = () => setIsStackBuddyOpen(prev => !prev);

  const handleContentChange = (content) => {
    setEditorContent(content);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <PageContainer>
        <Dashboard />
        <ContentContainer>
          <TechDragDrop />
          <ToggleButton onClick={() => setIsStackBuddyOpen(prev => !prev)}>
            {isStackBuddyOpen ? "Hide StackBuddy" : "Use StackBuddy"}
          </ToggleButton>
        </ContentContainer>
        {isStackBuddyOpen && (
          <StackBuddy isVisible={isStackBuddyOpen} onClose={() => setIsStackBuddyOpen(false)} />
        )}
      </PageContainer>
    </DndProvider>
  );
}


export default Workstation;