import React, {useState} from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
// Import hooks from react-dnd
import {useDrag, useDrop } from 'react-dnd';
import {FaDatabase,FaServer, FaReact, FaNode,FaVuejs,FaAngular, FaCss3 } from 'react-icons/fa'; // Example icon
import { UPDATE_PROJECT_TECH } from '../utils/ProjectMutations';

const DragDropContainer = styled.div`
  display: flex;
  //justify-content: center; //removed this as it was overlapping the main screen
  align-items: flex-start;
  max-width: 80vw;
  max-height: 80vh;
  gap: 1rem;
  padding: 5px;
  
`;

// Container for the drag areas
const DragAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%
  flex-wrap: wrap; // Allows items to wrap onto the next line
  gap: 10px; // Adjust as necessary

`;

// Container for the drop zones
const DropZoneContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 30vw;
  gap: 30px; 
`;


const CategoryHeader = styled.h2`
  font-size: 1.5rem;  
  color: #333;        
  margin-bottom: 20px; 
  text-align: center; 
  background: #8e9eab;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #eef2f3, #8e9eab);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #eef2f3, #8e9eab); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-family: 'Poppins', sans-serif; //
  background-color: white;
  padding: 15px;  
  border-radius: 8px; 
  box-shadow: 0 2px 5px rgba(0,0,0,0.35); 
  transition: background-color 0.3s ease, transform 0.2s ease; // smooth transitions for hover effects
  &:hover {
    background-image: linear-gradient(to right, #e6e6e6, #ffffff); // lighter gradient on hover
    transform: translateY(-3px); // subtle lift effect
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); // deeper shadow to accentuate the lift
  `;

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


//updatetechdraganddrop
const Button = styled.div`
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



// Styled component for drop zones
const DropZone = styled.div`
display: flex;
height: 200px;
width: 400px;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 20px;
background-color: #fff;
margin: 10px;
border-radius: 10px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.20);
transition: background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

