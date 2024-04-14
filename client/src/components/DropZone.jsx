 import React from 'react';
 import {useDrop } from 'react-dnd';
 import styled from 'styled-components';
 
// Styles for DropZone


 const StyledDropZone = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 height: 100%; // Full height to ensure there is space for the button at the bottom
 width: 80%;
 padding: 2px;
 margin: 5px;
 border-radius: 10px;
 background: white;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.20);
`;



const DropZone = ({ onDrop, children, category }) => {



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
    return (
      <StyledDropZone ref={drop}>
        {children}
      </StyledDropZone>
    );
  };

export default DropZone;
  