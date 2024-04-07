// You ARE IN THE wrong  file..  
// If you want to add something to the frontend go to App.jsx :)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap the entire application in the Router */}
      <App />
    </Router>
  </React.StrictMode>,
);