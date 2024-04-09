import React, { useEffect } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const PageContainer = styled.div`
  display: flex;
  height: 100vh; // Full height of the viewport
  background: linear-gradient(135deg, #eceff1 0%, #f9f9f9 100%); // Subtle gradient background
`;

const DashboardContainer = styled.div`
  min-width: 250px; // Minimum width of the dashboard
  background-color: #ffffff; // Dashboard background color
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1); // Add shadow for depth
  padding: 20px; // Padding inside the dashboard
`;

const ContentContainer = styled.div`
flex-grow: 1; // Takes up the remaining space
padding: 20px; // Add padding for some spacing around your content
display: flex; // Use flexbox for internal layout
flex-direction: column; // Stack children vertically
align-items: center; // Center children horizontally
`;




function Workstation() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!AuthService.loggedIn()) {
            navigate('/login');
        }
    }, [navigate]);
    
    return (
      <DndProvider backend={HTML5Backend}>
        <PageContainer>
      <DashboardContainer>
        <Dashboard />
        </DashboardContainer>
        <ContentContainer>
            <h1>This is our workstation page</h1>
            <TechDragDrop />{/* This is where you include the drag-and-drop functionality */}
        </ContentContainer>
      </PageContainer>
      </DndProvider>
    );
}

export default Workstation;