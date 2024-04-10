import React, {useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  max-height: 70vh;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.role === 'user' ? '#e0e0e0' : '#4caf50')};
  color: ${(props) => (props.role === 'user' ? '#000' : '#fff')};
  align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
`;

const TextInput = styled.input`
  width: calc(100% - 40px);
  padding: 10px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StackBuddyAI = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(' ');

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    try {
      const response = await axios.post('http://localhost:3001/openai', { query: inputText });
      const botReply = response.data.message;
      setMessages([...messages, { role: 'user', content: inputText }, { role: 'bot', content: botReply }]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      await sendMessage();
    }
  };

  return (
    <ChatContainer>
      <MessageContainer>
        {messages.map((message, index) => (
          <Message key={index} role={message.role}>
            {message.content}
          </Message>
        ))}
      </MessageContainer>
      <TextInput
        type='text'
        placeholder='Let StackBuddy Help you create a project'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </ChatContainer>
  );
};


export default StackBuddyAI;