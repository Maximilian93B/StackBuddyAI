import { ApolloClient, InMemoryCahce, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from 'apollo/client';
import { Outlet } from 'react-router-dom';
import './App.css'


// Construct main GraphQl API endpoint
const httpLink = createHttpLink({
  uri:'http://localhost:3001/graphql',
  cache: new InMemoryCahce()
});

// Construct request middleware that will attach JWT to every request
const authLink = setContext((_, { headers }) => {
  // Get the auth token from local storage if it exists 
  const token = localStorage.getItem('id_token');
  // Return headers to the contetxt so httplink can read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create a new Apollo Client Instance 

const client = new ApolloClient ( { 
  // Set up out client to execute the 'authlink' middleware prior to makinf the request 
  link: authLink.concat(httpLink),
  cache: new InMemoryCahce(),
});



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ApolloProvider client = {client}>

      </ApolloProvider>
    </>
  )
}

export default App
