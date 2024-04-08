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



// Initial state for the form, resetting all fields to empty or default values
const initialFormState = {
  title: '',
  description: '',
  userQueries: '',
  techSelection: '',
  comments: '',
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
      // Prepares variables for the GraphQL mutation from the form data
      const variables = {
          ...formData,
          userQueries: formData.userQueries.split(',').map(query => query.trim()), // Converts comma-separated string to array
          techSelection: formData.techSelection.split(',').map(tech => ({
              category: tech, // Assumes category is the same as tech name; adjust as needed
              technologies: [], // Currently empty; adjust according to actual data structure
          })),
          comments: formData.comments.split(',').map(comment => comment.trim()), // Converts comma-separated string to array
      };

      try {
          await createProject({ variables }); // Execute mutation with prepared variables
          alert('Project created successfully!'); // Show success message
          setFormData(initialFormState); // Reset form to initial state
      } catch (error) {
          console.error('Error creating project:', error); // Log any error
      }
  };

  // Render the form
  return (
      <Form onSubmit={handleSubmit}>
          <div>
              <Label>Title</Label>
              <Input name="title" type="text" value={formData.title} onChange={handleInputChange} required />
          </div>
          <div>
              <Label>Description</Label>
              <TextArea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>
          <div>
              <Label>User Queries (comma-separated)</Label>
              <Input name="userQueries" type="text" value={formData.userQueries} onChange={handleInputChange} />
          </div>
          <div>
              <Label>Tech Selection (comma-separated)</Label>
              <Input name="techSelection" type="text" value={formData.techSelection} onChange={handleInputChange} />
          </div>
          <div>
              <Label>Comments (comma-separated)</Label>
              <Input name="comments" type="text" value={formData.comments} onChange={handleInputChange} />
          </div>
          <Button type="submit" disabled={loading}>Create Project</Button>
          {error && <ErrorMessage>Error creating project: {error.message}</ErrorMessage>} {/* Display any error messages */}
      </Form>
  );
};

export default CreateProjectForm;