 import React from 'react';
 import { useDrop } from 'react-dnd';
 import styled from 'styled-components';
 
// Styles for DropZone


 const StyledDropZone = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 height: 100%; // Full height to ensure there is space for the button at the bottom
 width: 80%;
 padding: 5px;
 margin: 10px;
 border-radius: 10px;
 background: linear-gradient(to bottom, #005C97, white); 
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.20);
`;



const DropZone = ({ onDrop, onRemoveItem, children, category, items = [] }) => {

  // Set up the drop container --> use hook (useDrop)
  const [, drop] = useDrop({
    accept: 'tech', // Specify the drop zone only accetps our tech symbols 
    drop: (item) => {
      // function to handle what happens when symbols are dropped into the dropZone
      onDrop(category, item);
      console.log(`Dropped item ${item.id} in ${category}`,item);// Log details 
    },
    collect: monitor => ({
      // collect function to gather monitoring details about the state when dragging ( react Dnd Docs)
      isOver: !!monitor.isOver() // pass function as prop with the details 
    })
  });


  const handleClick = (item) => {
      console.log(`Item clicked: ${item.id}`,item);
      onRemoveItem(item.id);
  };


  return (
    <StyledDropZone ref={drop}>
        {children}
        {items.map(item => (
            <div key={item.id} onClick={() => handleClick(item)} style={{ padding: '10px', margin: '5px', cursor: 'pointer' }}>
              
            </div>
        ))}
    </StyledDropZone>
  );
};

export default DropZone;
  