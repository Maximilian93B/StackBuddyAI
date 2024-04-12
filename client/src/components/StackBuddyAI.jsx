import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';


const StackBuddyOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); // Lighter overlay for a softer appearance
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
  width: 40vw; // 
  background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  border-radius: 25px; 
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;


// Header for the chat box, displaying the name of the bot.
const ChatHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  color: #76FF03; 
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #ccc; 
`;


const MessageContainer = styled.div`
flex-grow: 1;
width: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;
padding: 20px;
background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
border-radius: 10px;
margin-bottom: 20px; // Space before input
`;

const Message = styled.div`
margin-bottom: 10px;
  padding: 15px 20px;
  border-radius: 25px;
  background-color: ${(props) => (props.role === 'user' ? '#e0f7fa' : '#f0f0f0')};
  color: black;
  font-size: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  border: 1px solid #d0e0e3;
  font-family: 'Verdana', sans-serif;
  align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 80%;
  word-wrap: break-word;
`;

const MessagesDisplay = styled.div`
flex-grow: 1;
overflow-y: auto;
padding: 10px;
height: 10vh;
max-height: 540px;
`;

const InputContainer = styled.div`
  padding: 10px;
  width: 100%;
`;



const TextInput = styled.input`
width: calc(100% - 24px); // Account for padding
padding: 12px;
margin-top: 20px;
border: 2px solid #f0f0f0; 
border-radius: 25px; // Soft edges
background-color: #f9f9f9; 
font-size: 16px;
&:focus {
  background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
  border-color: #b2ebf2;
  outline: none;
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