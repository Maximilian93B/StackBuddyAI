import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useTransition, animated, useSpring} from 'react-spring';
import styled from 'styled-components';

const StackBuddyOverlay = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
height: 80vh;
width: 40vw;
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, 0.3);
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
z-index: 999; 
`;

const ChatContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between; // Adjusts space distribution
height: 80vh;
width: 40vw;
padding: 20px;
box-sizing: border-box;
background: #005C97;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
backdrop-filter: blur(10px); // Glass effect
border: 1px solid white;
border-radius: 25px;
box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
font-family: 'Poppins', sans-serif; //
`;


// Header for the chat box, displaying the name of the bot.
const ChatHeader = styled.div`
width: 100%;
color: white;
text-align: center;
font-size: 24px;
font-weight: bold;
margin-bottom: 20px;
`;


const MessageContainer = styled.div`
flex-grow: 1; // Takes all available space
width: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;
margin-bottom: 20px; // Provides a margin at the bottom for spacing
`;

const InputContainer = styled.div`
  width: 95%;
`;

const Message = styled(animated.div)`
margin-bottom: 10px;
padding: 15px 20px;
background-color: ${(props) => (props.role === 'user' ? '#e0f7fa' : '#f9f9f9')};
border-radius: 12px;
color: black;
font-size: 16px;
align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
max-width: 80%;
`;


const TextInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  border: 2px solid #ccc;
  border-radius: 25px;
  background-color: white;
  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;



// Pass isVisible to accept state change to toggle view 
const StackBuddyAI = ({isVisible, onClose, overlayStyle, containerStyle, headerStyle, messageStyle  }) => {
  // useState to keep track of all the messages in the chatbox 
  // 
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(' ');
  // Send a message to OpenAI 
  // Post Input to our OpenAI endpoint 
  const [loading, setLoading] =useState(false);


// fade in animation for stackbuddy 
const fade = useSpring({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? 'translateY(0)' : 'translateY(-100%)'
});

  // Add a useEffect to handle the initial welcome message
  
// Initially this caused an infinite loop because i did not manage the dependencies properly
// to fix the issue i will Make sure useEffect does not depend on other Props, 
// Problem solved
/**
if(message.length === 0 )
[], only run once after the component mounts to prevent the infinite loop on mount

*/  
useEffect(()=> {
    const welcomeMessage = {
      role:'bot',
      content: "Hey, I'm StackBuddy. I'm here to assist you in finding the right tech stack for your projects. You can ask me anything, and I will try my best to help." 
    };
    // Check if messages array is empty before setting the welcome message so we can prevent the unenecessary updates
    if (messages.length === 0) {
      setMessages([welcomeMessage]);
    }
  }, []); // Ensure it only runs once after the component mounts 

  // 
  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    setLoading(true);
    try {
      // Post the input text to our openai endpoint 
      // Extract the botReply 
      // update the messages state with new role 'user' and bot messages 
      const response = await axios.post('http://localhost:3001/openai', { query: inputText });
      const botReply = response.data.message;
      setMessages((prevMessages) => [...prevMessages, { role: 'user', content: inputText }, { role: 'bot', content: botReply }]);
      setInputText('');
    } catch (error) {
      console.error('Error sending message', error);

    }
    // set loading to false after response is handled
    setLoading(false)
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
    <animated.div style={fade}>
      <ChatContainer>
        <ChatHeader>StackBuddy</ChatHeader>
        <MessageContainer>
          {messages.map((message, index) => (
            <Message key={index} role={message.role}>
              {message.content}
            </Message>
          ))}
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
      <CloseButton onClick={onClose}>X</CloseButton>
      </ChatContainer>
    </animated.div>
    </StackBuddyOverlay>
  );
}

export default StackBuddyAI;