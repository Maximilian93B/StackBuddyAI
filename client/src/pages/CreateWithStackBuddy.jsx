import React, {useState} from "react";
import styled from "styled-components";
import {useSpring, animated} from 'react-spring';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/ProjectMutations';
import axios from "axios";
import { FaLightbulb } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 100vh;
width: 100vw;
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
font-family: 'Poppins', sans-serif; //
`;


const AnimatedHeader = styled(animated.h1)`
  color: white;
  text-align: center;
  font-size: 3.7rem; // Customize size as needed
  margin-top: 5vh;
  
`;

// User input field 
const InputField = styled.input`
width: 60%;
padding: 15px;
font-size: 1.2rem;
border-radius: 8px;
border: 2px solid #ccc;
outline: none;
margin-bottom: 20px;
&:focus {
  border-color: #007BFF;
}
`;


// Insights Display Text
const InsightsContainer = styled.div`
color: #ffffff;
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
border-radius: 8px;
padding: 20px;
margin-top: 20px;
font-size: 1.5rem;
line-height: 1.6;
white-space: pre-wrap;
`;


// StackBuddy Insights Header 
const InsightHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;


const SuccessMessage = styled.div`
font-size: 1.2rem;
color: #ffffff;
`;

const ProceedButton = styled.button`
  padding: 10px 20px;
  background-color: #007BFF;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
`;


// Spacer for navigate button 
const Spacer = styled.div`
  height: 20px; // Adjust the height for more or less space
`;

const CreateWithStackBuddy = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [enteringTitle, setEnteringTitle] = useState(true);
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);
  const [successMessage, setSuccessMessage] = useState('');
  const [insights, setInsights] = useState('');
  const navigate = useNavigate();

  const fetchInsights = async (title, description) => {
    try {
      const response = await axios.post('http://localhost:3001/openai', { query: `${title}. ${description}` });
      setInsights(response.data.message);
    } catch (error) {
      console.error('Error fetching StackBuddy insights:', error);
      console.log(error.response ? error.response.data : error.message);
      setInsights('Failed to fetch insights. Please try again');
    }
  };

  const handleSubmit = async () => {
    if(!enteringTitle) {
      try {
        const response = await createProject({
          variables: {
            title: inputTitle,
            description: inputDescription
          },
        });

        if(response.data.createProject) {
          setSuccessMessage('Project created successfully!');
          fetchInsights(inputTitle, inputDescription); // Fetch insights after creating the project
          setInputTitle('');
          setInputDescription('');
          setEnteringTitle(true); // Reset to title entry for new projects
        }
      } catch (e) {
        console.error('Error creating project:', e);
        setSuccessMessage('Failed to create project.');
      }
    } else {
      setEnteringTitle(false);
    }
  };


  // Send handleSubmit() on Enter key 
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Prompt the user to go to the /Workspace page
  const handleNavigate = () => {
    navigate('/workstation')
  };

  // Header animations
  const headerProps = useSpring({
    from: { opacity: 0, transform: 'translateY(-30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 300,
  });

  return (
    <Container>
    <AnimatedHeader style={headerProps}>
      {enteringTitle ? 'Creat a Project With StackBuddy!' : 'Tell StackBuddy about your idea.'}
    </AnimatedHeader>
    <InputField
      type="text"
      placeholder={enteringTitle ? "Type your project's title..." : "Enter your project details"}
      value={enteringTitle ? inputTitle : inputDescription}
      onChange={e => enteringTitle ? setInputTitle(e.target.value) : setInputDescription(e.target.value)}
      onKeyPress={handleKeyPress}
    />
    {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    {insights && (
      <InsightsContainer>
        <InsightHeader>
          <FaLightbulb style={{ marginRight: '10px' }} /> {/* Icon with some spacing */}
          StackBuddy Insights
        </InsightHeader>
        {insights}
        <Spacer/>
        <ProceedButton onClick={handleNavigate}>Use Your Workstaion</ProceedButton>
      </InsightsContainer>
    )}
  </Container>
);
};

export default CreateWithStackBuddy;
