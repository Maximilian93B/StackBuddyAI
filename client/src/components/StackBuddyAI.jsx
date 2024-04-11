import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const StackBuddyOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); // Slightly lighter overlay for a softer look
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 80vh;
  width: 60vw; // Slightly more compact for focus
  background-color: #fff; // Bright and clean background
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  border-radius: 20px; // Softer rounded corners
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2); // Soft, expansive shadow for floating effect
`;


// Header for the chat box, displaying the name of the bot.
const ChatHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  color: #4A90E2; // A vibrant, professional blue
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 3px solid #EAEAEA; // Light border for a crisp separation
`;


const MessageContainer = styled.div`
display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: flex-start; 
  width: 90%; 
  height: 65vh; 
  overflow-y: auto; 
  padding: 20px; 
  border: 2px solid #EAEAEA; 
  border-radius: 10px; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
  background-color: #FFFFFF; 
`;

const MessagesDisplay = styled.div`
flex-grow: 1;
overflow-y: auto;
padding: 10px;
height: 10vh;
max-height: 540px;
`;



const Message = styled.div`
margin-bottom: 10px;
padding: 10px 20px;
border-radius: 15px;
background-color: ${(props) => (props.role === 'user' ? '#E1F5FE' : '#FFF9C4')}; // Soft blue for user, soft yellow for bot
color: #333; // Dark text for readability
align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
max-width: 80%;
word-wrap: break-word;
box-shadow: 0 2px 4px rgba(0,0,0,0.1); // Subtle shadow for depth
&:hover {
  background-color: ${(props) => (props.role === 'user' ? '#B3E5FC' : '#FFF59D')}; // Slightly darker on hover
}
animation: fadeIn 0.3s ease-out;
`;


const InputContainer = styled.div`
  padding: 10px;
  width: 100%;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 12px 20px;
  margin-top: 20px;
  border: 2px solid #EAEAEA; // Soft border color
  border-radius: 25px; // Gentle, inviting rounded corners
  background-color: #FAFAFA; // Very light background to suggest interactivity
  color: #333;
  font-size: 16px;
  box-sizing: border-box;
  &:focus {
    border-color: #B3E5FC; // Highlight focus with a soft blue
  }
`;


const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: #D32F2F;
  }
`;


// Pass isVisible to accept state change to toggle view 
const StackBuddyAI = ({isVisible, onClose }) => {
  // useState to keep track of all the messages in the chatbox 
  // 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(' ');

  // Send a message to OpenAI 
  // Post Input to our OpenAI endpoint 
  // 
  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    try {
      // Post the input text to our openai endpoint 
      // Extract the botReply 
      // update the messages state with new role 'user' and bot messages 
      // 
      const response = await axios.post('http://localhost:3001/openai', { query: inputText });
      const botReply = response.data.message;
      setMessages([...messages, { role: 'user', content: inputText }, { role: 'bot', content: botReply }]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

    // Capture keys 
    // Use Enter key to send message 
    // Prevent default 
    // Send the message
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await sendMessage();
    }
  };



  return (
    <StackBuddyOverlay>
    <ChatContainer>
      <MessageContainer>
        <ChatHeader>StackBuddyGPT</ChatHeader>
        <MessagesDisplay>
          {messages.map((message, index) => (
            <Message key={index} role={message.role}>
              {message.content}
            </Message>
          ))}
        </MessagesDisplay>
      </MessageContainer>

      <InputContainer>
        <TextInput
          type='text'
          placeholder='Type your message...'
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </InputContainer>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ChatContainer>
    </StackBuddyOverlay>
  );
}

export default StackBuddyAI;