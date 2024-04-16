import React, { useState } from 'react';
import styled from 'styled-components';
import AuthForm from '../components/AuthForm';
import { useSpring, animated, config} from 'react-spring';
import SvgImage from '../assets/IntroTree.svg'

// Overlay for AuthForm 
const OverlayWrapper = styled.div`
position: relative;

`;

const Overlay = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;


const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #005C97;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  `;

const ContentWrapper = styled.div`
  margin-top: 1vh;
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif; //
`;

const ContentContainer = styled(animated.div)`
margin: -30%;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const AnimatedHeader = styled(animated.h1)`  
  margin: 3%;
  color: #ffff;
  font-size: 4rem;
`;

const AnimatedSubHeader = styled(animated.div)`
  color: #ffffff;
  font-size: 1.7rem;
  margin-bottom: 30px;
`;


const ImageContainer = styled(animated.div)`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const Button = styled(animated.button)`
font-size: 16px;
letter-spacing: 1px; 
color: black; 
cursor: pointer;
  background: #11998e;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #38ef7d, #11998e);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #38ef7d, #11998e); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   
border: none; 
padding: 20px 80px; 
border-radius: 25px; 
box-shadow: 0 4px 8px rgba(0,0,0,0.15); // Soft shadow for a subtle depth effect
transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s; // Smooth transitions for hover effects

&:hover, &:focus {
  background: white;
  box-shadow: 0 6px 12px rgba(0,0,0,0.3); 
  transform: translateY(-2px); 
}

&:active {
  transform: translateY(1px); 
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
}
`;

function IntroductionPage() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);


  const contentAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: config.molasses,
    delay: 100,
  });



  const imageAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(100px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: config.molasses,
    delay: 300,
  });

  const headerAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.gentle,
    delay: 300,
  });

  const subHeaderAnimation = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.slow,
    delay: 500 // Delay after header animation
  }); 

  
  const buttonAnimation = useSpring({
    from: { transform: 'scale(0.95)', opacity: 0.8 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 210, friction: 20 },
    delay: 600
  });


    const authFormAnimation = useSpring({
      opactiy: isAuthVisible ? 1: 0, 
      transform: isAuthVisible ? 'translateY(0)' : 'translateY(-30px)',
      config: config.gentle
    });



    // handle the closing of the overlay wiht the AuthForm 
    // Allow users to click outside the modal to close 

    const handleClose = (event) => {
      if(event.target.id === 'overlay') {
        setIsAuthVisible(false);
      }
     };



  return (
    <PageContainer>
    <ContentWrapper>
      <OverlayWrapper>
      <ContentContainer style={contentAnimation}>
        <AnimatedHeader style={headerAnimation}>Welcome to StackBuddyAI</AnimatedHeader>
        <AnimatedSubHeader style={subHeaderAnimation}>
        StackBuddyAI is designed to be the ultimate companion for developers at every level, especially those just starting their coding journey. This innovative app combines advanced AI technology to provide personalized tech stack recommendations. Whether you're building a simple web app or a complex, scalable system, StackBuddy guides you in selecting the ideal technologies that align with your project goals!
        </AnimatedSubHeader>
        <Button style={buttonAnimation} onClick={() => setIsAuthVisible(!isAuthVisible)}>Join Now</Button>
      </ContentContainer>
      {isAuthVisible && (
         <Overlay id="overlay" onClick={handleClose} style={authFormAnimation}>
          <AuthForm />
        </Overlay>
      )}
      </OverlayWrapper>
      <ImageContainer style={imageAnimation}>
        <img src={SvgImage} />
      </ImageContainer>
    </ContentWrapper>
  </PageContainer>
);
}

export default IntroductionPage;
