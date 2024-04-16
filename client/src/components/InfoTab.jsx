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
background: #005C97;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
font-family: 'Poppins', sans-serif; //
`;


const AnimatedHeader = styled(animated.h1)`  
color: white;
  text-align: center;
  font-size: 3.7rem; // Customize size as needed
  margin-top: 6vh;
  
`;


const AnimatedSubheader = styled(animated.div)`
  color: #ffffff;
  font-size: 2.5rem; 
  margin-top: 5vh;
`;

const ButtonContainer = styled.div`
display: flex
justify-content: center;
align-items: center;
margin-top: 6vh;
gap: 20px;
`;

const Button = styled(animated.button)`
background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
border: none;
border-radius: 8px;
padding: 20px 100px;
margin: 0 100px;
margin-top: 1vh;
font-size: 1.3rem;
outline: none;
&:hover {
  background-color: #0056b3;
  }
`;


const InfoText = styled(animated.div)`
  position: absolute;
  color: white;
  width: 50%;
  text-align: center;
  bottom: 20%;
  font-size: 1.7rem;
  padding: 2vh 0;

`;

const InfoTab = () => {
  // useNavigate to allow the user to navigate to the workstation if signed up if not go to sing up
  const navigate = useNavigate();

  // we will define a state to handle a user hovering over our buttons and the InfoText will display dynamic text based on button context 
    const [infoText, setInfoText] = useState('');

       // Function to allow users to see dynamic text 
       const showInfo = (text) => {
        setInfoText(text);
        setInfoStyle.start({ opacity: 1 });
      };
  
      // We will clear the text and set a small timeout function for effect
      const hideInfo = () => setInfoText('');

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

      const buttonProps = useSpring({
        from: { opacity: 0, transform: 'translateY(-30px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 600, // Delays the animation of the subheader
      })

  
      return (
        <Container>
          <AnimatedHeader style={headerProps}>Empowering Developers, One Stack at a Time</AnimatedHeader>
          <AnimatedSubheader style={subHeaderProps}>
            Discover how our AI-driven tool can expedite the development planning process.
          </AnimatedSubheader>
          <ButtonContainer style={buttonProps}>
            <Button onMouseEnter={() => showInfo('StackBuddy provides developers with real-time feedback during the project planning phase, offering insights tailored to their specific development needs.')} onMouseLeave={hideInfo}>
              Introduction
            </Button>
            <Button onMouseEnter={() => showInfo('StackBuddy streamlines tech stack selection with its powerful features: a custom OpenAI GPT Model for personalized recommendations, an intuitive drag-and-drop workspace for easy tech stack assembly, comprehensive tools for managing project details, and a built-in text editor to boost productivity.')} onMouseLeave={hideInfo}>
              Features
            </Button>
            <Button onMouseEnter={() => showInfo('Get started using StackBuddyAI today')} onMouseLeave={hideInfo} onClick={() => navigate('/')}>
              Get Started
            </Button>
          </ButtonContainer>
          {infoText && <InfoText>{infoText}</InfoText>}
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