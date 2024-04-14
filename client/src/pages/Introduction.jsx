import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import BackgroundImg from '../assets/tree1.png';
import AuthForm from '../components/AuthForm';
import { useSpring, animated, config, useChain } from 'react-spring';

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(144deg, rgba(237,173,249,1) 28%, rgba(253,222,158,1) 51%, rgba(74,220,204,1) 100%);
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
`;

const ImageContainer = styled.div`
  min-height: 550px;
  font-size: 2.5rem; 
  background: url(${BackgroundImg}) center/cover no-repeat;
`;

const AnimatedHeader = styled(animated.h1)`
  color: #f3c20f;
  font-size: 4.5rem;
`;

const AnimatedSubHeader = styled(animated.div)`
  color: #ffffff;
  font-size: 2.2rem;
  margin-bottom: 30px;
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
  const [isAuthVisible, setIsAuthVisible] = useState(false);

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
  });


    const authFormAnimation = useSpring({
      opactiy: isAuthVisible ? 1: 0, 
      transform: isAuthVisible ? 'translateY(0)' : 'translateY(-30px)',
      config: config.gentle
    });



  return (
    <PageContainer>
    <ContentWrapper>
      <ContentContainer>
        <AnimatedHeader style={headerAnimation}>Welcome to Stack-Buddy-AI</AnimatedHeader>
        <AnimatedSubHeader style={subHeaderAnimation}>
        StackBuddy is designed to be the ultimate companion for developers at every level, especially those just starting their coding journey. This innovative app combines advanced AI technology with a comprehensive understanding of software development to provide personalized tech stack recommendations. Whether you're building a simple web app or a complex, scalable system, StackBuddy guides you in selecting the ideal technologies that align with your project requirements.
        </AnimatedSubHeader>
        <Button style={buttonAnimation} onClick={() => setIsAuthVisible(!isAuthVisible)}>Join Now</Button>
        {isAuthVisible && <AuthForm style={authFormAnimation} />}
      </ContentContainer>
      <ImageContainer />
    </ContentWrapper>
  </PageContainer>
);
}

export default IntroductionPage;
