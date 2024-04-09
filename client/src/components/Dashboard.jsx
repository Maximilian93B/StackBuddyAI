import React, { Children, useState } from 'react';
import styled from 'styled-components';
import CreateProjectForm from './CreateProjectForm';


// Styled components for dashboard and dropdown menus 
const DashboardContainer = styled.div`
  display: flex;
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
    return (
      <DashboardContainer>
        <Dropdown title="User Profile">
          {/* We will dynamically generate user Profile here based on token + _id */}
          Profile Content
        </Dropdown>
        <Dropdown title="Current Projects">
          {/* Current Users projects will need to be fetched  */}
          Projects Content
        </Dropdown>
        <Dropdown title="Create Project">
        {/* Dropdown for creating a new project */}
        <CreateProjectForm />
      </Dropdown>
        {/* Add more dropdowns as needed */}
      </DashboardContainer>
    );
  };
  
  export default Dashboard;

