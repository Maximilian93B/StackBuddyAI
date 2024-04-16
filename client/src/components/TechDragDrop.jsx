import React, { useState } from 'react';
import styled from 'styled-components';
import TechCategory from './TechCategory';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT_TECH } from '../utils/ProjectMutations';
import DropZone from './DropZone';
import { techCategories } from '../utils/techData'; // import tech data 
import DraggableTechSymbol from './DraggableTechSymbol';
import { useProject } from '../utils/UserProjectContext';
// Testing for hard coded Tech symbol
//import { FaDatabase, FaNode, FaReact, FaVuejs, FaAngular, FaCss3, FaServer } from 'react-icons/fa';


const DragDropContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: ;
  margin: 8px;
  width: 90vw;
  height: 100vh;
  gap: 5rem;
`;

const DropZoneContainer = styled.div`
  display: flex;
  height: 90vh;
  width: 25vw;
  flex-direction: column;
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding: 20px;
  border-radius: 8px;
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background: #005C97;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #ccc; /* Gray out the button when disabled */
    cursor: not-allowed;
  }
`;



const TechDragDrop = ({ projectid }) => {
  const newProjectid = "661e7134b21c959549816886";
  projectid = newProjectid;

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
    const updatesTechSelection = {
      add: Object.entries(droppedItems).map(([category, techs]) => ({
          category: projectid,
          technologies: techs.map(tech => tech.id)
      })),
      remove: []
  };

  console.log(JSON.stringify(`This is object to update Tech Selection: ${updatesTechSelection}`, null, 2));

    try {
      await updateProjectTech({
        variables: { 
          projectId: projectid,
          techSelection: updatesTechSelection 
        } 
      });
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
        <StyledButton onClick={handleUpdate} disabled={loading}>
          
        </StyledButton>
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
            <StyledButton onClick={() => handleRemoveItem(category)}>Clear {category}</StyledButton>
            <h3>{category}</h3>
            {droppedItems[category]?.map((item, index) => (
              <DraggableTechSymbol key={index} {...item} />
            ))}
          </DropZone>
        ))}
        {error && <p style={{ color: 'red' }}>Error updating tech stack: {error.message}</p>}
      </DropZoneContainer>  
    </DragDropContainer>
  );
};

export default TechDragDrop;