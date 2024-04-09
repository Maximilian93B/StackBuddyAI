import React, { Children, useState } from 'react';
import styled from 'styled-components';
import CreateProjectForm from './CreateProjectForm';
import { GET_ME } from '../utils/userQueries';
import { useQuery } from '@apollo/client';




// Styled components for dashboard and dropdown menus 
const DashboardContainer = styled.div`
  display: flex;
  min-height: 90vh;
  flex-direction: column;
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const DropdownContainer = styled.div`
  margin: 10px 0;
`;

const DropdownHeader = styled.div`
  cursor: pointer;
  padding: 10px;
  background: #e3e3e3;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d1d1d1;
  }
`;

const DropdownContent = styled.div`
  display: ${props => props.$isOpen ? 'block' : 'none'};
  padding: 10px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 5px;
`;

// Dropdown component to be used in DashBoard 
// Set state to children  
const Dropdown = ({ title, children }) => {
    /// use state to set dashboard open/closed 
    const [isOpen, setIsOpen] = useState(false);

    return(
        <DropdownContainer>
            <DropdownHeader onClick ={() => setIsOpen(!isOpen)} >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </DropdownHeader>
            <DropdownContent $isOpen={isOpen}>
                {children}
            </DropdownContent>
        </DropdownContainer>
    );
};

const Dashboard = () => {

  // Fetch user data using Apollo Client 
  const {loading, error, data } = useQuery(GET_ME);

    return (
     <DashboardContainer>
      <Dropdown title="My Profile">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : data.me ? ( // Check if data.me exists and is not null
          <div>
            <p>Username: {data.me.username}</p>
            <p>Email: {data.me.email}</p>
            {data.me.projects ? ( // Check if data.me.projects exists and is not null
              <p>Projects: {data.me.projects.map(project => project.title).join(', ')}</p>
            ) : (
              <p>No projects found</p>
            )}
          </div>
        ) : (
          <p>No user data found</p>
        )}
        </Dropdown>
        <Dropdown title="My Projects">
          {/* Current Users projects will need to be fetched  */}
          Projects Content
        </Dropdown>
        <Dropdown title="Create A Project">
        {/* Dropdown for creating a new project */}
        <CreateProjectForm />
      </Dropdown>
        {/* Add more dropdowns as needed */}
      </DashboardContainer>
    );
  };
  
  export default Dashboard;

