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
  width: 40vw
  background-color: rgba(0, 0, 0, 0.4); // Lighter overlay for a softer appearance
  z-index: 999;
  ${props => props.style}
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 80vh;
  width: 40vw; // 
  background: linear-gradient(180deg, #ffffff 0%, #f4f4f4 100%);
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #black;
  border-radius: 25px; 
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  ${props => props.style}
`;


// Header for the chat box, displaying the name of the bot.
const ChatHeader = styled.div`
  width: 100%;
  margin-bottom: 20px;
  color: #4a90e2;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 10px 0;
  border-bottom: 1px solid #e1e1e1;; 
  ${props => props.style}
`;


const MessageContainer = styled.div`
flex-grow: 1;
width: 100%;
overflow-y: auto;
display: flex;
flex-direction: column;
padding: 20px;
background: white;
border-radius: 10px;
margin-bottom: 20px; // Space before input
${props => props.style}
`;

const Message = styled(animated.div)`
${props => props.style}
margin-bottom: 10px;
padding: 20px 20px;
border-radius: 20px;
background-color: ${(props) => (props.role === 'user' ? '#e0f7fa' : '#f9f9f9')};
color: black;
font-size: 18px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
border: 1px solid #d0e0e3;
font-family: 'Roboto', sans-serif;
align-self: ${(props) => (props.role === 'user' ? 'flex-end' : 'flex-start')};
max-width: 80%;
word-wrap: break-word;
&:nth-child(odd) {
  background-color: #e0f7fa; // Slightly different shade for alternating messages
}
animation: fadeIn 0.3s;
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
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
border: 2px solid #e0e0e3; 
border-radius: 25px; // Soft edges
background-color: #white; 
font-size: 16px;
&:focus {
  background: white;
  border-color: #4a90e2;
  outline: none;

}
`;


const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  background-color: #76FF03;
  color: black;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  :hover {
    transform: rotate(90deg); // A playful hover effect
    transition: transform 0.2s;
  }
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
    from: { opacity: 0 },
    to: { opacity: 1 },
    reset: true,
    reverse: !isVisible,
    onRest: () => { if (!isVisible) {/* Handle when animation is done, if necessary */} },
  });



  // animation for message entry using React Spring
  const transitions = useTransition(messages, {
      keys: message => message.id, 
      from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
      enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
      leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
      config: { tension: 280, friction: 30 }
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
      content: 'Hey I/m StackBuddy. Im here to assist you in finding the right tech stack for your projects, You can ask me anything and i will try my best to help.' 
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
      // 
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
      <MessageContainer>
        <ChatHeader>StackBuddyGPT</ChatHeader>
        <MessagesDisplay>
          {messages.map((message, index) => (
            <Message key={index} role={message.role}>
              {message.content}
            </Message>
          ))}
        </MessagesDisplay>
        <CloseButton onClick={onClose}>X</CloseButton>
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
      </ChatContainer>
    </animated.div>
    </StackBuddyOverlay>
  );
}

export default StackBuddyAI;