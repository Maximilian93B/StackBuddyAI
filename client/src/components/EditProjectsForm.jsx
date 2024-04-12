import React, {useState} from 'react';
import { useMutation } from '@apollo/client';
import {UPDATE_PROJECT} from '../utils/ProjectMutations';
import styled from 'styled-components';


// Define styled components
const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-width: 700px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

`;


const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

const TextArea = styled.textarea`
padding: 12px 15px;
  border: 2px solid #007bff;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  height: 150px;

  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;


const Button = styled.button`
=  background-color: #007bff;
color: white;
border: none;
padding: 10px 20px;
border-radius: 8px;
cursor: pointer;
font-size: 16px;
transition: background-color 0.3s;

&:hover {
  background-color: #0056b3;
}

&:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
`;

const StatusMessage = styled.p`
color: ${props => props.error ? 'red' : 'green'};
text-align: center;
font-size: 16px;
padding: 10px;
`;
  // Project edit form component allows editing of project details 

  function ProjectEditForm({ projectId }) {
 // use state to strucutre adding and removing elements 
  

  return (
    <div> Update Project form</div>
  )
    
       
   
}

export default ProjectEditForm;