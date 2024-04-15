import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';



const InsightsContainer = styled.div`
  padding: 20px;
  margin-top: 20px;
`;

const InputArea = styled.textarea`
  width: 80%;
  height: 100px;
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const InsightsDisplay = styled.div`
  margin-top: 20px;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
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
            placeholder="Enter project description here..."
            />
            <SubmitButton onClick={fetchInsights}>
                Generate Insights
            </SubmitButton>
            {loading ? <p>Loading...</p> : <InsightsDisplay>{insights}</InsightsDisplay>}
        </InsightsContainer>
        );
};

export default StackBuddyInsights;