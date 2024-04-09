import React, { useEffect } from 'react'
import AuthService from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';
import TechDragDrop from '../components/TechDragDrop';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const WorkstationContainer = styled.div`
  display: flex;
  min-height: 100vh; // Full height of the viewport
`;

const ContentContainer = styled.div`
  flex-grow: 1; // Takes up the remaining space
  padding: 20px; // Add padding for some spacing around your content
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
      <WorkstationContainer>
        <Dashboard />
        <ContentContainer>
            <h1>This is our workstation page</h1>
            <TechDragDrop />{/* This is where you include the drag-and-drop functionality */}
        </ContentContainer>
      </WorkstationContainer>
      </DndProvider>
    );
}

export default Workstation;