import React, {useState} from "react";
import styled from "styled-components";
import {useSpring, animated} from 'react-spring';

const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 100vh;
width: 100vw;
background: #005C97;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
font-family: 'Poppins', sans-serif; //
`;


const AnimatedHeader = styled(animated.h1)`
  color: white;
  text-align: center;
  font-size: 4rem; // Customize size as needed
  margin-top: 5vh;
  
`;


const AnimatedSubheader = styled(animated.div)`
  color: #ffffff;
  font-size: 2.5rem; 
  margin-top: 5vh;
`;

const Input = styled.input`
  width: 80%;
  padding: 15px;
  font-size: 1.2rem;
  border: 2px solid #ccc;
  border-radius: 25px; // Rounded borders
  outline: none;
  margin-bottom: 20px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007BFF; // Highlight on focus
  }
`;

const Phase1 = () => {
    // Set the input state 
    const [input,setInput] = useState('');
    // Set the title state to toggle the title 
    const [isTitleEntered, setIsTitleEntered] = useState(false);

    const headerProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 300, // Delays the animation of the header
      });

      const subHeaderProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 600, // Delays the animation of the subheader
      });

      const handleInputSubmit = () => {
        if (!isTitleEntered) {
          // Assuming the title is entered first
          console.log('Title:', input); // Process or store the title
          setInput(''); // Clear input for description entry
          setIsTitleEntered(true); // Toggle to enter description
        } else {
          console.log('Description:', input); // Process or store the description
          // Here you might redirect the user or clear the form
        }
      };


      return (
        <Container>
          <AnimatedHeader style={headerProps}>
            {isTitleEntered ? 'Enter Description' : 'Enter Title'}
          </AnimatedHeader>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
            placeholder={isTitleEntered ? "Type your project's description..." : "Type your project's title..."}
          />
        </Container>
      );
    };

export default Phase1; 