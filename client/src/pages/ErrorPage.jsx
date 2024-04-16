import React from 'react'
import styled from 'styled-components';
import StackBuddyBot from '../assets/StackBuddyBot.svg'
import { useNavigate } from 'react-router-dom';
// useNavigate to let user go back to home page 
import { useSpring, animated, config} from 'react-spring';


const ErrorPageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; 
height: 100vh; // Full height of the viewport
font-family: 'Poppins', sans-serif; //
text-align: center;
background: -webkit-linear-gradient(to right, #363795, #005C97);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #363795, #005C97); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;



const ContentWrapper = styled(animated.h1)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center; 
height: 100vh; // Full height of the viewport
align-items: center;
font-family: 'Poppins', sans-serif; //
`;

const Title = styled.div`
color: white; 
font-size: 4rem; 
text-shadow: 2px 2px 4px rgba(0,0,0,0.2); // Text shadow for depth
`;

const SubHeader = styled.div`
color: #ffffff;
font-size: 2.5rem;
margin-bottom: 40px;
`;

const ImageContainer = styled.div`  
width: 100%;
display: flex;
justify-content: center;
margin: 20px 0;
`;

const NotFoundImg = styled.img`
  max-width: 50%; // Limiting to 50% of the container width
  height: auto;
  border-radius: 10px;
`;


const NavigateButton = styled.button`
font-size: 16px;
letter-spacing: 1px; 
color: black; 
cursor: pointer;
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
}
`;

const NotFoundPage = () => {

    const navigate = useNavigate();

    // Handle the user transition back to home page in order to signup/login
        const handleNavigate = () => {
            navigate('/'); // Direct the user to the login/Sign in page 
        }

        // UseSpring for animation 
        const contentAnimation = useSpring({
          from: { opacity: 0, transform: 'translateX(-100px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
          config: config.molasses,
          delay: 100,
        });

    return (
        <ErrorPageContainer>
          <ContentWrapper style={contentAnimation}>
            <Title>401: Not Authorized</Title>
            <ImageContainer>
                <NotFoundImg src={StackBuddyBot} />
            </ImageContainer>
            <SubHeader>Sorry You must be logged in! Please create an account or Log In</SubHeader>
            <NavigateButton onClick={handleNavigate}>Sign Up / Log In</NavigateButton>
            </ContentWrapper>
        </ErrorPageContainer>
    );
};

export default NotFoundPage;