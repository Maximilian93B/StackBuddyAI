import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ProjectProvider } from './utils/UserProjectContext';
// Iport Auth Service 
import Workstation from './pages/Workstation';
import IntroductionPage from './pages/Introduction';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import InfoTab from './components/InfoTab';
import NotFoundPage from './pages/ErrorPage';
import  MyWorkSpace from './pages/MyProjectWkSpace';
import './App.css';

// Construct main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Construct request middleware that will attach the JWT to every request
const authLink = setContext((_, { headers }) => {
  // Get the auth token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a new Apollo Client instance
const client = new ApolloClient({
  // Set up our client to execute the authLink middleware prior to making the request
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(), // Corrected the spelling here
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <ProjectProvider> {/*Context for users selected projects */}
      <NavBar />
       <Routes> {/* Use Routes to wrap Route components*/}
          <Route path = '/' element = {<IntroductionPage />} />
          <Route path = '/workstation' element = {<Workstation/> } />
          <Route path = '/introduction' element = {<InfoTab/>} />
          <Route path ='/MyWorkSpace' element={<MyWorkSpace/>} />
          {/*Define other Routes here exactly like the '/' route above just change the path and element*/}
          {/** Route for unmatched paths , Use a wildcard '*' */}
          <Route path ='*' element ={<NotFoundPage />} />
        </Routes>
        <Footer />
        </ProjectProvider>
      </ApolloProvider>
    </>
  );
}

export default App;
