import React, { useState } from 'react';
import styled from 'styled-components';
import TechCategory from './TechCategory';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT_TECH } from '../utils/ProjectMutations';
import DropZone from './DropZone';
import { techCategories } from '../utils/techData'; // import tech data 
import DraggableTechSymbol from './DraggableTechSymbol';
// Testing for hard coded Tech symbol
//import { FaDatabase, FaNode, FaReact, FaVuejs, FaAngular, FaCss3, FaServer } from 'react-icons/fa';

const DragDropContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80vw;
  height: 60vh;
  gap: 5rem;
`;

const DropZoneContainer = styled.div`
display: flex;
min-height: 100vh;
width: 30vw;
flex-direction: column;
background: #BBD2C5;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #536976, #BBD2C5);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #536976, #BBD2C5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
padding: 10px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const TechDragDrop = ({ projectid }) => {
  const [droppedItems, setDroppedItems] = useState({});
  const [updateProjectTech, { loading, error }] = useMutation(UPDATE_PROJECT_TECH);

  // Handle dropping items into categories
  const handleDrop = (category, item) => {
    setDroppedItems(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), item]
    }));
    console.log(`Dropping ${item.id} into ${category}`);
  };

  // Handle updating the tech stack
  const handleUpdate = async () => {
    const updatesTechSelection = Object.entries(droppedItems).map(([category, techs]) => ({
      category,
      technologies: techs.map(tech => tech.id)
    }));

    try {
      await updateProjectTech({ variables: { techSelection: updatesTechSelection } });
      console.log('Tech selection updated successfully!');
    } catch (error) {
      console.error('Error updating tech stack:', error.message);
    }
  };

  // Handle removing a smybol from the DropZOne 
  const handleRemoveItem = (category, id) => {
    setDroppedItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
    console.log(`Removed item ${id} from ${category}`);
  };



  return (
    <DragDropContainer>
      {Object.entries(techCategories).map(([category, symbols]) => (
        <TechCategory key={category} category={category} symbols={symbols} />
      ))}
      <DropZoneContainer>
        {Object.keys(techCategories).map(category => (
          <DropZone
            key={category}
            category={category}
            onDrop={handleDrop}
            onRemoveItem={(id) => handleRemoveItem(category, id)}
            handleUpdate={handleUpdate}
            loading={loading}
          >
            <h3>{category}</h3>
            {droppedItems[category]?.map((item, index) => (
              <DraggableTechSymbol key={index} {...item} />
            ))}
          </DropZone>
        ))}
      </DropZoneContainer>  
      {error && <p style={{ color: 'red' }}>Error updating tech stack: {error.message}</p>}
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

