import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT_TECH } from '../utils/ProjectMutations';
import styled from 'styled-components';
import TechCategory from './TechCategory';
import DropZone from './DropZone';
import { techCategories } from '../utils/techData'; // import tech data 
import DraggableTechSymbol from './DraggableTechSymbol';


const DragDropContainer = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 80vw;
  max-height: 80vh;
  gap: 1rem;
  padding: 5px;
  
`;

const DropZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 30vw;
  height: 100vh;
`;



//updatetechdraganddrop
const StyledButton = styled.button`
  padding: 10px 15px;
  background-color: #4CAF50; /* Green background */
  color: white;
  text-align: center;
  font-size: 16px;
  margin: 10px 2px;
  transition: background-color 0.3s ease;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: absolute;
  top: 457px; /* Adjust as needed */
  right: 342px; /* Adjust as needed */
  line-height: 1;

  &:hover {
    background-color: #45a049; 
  }

  &:focus {
    outline: none; 
  }
`;




// Main Component for managing our Drag and Drop functions

const TechDragDrop = ({ projectid }) => {
  // State for tracking the items that have been dropped into our categories 
  const [droppedItems, setDroppedItems] = useState({});
  // Apollo mutation hook for updating project tech
  const [updateProjectTech, { loading, error }] = useMutation(UPDATE_PROJECT_TECH);


    // Handle dropping of the tech symbols info different categories
  const handleDrop = (category, item) => {
    console.log(`Dropping ${item.id} into ${category}`); // Debugging log
    setDroppedItems(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), item]
    }));
  };


  // Function to update the tech stack based on dropped items
  /**
   * Ike , Arnaoldo i wrote a small function you can start trouble shooting from here 
   *  const updatesTechSelection = Prep data for sending to back end 
   * 
   * PREP THE DATA TO SEND
   * 
   * 1) Object.entries(droppedItems).map(([category, techs]) => ({
    category = Convert the 'droppedItems' object into an array of objects, each object represents a category 

    2) technologies: techs.map(tech => tech.id) = an array of tech Ids within each category 

    **our Backend is expecting a specific format and we need to match it 
    We need to make sure that the data that the tech symbols have is going to match what the back end is expecting 

    3) technologies: techs.map(tech => tech.id) = Maps over the technologies in each category , tries to extract the IDs, only send neccessary data 

     SEND THE DATA to update 

     try { 
      1)Send the uppdate to the backend with our GraphQL mutation 
      2) The 'updateProjectTech' is our mutation that needs to have the right data in it 
      3) IF the data matches, then update the tech stack asssocitaed with the users current project 
      4) log a successfull transaction 


     } catch {
      1) Handle all errors during update 
      2) Make sure we handle mutation and network errors 
      3) log our errors so we can degub 
     }

   */
  const handleUpdate = async () => {
    const updatesTechSelection = Object.entries(droppedItems).map(([category, techs]) => ({
      category,
      technologies: techs.map(tech => tech.id)
    }));
    try {
      await updateProjectTech({ variables: { techSelection: updatesTechSelection } });
      console.log('Tech selection updated successfully!');
    } catch (error) {
      console.error('Error updating Tech:', error.message);
    }
  };

  return (
    <DragDropContainer>
      {Object.entries(techCategories).map(([category, symbols]) => (
        <TechCategory key={category} category={category} symbols={symbols} />
      ))}
      <DropZoneContainer>
        {Object.keys(techCategories).map(category => (
          <DropZone key={category} category={category} onDrop={item => handleDrop(category, item)}>
            <h3>{category}</h3>
            {droppedItems[category]?.map((item, index) => (
              <DraggableTechSymbol key={index} {...item} />
            ))}
          </DropZone>
        ))}
      </DropZoneContainer>
      <StyledButton onClick={handleUpdate} disabled={loading}>
        Update Tech Stack
      </StyledButton>
      {error && <p>Error updating tech stack: {error.message}</p>}
    </DragDropContainer>
  );
};

export default TechDragDrop;


/*
// PROOF OF CONCEPT CODE FOR DRAG AND DROP ZONES 

/*

// Define 1 drop zone 
  const createDropZone = (category) => useDrop(() => ({
    accept: 'tech',
    drop: (item) => console.log(`Dropped ${item.id} in ${category}`),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Declare our 3 Drop Zones with props for each 
  const [databaseProps, dropDatabase] = createDropZone("Database", FaDatabase);
  const [serverSideProps, dropServerSide] = createDropZone("Server-Side", FaServer);
  const [frontEndProps, dropFrontEnd] = createDropZone("Front-End", FaHtml5);
  // Wrap components in DndProvider to provide the React DnD context

  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableItem ref={drag}>Draggable Tech</DraggableItem>
      <DropZone ref={dropDatabase}><IconWrapper><FaDatabase /></IconWrapper><Label>Database</Label></DropZone>
      <DropZone ref={dropServerSide}><IconWrapper><FaServer /></IconWrapper><Label>Server-Side</Label></DropZone>
      <DropZone ref={dropFrontEnd}><IconWrapper><FaHtml5 /></IconWrapper><Label>Front-End</Label></DropZone>
    </DndProvider>
  );
};
export default TechDragDrop;
*/

