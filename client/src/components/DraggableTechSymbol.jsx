import React from 'react';
import { useDrag } from 'react-dnd';
import styled from 'styled-components';


// Styles realted to TechSymbols 
const TechSymbol = styled.div`
display: flex;
align-items: center;
justify-content: center;
padding: 10px;
margin: 15px 10px;
background-color: ${props => props.color || '#f0f0f0'};
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0,0,0,0.20);
cursor: grab;
transition: transform 0.2s ease;
width: 100px;
height: 40px;
&:hover {
  transform: scale(1.05);
}
// Removing the icon 

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

    // Component for Dragable Tech 

const DraggableTechSymbol = ({ id, icon, label, color,}) => {
    // Set up the destructure of 'isDragging' from useDrag hook and collect the state using collect property
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'tech', // Type of symbol to be dragged
      item: { id }, // Data of the symbol
      collect: monitor => ({isDragging: !!monitor.isDragging(),
      }), // Collect dragging to adjust apprearance 
    }));

    // Return the TechSymbol with drag ref and styles 
    return (
      <TechSymbol ref={drag} color={color} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {icon}
        <div>{label}</div>
      </TechSymbol>
    );
  };

  export default DraggableTechSymbol; 