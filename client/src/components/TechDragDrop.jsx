import React from 'react';
import styled from 'styled-components';
// Import hooks from react-dnd
import { DndProvider, useDrag, useDrop } from 'react-dnd';
// Import backend for drag and drop
import { HTML5Backend } from 'react-dnd-html5-backend';

// Styled component for draggable items
const DraggableItem = styled.div`
  padding: 10px;
  margin: 5px;
  background-color: #ddd;
  cursor: move; // Change cursor to indicate draggable
`;

// Styled component for drop zones
const DropZone = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  margin: 10px;
`;

const TechDragDrop = () => {
  // useDrag hook to make item draggable
  // 'type' defines the type of draggable item
  // 'collect' specifies what properties the component should collect from the drag source
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'tech',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Determine if the current item is being dragged
    }),
  }));

  // useDrop hook to define a drop zone
  // 'accept' defines the types of items that can be dropped, 'drop' defines what happens when an item is dropped
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'tech', // This drop zone accepts items of type 'tech'
    drop: () => console.log('Dropped item here'), // Action to perform on drop, here it's just a log for demonstration
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Determine if a draggable item is currently hovering over this drop zone
    }),
  }));

  // Wrap components in DndProvider to provide the React DnD context
  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableItem ref={drag}>Draggable Tech</DraggableItem> {/* Assign 'drag' ref to make this item draggable */}
      <DropZone ref={drop}> {/* Assign 'drop' ref to designate this area as a drop zone */}
        Drop Here
      </DropZone>
    </DndProvider>
  );
};

export default TechDragDrop;
