import React, { useEffect , useState } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import StackBuddy from '../components/StackBuddyAI';
import QuillEditor from '../components/QuillEditor'; 

const PageContainer = styled.div`
  display: flex;
  height: 100vh; // Full height of the viewport
  background: linear-gradient(135deg, #eceff1 0%, #f9f9f9 100%); 
  font-family: "Open Sans", sans-serif;
  letter-spacing: 2px;
  text-decoration: none;
  background: rgb(2,0,36);
background: linear-gradient(139deg, rgba(2,0,36,0.8596230728619573) 0%, rgba(9,45,121,0.741976014038428) 64%, rgba(30,107,142,0.7783905798647583) 100%);

  
`;

const DashboardContainer = styled.div`
  min-width: 250px; // Minimum width of the dashboard
  background-color: #ffffff; // Dashboard background color
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // Add shadow for depth
  padding: 20px; // Padding inside the dashboard
  background: rgb(2,0,36);
background: linear-gradient(139deg, rgba(2,0,36,0.8596230728619573) 0%, rgba(9,45,121,0.741976014038428) 64%, rgba(30,107,142,0.7783905798647583) 100%);

`;

const ContentContainer = styled.div`
flex-grow: 1; // Takes up the remaining space
padding: 20px; // Add padding for some spacing around your content
display: inline-flex; // Use flexbox for internal layout
flex-direction: column; // Stack children vertically
align-items: center; // Center children horizontally

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


&:hover {
  background-color: #45a049; /* Darker shade of green */
}

&:focus {
  outline: none; /* Removes the outline */
}


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
<<<<<<< HEAD
            {isStackBuddyOpen ? "Hide StackBuddy" : "Use StackBuddy👨‍💻"}
          </ToggleButton>       
=======
            {isStackBuddyOpen ? "Hide StackBuddy" : "Use StackBuddy"}
          </ToggleButton>
          <QuillEditor
            initialContent={editorContent}
            handleContentChange={handleContentChange}
          />
>>>>>>> 3187ba7862ca90c39d23af527eaf73ce7f3eebcd
        </ContentContainer>
        {isStackBuddyOpen && (
          <StackBuddy isVisible={isStackBuddyOpen} onClose={() => setIsStackBuddyOpen(false)} />
        )}
      </PageContainer>
    </DndProvider>
  );
}


export default Workstation;