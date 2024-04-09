import React, {useState} from 'react';
import styled from 'styled-components';
// Import hooks from react-dnd
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// Import backend for drag and drop

import {FaDatabase, FaServer, FaReact, FaNode,FaVuejs,FaAngular} from 'react-icons/fa'; // Example icon


const TechSymbol = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  margin: 5px 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: grab;
`;

// Styled component for drop zones
const DropZone = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  min-height: 100px
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transition: all 0.2s ease-in-out;
 
  &:hover {
    background-color: #e8e8e8; // Change background color on hover
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); // Add a shadow for depth
    cursor: pointer; // Change cursor to indicate clickable
  }
`;

/*
const IconWrapper = styled.div`
  font-size: 24px;
  margin-bottom: 10px;
`;
const Label = styled.div`
  font-weight: bold;
`;
*/

const techCategories = {
  Databases: [
    { id: 'mongodb', icon: <FaDatabase />, label: 'MongoDB' },
    { id: 'SQL', icon: <FaDatabase />, label: 'SQL' },
    { id: 'PostgreSQL', icon: <FaDatabase />, label: 'PostgreSQL' },
    { id: 'Redis', icon: <FaDatabase />, label: 'Redis' },
    { id: 'MariaDB', icon: <FaDatabase />, label: 'MariaDB' },
    { id: 'OracleDatabase', icon: <FaDatabase />, label: 'Oracle Database' },
    { id: 'Firebase', icon: <FaDatabase />, label: 'Firebase' },
    { id: 'Cassandra', icon: <FaDatabase />, label: 'Cassandra' },


    // Add other database symbols here
  ],
  ServerSide: [
    { id: 'nodejs', icon: <FaNode />, label: 'Node.js' },
    { id: 'Express', icon: <FaServer />, label: 'Express' },
    { id: 'AngluarServer', icon:  <FaAngular />, label: 'Angluar' },
    { id: 'Django', icon: <FaServer />, label: 'Django' },
    // Add other server-side symbols here
  ],
  FrontEnd: [
    { id: 'React', icon:  <FaReact/>, label: 'React' },
    { id: 'Vue', icon:  <FaVuejs />, label: 'Vue' },
    { id: 'Angluar', icon:  <FaAngular />, label: 'Angluar' },
    
    /**
     
     */
    
    // Add other front-end symbols here
  ],
};


// Define our tech symbols 
// Assuming you have imported your SVG icons/components as React components

const TechDragDrop = () => {
  // State to track dropped items by category
  const [droppedItems, setDroppedItems] = useState({
    Database: [],
    ServerSide: [],
    FrontEnd: [],
  });

  // Remove Items from the DropZone 
  // Find category and itemID of symbol to remove 
  const removeTechSymbol = (category,itemId) => {
    setDroppedItems(prevState => ({
      ...prevState,
      [category]: prevState[category].filter(id=> id !== itemId),
    }));
  };

  const DraggableTechSymbol = ({ id, icon, label }) => {
    const [, drag] = useDrag(() => ({
      type: 'tech',
      item: { id },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    return (
      <TechSymbol ref={drag}>
        {icon}
        <div>{label}</div>
      </TechSymbol>
    );
  };

  // Function to create a drop zone
  const createDropZone = (category) => {
    const [, drop] = useDrop(() => ({
      accept: 'tech',
      drop: (item) => {
        // Add dropped item to the appropriate category
        setDroppedItems((prevState) => ({
          ...prevState,
          [category]: [...prevState[category], item.id],
        }));
        // Log item picked and what category dropped in 
        console.log(`Dropped ${item.id} in ${category}`);
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return drop;
  };

  return (
    <>
     {/* Zones to drag from */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', gap: '40px' }}>
        {Object.entries(techCategories).map(([category, symbols]) => (
          <div key={category}>
            <h2>{category}</h2>
            {symbols.map((symbol) => (
              <DraggableTechSymbol key={symbol.id} id={symbol.id} icon={symbol.icon} label={symbol.label} />
            ))}
          </div>
        ))}
      </div>
      {/* Drop zones */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        {["Database", "ServerSide", "FrontEnd"].map(category => (
          <DropZone key={category} ref={createDropZone(category)}>
            <h3>{category}</h3>
            {droppedItems[category].map(itemId => {
              const item = Object.values(techCategories).flat().find(i => i.id === itemId);
              return item ? (
                <TechSymbol key={itemId} onClick={() => removeTechSymbol(category, itemId)}>
                {item.icon}
                title = 'Click to remove'
                <div>{item.label}</div>
              </TechSymbol>
            ) : null;
            })}
          </DropZone>
        ))}
      </div>
      </>
  );
};



export default TechDragDrop;


  
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


