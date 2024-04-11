import React, {useState} from 'react';
import styled from 'styled-components';
// Import hooks from react-dnd
import {useDrag, useDrop } from 'react-dnd';
// Import backend for drag and drop

import {FaDatabase, FaServer, FaReact, FaNode,FaVuejs,FaAngular} from 'react-icons/fa'; // Example icon


const TechSymbol = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 10px;
margin: 5px 10px;
background-color: ${(props) => props.color || 'white'};
border-radius: 8%;
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
cursor: grab;
transition: transform 0.2s ease;

&:hover {
  transform: scale(1.05);
}

.remove-icon {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  display: none;
}

&:hover .remove-icon {
  display: block;
}
`;

// Styled component for drop zones
const DropZone = styled.div`
padding: 20px;
background-color: #fff;
margin: 10px;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
display: flex;
min-height: 100px;
align-items: center;
justify-content: center;
flex-direction: column;
transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

&:hover {
  background-color: #f0f0f0;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
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

// Define our 3 Categories and symbols 
// We need 3 categories / DB / SerSide / FrontENd 
// Each Cat will have symbols 
// Each symbol needs {id , icon , label }

// We can pass colors to each symbol now !!
const techCategories = {
  Databases: [
    { id: 'mongodb', icon: <FaDatabase />, label: 'MongoDB', color: '#47A248' }, // MongoDB Green
    { id: 'SQL', icon: <FaDatabase />, label: 'SQL', color: '#F29111' }, // SQL Orange (Generic SQL color; may vary)
    { id: 'PostgreSQL', icon: <FaDatabase />, label: 'PostgreSQL', color: '#336791' }, // PostgreSQL Blue
    { id: 'Redis', icon: <FaDatabase />, label: 'Redis', color: '#D82C20' }, // Redis Red
    { id: 'MariaDB', icon: <FaDatabase />, label: 'MariaDB', color: '' }, // MariaDB Dark Blue
    { id: 'OracleDatabase', icon: <FaDatabase />, label: 'Oracle Database', color: '' }, // Oracle Red
    { id: 'Firebase', icon: <FaDatabase />, label: 'Firebase', color: '' }, // Firebase Yellow
    { id: 'Cassandra', icon: <FaDatabase />, label: 'Cassandra', color: '' }, // Cassandra Blue
  ],
  ServerSide: [
    { id: 'nodejs', icon: <FaNode />, label: 'Node.js', color: '' }, // Node.js Green
    { id: 'Express', icon: <FaServer />, label: 'Express', color: '' }, // Express doesn't have a specific color, using black
    { id: 'AngularServer', icon: <FaAngular />, label: 'Angular', color: '' }, // Angular Red (Typically frontend, including for conceptual consistency)
    { id: 'Django', icon: <FaServer />, label: 'Django', color: '' }, // Django Dark Green
    // Add other server-side symbols here
  ],
  FrontEnd: [
    { id: 'React', icon: <FaReact />, label: 'React', color: '' }, // React Blue
    { id: 'Vue', icon: <FaVuejs />, label: 'Vue', color: '' }, // Vue.js Green
    { id: 'Angular', icon: <FaAngular />, label: 'Angular', color: '' }, // Angular Red
    // Add other front-end symbols here
  ],
};

// Main Component
const TechDragDrop = () => {
  // State to track dropped items by category
  const [droppedItems, setDroppedItems] = useState({
    Database: [],
    ServerSide: [],
    FrontEnd: [],
  });

  // Remove Items from the DropZone 
  const removeTechSymbol = (category,itemId) => {
    setDroppedItems(prevState => ({
      ...prevState,
      [category]: prevState[category].filter(id=> id !== itemId),
    }));
  };

  // Component for the draggable tech symbol 
  //useDrag 
  // includes {type,item,collect: monitor() => action + state }
  // return the drag icon 

  // {pass id , icon , label , color}  to techsymbol 
  const DraggableTechSymbol = ({ id, icon, label, color }) => {
    const [, drag] = useDrag(() => ({
      type: 'tech',
      item: { id },
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));
  
    return (
      <TechSymbol ref={drag} color={color}>
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
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', gap: '40px' }}> {/*styles for Tech categories */}
        {Object.entries(techCategories).map(([category, symbols]) => (
          <div key={category}>
            <h2>{category}</h2>
            {symbols.map((symbol) => (
              <DraggableTechSymbol key={symbol.id} id={symbol.id} icon={symbol.icon} label={symbol.label} color={symbol.color} />
            ))}
          </div>
        ))}
      </div>
      {/* Drop zones */}
      {/* The UI error that is displaying 'Click to remove' is in this block */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
        {["Database", "ServerSide", "FrontEnd"].map(category => (
          <DropZone key={category} ref={createDropZone(category)}>
            <h3>{category}</h3>
            {droppedItems[category].map(itemId => {
              const item = Object.values(techCategories).flat().find(i => i.id === itemId);
              return item ? (
                <TechSymbol key={itemId} onClick={() => removeTechSymbol(category, itemId)}>
                {item.icon}
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


