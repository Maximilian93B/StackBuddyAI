import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';



const InsightsContainer = styled.div`
padding: 40px;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: center;
background: #ffffff; // Soft white background
box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Subtle shadow
border-radius: 10px; // Rounded corners
`;


const InputArea = styled.textarea`
width: 80%;
height: 100px;
margin-bottom: 20px;
padding: 10px;
font-size: 16px; // Larger font size for better readability
border: 2px solid #e2e8f0; // Soft border color
border-radius: 8px;
&:focus {
  outline: none;
  border-color: #a0aec0; // Focus color
}
`;


const SubmitButton = styled.button`
padding: 10px 20px;
background-color: #4CAF50; // Soft green background
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
transition: background-color 0.3s; // Smooth transition for hover
&:hover {
  background-color: #369f41; // Slightly darker green on hover
}
`;

const InsightsDisplay = styled.div`
margin-top: 20px;
background-color: #f9fafb; // Very light grey background
padding: 20px;
border-radius: 8px;
width: 80%;
color: #2d3748; // Darker text color for contrast
box-shadow: 0 2px 4px rgba(0,0,0,0.05); // Very subtle shadow
`;


// Componenent for handling AI insights 
const StackBuddyInsights = () => {
    // Set State for insights form 
    const [inputText, setInputText] = useState('');
    const [insights, setInsights] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch function for our openAI route 
    const fetchInsights = async () => {
    if (inputText.trim() === '' ) return;
    setLoading(true);

    // Try/catch for our response 
    // Include the inputText from the user to send to our AI 
    try {
        const response = await axios.post('http://localhost:3001/openai', { query: inputText });
        setInsights(response.data.message); // Match JSON structure 
        setInputText('');
    }   catch (error) {
        console.error('Error fetching StackBuddy insights', error);
        setInsights('Failed to fetch insgihts. Please try again')
    }
        setLoading(false);
    }
 

    const handleKeyPress = async () => {
        if(e.key === 'Enter') {
            e.preventDefault();
            await fetchInsights();
        };
    };

        return (
            <InsightsContainer>
           <InputArea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="StackBuddy is ready if you need them..."
            />
            <SubmitButton onClick={fetchInsights}>
                Use StackBuddy
            </SubmitButton>
            {loading ? <p>Loading...</p> : <InsightsDisplay>{insights}</InsightsDisplay>}
        </InsightsContainer>
        );
};

export default StackBuddyInsights;