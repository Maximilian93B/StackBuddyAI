import React , { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/ProjectMutations';
import styled from 'styled-components';


const Form = styled.form`
display: flex;
flex-direction: column;
gap: 8px; /* Reduced gap for a more compact look */
width: 90%; /* Adjusted to fit within the dropdown container */
max-width: 400px; /* Slightly reduced to ensure it fits well in the dropdown */
margin: 0 auto; /* Center the form in the dropdown */
padding: 10px;
`;

const Label = styled.label`
font-size: 0.9rem; /* Smaller font size for labels */
  color: #333; /* Slightly darker for better readability */
 padding: 10px;
`;

const Input = styled.input`
padding: 8px;
border-radius: 4px;
border: 1px solid #ccc;
font-size: 0.9rem; 
`;

const TextArea = styled.textarea`
display:flex;
padding: 8px;
border-radius: 4px;
border: 1px solid #ccc;
font-size: 0.9rem;
`;

const Button = styled.button`
padding: 10px 15px;
  border-radius: 4px;
  border: none;
  background-color: #007bff; /* Adjusted to a more standard button color */
  color: white;
  cursor: pointer;
  font-size: 0.9rem; /* Match other form elements */
  transition: background-color 0.3s; /* Smooth transition for user feedback */

  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed; /* Change cursor to indicate the button is disabled */
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessMessage = styled.div`
  color: green;
  margin-top: 10px;
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
  const [createProject, { loading, error , data}] = useMutation(CREATE_PROJECT);
  const [successMessage, setSuccessMessage] = useState('');

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
     const response = await createProject({
        variables: {
          title: formData.title,
          description: formData.description,
          // techSelection: formatTechSelection(formData.techSelection),
        },
      });
     
      if(response.data) {
      // set success message based on the response 
      setSuccessMessage('Project created successfully!');
      setFormData(initialFormState); // Reset form to inital state 
     }
    } catch (error) {
      console.error('Error creating project:', error);
      setSuccessMessage(''); // Ensure no success message is shown on error 
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
        {/**JSX could possibly be bad for ones health ?? */}
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    {error && <ErrorMessage>Error creating project: {error.message}</ErrorMessage>}
    </Form>
  );
};

export default CreateProjectForm;