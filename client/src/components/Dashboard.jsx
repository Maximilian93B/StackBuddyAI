import React, {  useState } from 'react';
import styled from 'styled-components';
import CreateProjectForm from './CreateProjectForm';
import { GET_ME } from '../utils/userQueries';
import { useQuery } from '@apollo/client';
import { useSpring, animated} from 'react-spring';
import  Spinner  from './Spinner';

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

const DropdownContent = styled(animated.div)`
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
  
    const contentProps = useSpring({

      maxHeight: isOpen? 1000 : 0, // Animate the height from 0 to auto 
      opacity: isOpen ? 1 : 0, // Animate opacity from 0 to 1
      from: { maxHeight: 0, opacity: 0 }, // Initial animation states
      config: { tension : 250, friction: 20 } // Configure the tension and friction 
    });

    return(
        <DropdownContainer>
            <DropdownHeader onClick ={() => setIsOpen(!isOpen)} >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
            </DropdownHeader>
            <DropdownContent style={contentProps}>
                {children}
            </DropdownContent>
        </DropdownContainer>
    );
};

const Dashboard = () => {

  // Fetch user data using Apollo Client 
  // use GET_ME to fetch all user data first 
  // then display data in dashbaord 
  /*
   My Profile = username + email 
    My Projects = [currentProjects]
    Create Project = imported CreateProject Form component. 
   */

    // Fetch user data ( GET_ME) 
   const { loading, data, error } = useQuery(GET_ME);

   // If loading return loading // We should add setTimeout and a spinner ?? 
    // if error log error 
    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>;


    return (
      <DashboardContainer>
        Hello, {data.me.username}!                 
        
        <Dropdown title="My Profile">
          <>
          <p>Username: {data.me.username}</p>
          <p>Email: {data.me.email}</p>
          </>
        </Dropdown>
        <Dropdown title="My Projects">
          <>
          {data.me.currentProjects.length > 0 ? (
            <ul>
              {data.me.currentProjects.map((project) => (
                <li key={project.id}>
                  <p>Title: {project.title}</p>
                  <p>Description: {project.description}</p>
                  <p>Tech Stack: {project.techSelection.map(tech => `${tech.category}: ${tech.technologies.join(', ')}`).join('; ')}</p>
                  <p>Comments: {project.comments.join(', ')}</p>
                  <p>Date: {new Date(project.dateStamp).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
            ) : (
            <p>No projects found</p>  
          )}
          </>
        </Dropdown>
        <Dropdown title="Create A Project">
        {/* Dropdown for creating a new project */}
        <CreateProjectForm />
      </Dropdown>
        {/* Add more dropdowns if we need any*/}
      </DashboardContainer>
    );
  };
  
  export default Dashboard;

