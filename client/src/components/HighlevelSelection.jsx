import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: calc(100% - 30px);
  margin: 0 auto;
  padding: 20px;
  background-color: #24346b;
  
`;

const Header = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
  color: #f3c20f;
  text-align: center;
  
`;

const Subheader = styled.p`
  font-size: 25px;
  color: #FFF;
  margin-bottom: 20px;
  text-align: center;
`;

const TileContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tile = styled.div`
  width: 30%;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  margin-right: 10px;
`;

const Dropdown = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  display: block; 
  margin: 20px auto 0; 
`;

const HighlevelSelection = () => {
  const [selectedTile, setSelectedTile] = useState('');

  const handleTileChange = (e) => {
    setSelectedTile(e.target.value);
  };

  const handleNextStep = () => {
    // Implement your logic for the "Next Step" button here
    console.log(`Selected tile: ${selectedTile}`);
  };

  return (
    <Container>
      <Header>High-Level Selection</Header>
      <Subheader>Select The Stack:</Subheader>
      <TileContainer>
        <Tile>
          <h3>Choose Your DB</h3>
          <Dropdown onChange={handleTileChange}>
            <option value="">Select...</option>
            <option value="Option A">MySQL</option>
            <option value="Option B">PostgreSQL</option>
            <option value="Option C">Oracle</option>
            <option value="Option D">SQL Server</option>
            <option value="Option E">MongoDB</option>
            <option value="Option f">Couchbase</option>
          </Dropdown>
        </Tile>
        <Tile>
          <h3>Server-Side Technologies</h3>
          <Dropdown onChange={handleTileChange}>
            <option value="">Select...</option>
            <option value="Option A">Express.js</option>
            <option value="Option B">Django</option>
            <option value="Option C">Ruby on Rails</option>
            <option value="Option D">Spring Boot</option>
            <option value="Option E">Laravel</option>
            <option value="Option f">Couchbase</option>
          </Dropdown>
        </Tile>
        <Tile>
          <h3>Front-End Frameworks</h3>
          <Dropdown onChange={handleTileChange}>
            <option value="">Select...</option>
            <option value="Option A">React.js</option>
            <option value="Option B">Angular</option>
            <option value="Option C">Vue.js</option>
            <option value="Option D">Bootstrap</option>
            <option value="Option E">Tailwind CSS</option>
            <option value="Option f">JQuery</option>
            <option value="Option G">Next.js</option>
            
          </Dropdown>
        </Tile>
      </TileContainer>
      <Button onClick={handleNextStep}>Next Step</Button>
    </Container>
  );
};

export default HighlevelSelection;