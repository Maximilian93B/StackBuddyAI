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
background: #005C97;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
padding: 10px;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;


const TechDragDrop = ({ projectid }) => {
  const [droppedItems, setDroppedItems] = useState({});
  const [updateProjectTech, { loading, error }] = useMutation(UPDATE_PROJECT_TECH);

  // State to manage the Slide up Effect 


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
    setDroppedItems(prevItems => ({
      ...prevItems,
      [category]: []  // Resets only the specified category
    }));
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
            items={droppedItems[category] || []}
            handleUpdate={handleUpdate}
            loading={loading}
          >
            <button onClick={() => handleRemoveItem(category)}>Clear {category}</button>
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
