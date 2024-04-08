import React , { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/ProjectMutations';
import styled from 'styled-components';


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  background-color: blue;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

// Initial state for the form, reseting the form every time 
// We are excluding the comments + userQueries properties for the CreateProject
const initialFormState = {
  title: '',
  description: '',
};

// The CreateProjectForm component
const CreateProjectForm = () => {
  // formData to hold form values, setFormData to update them
  const [formData, setFormData] = useState(initialFormState);
  // useMutation hook from Apollo Client to manage the create project mutation
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  // Updates formData state on input change
  const handleInputChange = (e) => {
      const { name, value } = e.target; // Destructure name and value from event target
      setFormData({ ...formData, [name]: value }); // Update state
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // extract title and descripton from formData

    try {
      await createProject({
        variables: {
          title: formData.title,
          description: formData.description,
          // techSelection: formatTechSelection(formData.techSelection),
        },
      });
      alert('Project created successfully!');
      setFormData(initialFormState); // Reset form to initial state
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  
  
  // Render the form to Create a Project 
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label>Title</Label>
        <Input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label>Description</Label>
        <TextArea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <Button type="submit" disabled={loading}>Create Project</Button>
      {error && <ErrorMessage>Error creating project: {error.message}</ErrorMessage>}
    </Form>
  );
};

export default CreateProjectForm;