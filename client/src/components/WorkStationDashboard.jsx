import React, { useState }  from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { GET_ME } from '../utils/userQueries';
import { useSpring , animated} from 'react-spring';
import { useProject } from '../utils/UserProjectContext';



// Styled components for dashboard and dropdown menus 
const DashboardContainer = styled.div`
 display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #005C97; 
  background: linear-gradient(to right, #005C97, #ffffff); /* Gradient from base color to a lighter shade */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// container sepration
const DropdownContainer = styled.div`
  margin: 5px 0px;
`;

// Header 
const DropdownHeader = styled.div`
  cursor: pointer;
  padding: 10px 20px;
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

// Stlying content in dropdowns
const DropdownContent = styled(animated.div)`
  padding: 10px;
  background: #ffffff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 5px;
  overflow: hidden;
`;

// Greeting :)
const GreetingText= styled(animated.span)`
color: white;
font-size: 1.8rem;
margin-bottom: 10px;
`;


const ProjectList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ProjectItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer; 
  &:last-child {
    border-bottom: none;
  }
`;

const ProjectParagraph = styled.p`
  margin: 5px 0;
  color: #333;
  font-size: 0.9rem;
`;

const NoProjectsText = styled.p`
  text-align: center;
  color: #999;
`;


    const Dropdown = ({ title, children,}) => {
        /// use state to set dashboard open/closed 
        const [isOpen, setIsOpen] = useState(false);

        const contentProps = useSpring({
          maxHeight: isOpen? 1000 : 0, // Animate the height from 0 to auto 
          opacity: isOpen ? 1 : 0, // Animate opacity from 0 to 1
          from: { maxHeight: 0, opacity: 0 }, // Initial animation states
          config: { tension : 250, friction: 20 } // Configure the tension and friction 
        });
    
        // Allow users to toggle 
        const toggleDropdown = () => setIsOpen(!isOpen);
    
        return (
          <DropdownContainer>
              <DropdownHeader onClick={toggleDropdown}>
                  {title}
                  <span>{isOpen ? '▲' : '▼'}</span>
              </DropdownHeader>
              <DropdownContent style={contentProps}>
                  {typeof children === 'function' ? children({ isOpen }) : children}
              </DropdownContent>
          </DropdownContainer>
      );
  };
    
// Main component 
const WsDashBoard = () => {
  const { loading, data, error } = useQuery(GET_ME);
  // SetSelectedProkect state to our custom hook to access our defined context for the user
  const { setSelectedProject } = useProject();
  // slide in animation for header 
  
  const GreetingSpring = useSpring({
    from: { opacity: 0, transform: 'translateX(-100%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { tension: 200, friction: 26 } // Customize the animation tension and friction as needed
  });        

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error.message}</p>
  
  return (
    <DashboardContainer>
      <GreetingText style={GreetingSpring}>Welcome, {data.me.username}!</GreetingText>
      <Dropdown title="Custom Info">
      <p>Something can go here.</p>
      </Dropdown>

      <Dropdown title="My Projects">
                {data.me.currentProjects.length > 0 ? (
                    <ProjectList>
                        {data.me.currentProjects.map(project => (
                            <ProjectItem key={project.id} onClick={() => {
                              console.log("Project selected:", project);
                              setSelectedProject(project);
                          }}>
                              <ProjectParagraph>Title: {project.title}</ProjectParagraph>
                          </ProjectItem>
                        ))}
                    </ProjectList>
                ) : (
                    <NoProjectsText>No projects found</NoProjectsText>
                )}
            </Dropdown>

      <Dropdown title="Settings">
      {/* Settings specific to this dashboard */}
      </Dropdown>
      <Dropdown title="Create A Project">

      </Dropdown>
    </DashboardContainer>
  );
};
export default WsDashBoard;