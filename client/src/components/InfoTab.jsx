import React, { useState } from 'react';
import { useNavigate }  from 'react-router-dom'; 
import { useSpring, animated } from 'react-spring';
import styled from "styled-components";



const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
height: 100vh;
width: 100vw;
background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
`;


const AnimatedHeader = styled(animated.h1)`
  color: white;
  text-align: center;
  font-size: 4rem; // Customize size as needed
  margin-top: 10%;
  margin-bottom: 5vh; // Increase if more space is needed
`;


const AnimatedSubheader = styled(animated.h2)`
  color: #ffffff;
  text-align: center;
  font-size: 2.5rem; 
  margin-top: 5vh;
`;

const ButtonContainer = styled.div`
display: flex
justify-content: center;
align-items: center;
margin-top: 5vh;
gap: 20px;
`;




const Button = styled(animated.button)`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 20px 100px;
  margin: 0 100px;
  margin-top: 1vh;
  font-size: 16px;
  outline: none;
  &:hover {
    background-color: #0056b3;
  }
`;


const InfoText = styled(animated.div)`
  position: absolute;
  color: black;
  width: 100%;
  text-align: center;
  bottom: 20%;
  font-size: 2.5rem;
  padding: 2vh 0;

`;

const InfoTab = () => {
  // useNavigate to allow the user to navigate to the workstation if signed up if not go to sing up
  const navigate = useNavigate();
  const [infoStyle, setInfoStyle] = useSpring(() => ({opacity: 0}));

  // we will define a state to handle a user hovering over our buttons and the InfoText will display dynamic text based on button context 
    const [infoText, setInfoText] = useState('');

       // Function to allow users to see dynamic text 
       const showInfo = (text) => {
        setInfoText(text);
        setInfoStyle.start({ opacity: 1 });
      };
  
      // We will clear the text and set a small timeout function for effect
      const hideInfo = (text) => {
        setInfoStyle.start({ opacity: 0 });
        setTimeout(() => setInfoText(''), 5000);
      }

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

  
      return (
    <Container>
      <AnimatedHeader style={headerProps}>Welcome to StackBuddyAI</AnimatedHeader>
      <AnimatedSubheader style ={subHeaderProps}>
      Discover how our AI-driven tools can streamline your project planning.
      </AnimatedSubheader>
     <ButtonContainer>
      <Button
         onMouseEnter={() => showInfo('Learn about the introduction and purpose of our tool.')}
        onMouseLeave={hideInfo}
      >
        Introduction 
      </Button>
      <Button
        onMouseEnter={() => showInfo('Discover the features and capabilities of our tool.')}
        onMouseLeave={hideInfo}
        
      >
        Features
      </Button>
      <Button
        onMouseEnter={() => showInfo('Get started using the tool with this quick guide.')}
        onMouseLeave={hideInfo}
        onClick={() => navigate('/')}
      >
        Get Started
      </Button>
      </ButtonContainer>
      <InfoText style={infoStyle}>{infoText}</InfoText>
    </Container>
  );
};

export default InfoTab;


// function InfoTab() {
//   const [isHovering, setIsHovering] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovering(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovering(false);
//   };

//   return (
//     <>
//       <div
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <h4>Introduction</h4>
//         {isHovering && <p>Highlight the key benefits of using the tool, such as simplifying the process of building a tech stack, as well as our AI agent.</p>}
//       </div>

//       <div>
//         <h4>Features</h4>
//         <p>Describe each feature briefly and emphasize how it can benefit users in their tech stack planning and decision-making process.</p>
//       </div>

//       <div>
//         <h4>Get Started</h4>
//         <p>Conclude the onboarding process with a clear call to action.</p>
      
//       </div>

//     </>
//   );
  
// }

// export default InfoTab;