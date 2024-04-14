import React from 'react';
import DraggableTechSymbol from './DraggableTechSymbol';
import styled from 'styled-components';



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


  const TechCategory = ({ category, symbols }) => (
    <div>
      <CategoryHeader>{category}</CategoryHeader>
      {symbols.map(symbol => (
        <DraggableTechSymbol key={symbol.id} {...symbol} />
      ))}
    </div>
  );

  export default TechCategory;
  


