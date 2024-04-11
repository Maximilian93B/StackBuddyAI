import React, { useState } from 'react';
import { useLocation }  from 'react-router-dom'; 
import styled from "styled-components";

const Container = styled.div`
  background-color: #24346b;
  color: #FFF;
  padding: 20px;
  text-align: center;

  h1 {
    color: #f3c20f;
  }

  div {
    display: flex;
    justify-content: space-between;
    

    div {
      flex-basis: 30%;
      background-color: #3C4F76;
      padding: 10px;
      border-radius: 5px;
      cursor: pointer; 
      flex-direction: column;
      


      h2 {
        color: #f3c20f;
      }
      
      p {
        color: #FFF;
        display: none; 
        font-weight: bold;
        margin-top: 10px;
        font-size: 20px;
       
      }

      
      &:hover {
        p {
          display: block;
          flex-direction: column;
      
        }
      }
    }
  }
`;

const InfoTab = () => {
  const handleGetStartedClick = () => {
    // Redirect to another endpoint 
    window.location.href = '/get-started';
  };

  return (
    <Container>
      <h1>Welcome to StackBuddyAI</h1>
      <div>
        <div>
          <h2>Introduction</h2>
          <p>Highlight the key benefits of using the tool,such as simplifying the process of building a tech stack, <br />as well as our AI agent.</p>
        </div>
        <div>
          <h2>Features</h2>
          <p>Describe each feature briefly and emphasize how <br />it can benefit users in their tech stack planning <br />and decision-making process.</p>
        </div>
        <div onClick={handleGetStartedClick}> {/* Add click event */}
          <h2>Get Started</h2>
          <p>Conclude the onboarding process with <br />a clear call to action.</p>
        </div>
      </div>
    </Container>
  );
}

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