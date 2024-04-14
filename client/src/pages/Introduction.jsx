
import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImg from '../assets/tree1.png';
import AuthForm from '../components/AuthForm';
import { useSpring, animated, config} from 'react-spring';

// Import AuthForm to render onClick 

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(144deg, rgba(237,173,249,0.4422561260832458) 28%, rgba(253,222,158,0.5851132689403886) 51%, rgba(74,220,204,0.4450572465314251) 100%);
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled(animated.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const ImageContainer = styled.div`
  flex: 1;
  min-height: 550px;
  background: url(${BackgroundImg}) center/cover no-repeat;
`;

const AnimatedHeader = styled(animated.h1)`
  color: black;
  font-size: 2.5rem;
  z-index: 9999;
`;

const AnimatedSubHeader = styled(animated.div)`
  color: #ffffff;
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const Button = styled(animated.button)`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;


function IntroductionPage() {

  const[isAuthVisible, setIsAuthVisible] = useState(false)


  const headerAnimation = useSpring({
    from: {opacity: 0, transform: 'translate3d(0, 40px, 0 )'},
    to: {opacity: 1, transform: 'translat3d(0,0,0)' },
    config: config.molasses,
    delay:100,
  });


  const subHeaderAnimation = useSpring({
    from: { opactiy: 0, transform: 'translate3d(0, 40px, 0)'},
    to: {  opacity: 1, transform: 'translate3d(0,0,0)'},
    config: config.molasses,
    delay: 300,
  });

/* Test for useSpring
  const fadeInUp = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opactiy: 1, transform: 'translate3d(0,0,0'},
    config: config.molasses,
    delay: 300,
  }); 

  */
  const buttonAnimation = useSpring({
    from: { transform: 'scale(0.9)', opacity: 0.7 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: { tension: 180, friction: 12 },
    loop: { reverse: true },
  });




  const toggleAuthForm = () => {
    console.log('Auth Form Toggled:', isAuthVisible);
    setIsAuthVisible(!isAuthVisible);
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <ContentContainer>
          <AnimatedHeader style={headerAnimation}>Welcome to Stack-Buddy-AI</AnimatedHeader>
          <AnimatedSubHeader style={subHeaderAnimation}>
          Your go-to app for simplifying technology selection in full-stack application development. With the power of AI, we provide personalized recommendations based on your project needs, saving you time and resources. Say goodbye to guesswork and hello to smarter decisions. Join us today and unlock the potential of AI-driven technology selection.
          </AnimatedSubHeader>
          <Button style={buttonAnimation} onClick={() => setIsAuthVisible(!isAuthVisible)}>Join Now</Button>
          {isAuthVisible && <AuthForm />}
        </ContentContainer>
        <ImageContainer> {/* Content for ImageContainer */} </ImageContainer>
      </ContentWrapper>
    </PageContainer>
  );
};


export default IntroductionPage;