&:hover {
  background-color: #f0f0f0;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

//  animation: bounce 10s ease infinite;
// }
// @keyframes bounce {
//     70% { transform:translateY(0%); }
//     80% { transform:translateY(-15%); }
//     90% { transform:translateY(0%); }
//     95% { transform:translateY(-7%); }
//     97% { transform:translateY(0%); }
//     99% { transform:translateY(-3%); }
//     100% { transform:translateY(0); }
// }
`;

// Define our 3 Categories and symbols 
// We need 3 categories / DB / SerSide / FrontENd 
// Each Cat will have symbols 
// Each symbol needs {id , icon , label }

// We can pass colors to each symbol now !!
const techCategories = {
  Databases: [
    { id: 'mongodb', icon: <FaDatabase />, label: 'MongoDB', color: '#47A248', description: 'A document-oriented NoSQL database used for high volume data storage.'},
    { id: 'SQL', icon: <FaDatabase />, label: 'SQL Server', color: '#F29111', description: 'A relational database management system developed by Microsoft.'},
    { id: 'PostgreSQL', icon: <FaDatabase />, label: 'PostgreSQL', color: '#336791', description: 'An open source relational database known for reliability and data integrity.'},
    { id: 'Redis', icon: <FaDatabase />, label: 'Redis', color: '#D82C20', description: 'An in-memory data structure store, used as a database, cache, and message broker.'},
    { id: 'MariaDB', icon: <FaDatabase />, label: 'MariaDB', color: '', description: 'A community-developed fork of MySQL intended to remain free under the GNU GPL.'},
    { id: 'OracleDatabase', icon: <FaDatabase />, label: 'Oracle Database', color: '', description: 'A multi-model database management system primarily designed for enterprise grid computing.'},
    { id: 'Firebase', icon: <FaDatabase />, label: 'Firebase', color: '', description: 'A platform developed by Google for creating mobile and web applications.'},
    { id: 'Cassandra', icon: <FaDatabase />, label: 'Cassandra', color: '', description: 'A highly scalable, high-performance distributed database designed to handle large amounts of data.'},
  ],
  ServerSide: [
    { id: 'nodejs', icon: <FaNode />, label: 'Node.js', color: '#47A248', description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine.'},
    { id: 'Express', icon: <FaServer />, label: 'Express', color: '#47A248', description: 'A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'},
    { id: 'AngularServer', icon: <FaAngular />, label: 'Angular Universal', color: '', description: 'Server-side rendering (SSR) with Angular for rendering Angular applications on the server.'},
    { id: 'Django', icon: <FaServer />, label: 'Django', color: '', description: 'A high-level Python web framework that encourages rapid development and clean, pragmatic design.'},
  ],
  FrontEnd: [
    { id: 'React', icon: <FaReact />, label: 'React', color: '', description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.'},
    { id: 'Vue', icon: <FaVuejs />, label: 'Vue.js', color: '', description: 'The Progressive JavaScript Framework that is approachable, versatile, and performant.'},
    { id: 'Angular', icon: <FaAngular />, label: 'Angular', color: '', description: 'A platform for building mobile and desktop web applications using Typescript/JavaScript and other languages.'},
  ],
  FrontendFrameworks: [
    { id: 'Svelte', icon: <FaCss3 />, label: 'Svelte', color: '#47A248', description: 'A radical new approach to building user interfaces, where the work to generate the app happens at build time.'},
    { id: 'NextJs', icon: <FaCss3 />, label: 'Next.js', color: '#47A248', description: 'A React framework for production that provides hybrid static & server rendering, and route pre-fetching.'},
    { id: 'NuxtJs', icon: <FaCss3 />, label: 'Nuxt.js', color: '#47A248', description: 'An intuitive Vue framework that simplifies the development of universal or single-page Vue apps.'},
  ],
  CSSFrameworks: [
    { id: 'Tailwind', icon: <FaCss3 />, label: 'Tailwind CSS', color: '#47A248', description: 'A utility-first CSS framework for rapidly building custom user interfaces.'},
    { id: 'Bootstrap', icon: <FaCss3 />, label: 'Bootstrap', color: '#47A248', description: 'The most popular HTML, CSS, and JS library in the world for building responsive, mobile-first projects on the web.'},
    { id: 'MaterialUI', icon: <FaCss3 />, label: 'Material-UI', color: '#47A248', description: 'A popular React UI framework that features designs based on Material Design.'},
  ],
};

// Main Component
const TechDragDrop = ({projectid}) => {
  // State to track dropped items by category
  const [droppedItems, setDroppedItems] = useState({
    Database: [],
    ServerSide: [],
    FrontEnd: [],
    FrontendFrameworks: [],
    CSSFrameworks: []
  });
  const [updateProjectTech, { data, loading, error }] = useMutation(UPDATE_PROJECT_TECH);

  // Function to handle tech selection update
  const handleUpdateProjectTech = async () => {
    try {
      
      const updatedTechSelection = Object.entries(droppedItems).map(([category, technologies]) => ({
        category,
        technologies,
      }));

      
      await updateProjectTech({
        variables: {
          techSelection: updatedTechSelection,
        },
      });
      
      console.log('Tech selections updated successfully!');
    } catch (err) {
    
      console.error('Error updating tech selections:', err.message);
    }
  };

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
  // pass description to render on modal 
  const DraggableTechSymbol = ({ id, icon, label, color, description }) => {
    // React Dnd for drag functionality 
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
    <DragDropContainer>
      {/* Zones to drag from */}
      <DragAreaContainer>
        {Object.entries(techCategories).map(([category, symbols]) => (
         <div key ={category}>
         <CategoryHeader>{category}</CategoryHeader>
            {symbols.map((symbol) => (
              <DraggableTechSymbol
                key={symbol.id}
                id={symbol.id}
                icon={symbol.icon}
                label={symbol.label}
                color={symbol.color}
              />
            ))}
          </div>
        ))}
        <Button onClick={handleUpdateProjectTech} disabled={loading}>
          Click to update
        </Button>
        {error &&<p> Unable to complete update:{error.message}</p> }
      </DragAreaContainer>

      {/* Drop zones */}
      <DropZoneContainer>
        {["Database", "ServerSide", "FrontEnd"].map((category) => (
          <DropZone key={category} ref={createDropZone(category)}>
            <h3>{category}</h3>
            {droppedItems[category].map((itemId) => {
              const item = Object.values(techCategories)
                .flat()
                .find((i) => i.id === itemId);
              return item ? (
                <TechSymbol key={itemId} onClick={() => removeTechSymbol(category, itemId)} color={item.color}>
                  {item.icon}
                  <div>{item.label}</div>
                </TechSymbol>
              ) : null;
            })}
          </DropZone>
        ))}
      </DropZoneContainer>
    </DragDropContainer>
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


