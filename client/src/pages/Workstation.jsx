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
  height: 100vh; // Full height of the viewport
  background: white;
  font-family: "Open Sans", sans-serif;
  letter-spacing: 2px;
  text-decoration: none;
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


`;

const DashboardContainer = styled.div`
  min-width: 250px; // Minimum width of the dashboard
  background-color: #ffffff; // Dashboard background color
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // Add shadow for depth
  padding: 20px; // Padding inside the dashboard
  background: rgb(2,0,36);
  background: white; 
`;

const ContentContainer = styled.div`
flex-grow: 1; // Takes up the remaining space
display: inline-flex; // Use flexbox for internal layout
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
        <DashboardContainer>
          <Dashboard />
        </DashboardContainer>
        <ContentContainer>
          
          <TechDragDrop />   
          <ToggleButton onClick={toggleStackBuddy}>
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