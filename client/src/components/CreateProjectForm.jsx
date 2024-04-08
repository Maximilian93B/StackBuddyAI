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
// 
const initialFormState = {
  title: '',
  description: '',
  techSelection: '',
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
      const techSelectionValue = formData.techSelection || ''; // Define for availability 
      // Prepares variables for the GraphQL mutation from the form data
      const variables = {
         title: formData.title,
         description: formData.description,
         //!!!!! NEED TO FIGURE OUT HOW WE EXPECT techSelection TO BE FORMATTED!! 
         techSelection: techSelectionValue.split(',').map(tech => ({
          category: tech.trim(), // Assuming the category is directly the tech name
          technologies: [], // Adjust based on your actual requirements
      })),
  };
      try {
        await createProject({ variables }); // Execute mutation with prepared variables
        alert('Project created successfully!'); // Show success message
        setFormData(initialFormState); // Reset form to initial state
      }   catch (error) {
        console.error('Error creating project:', error); // Log any error
      }
    };

  // Render the form
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
        <div>
            <Label>Tech Selection (comma-separated)</Label>
            <Input
              name="techSelection"
              type="text"
              value={formData.techSelection}
              onChange={handleInputChange}
            />
        </div>
        <Button type="submit" disabled={loading}>Create Project</Button>
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
    </Form>
);
};

export default CreateProjectForm;