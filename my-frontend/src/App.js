import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Greeting from './Greeting'; // Make sure to create this component

function App() {
  const [message, setMessage] = useState('Welcome Alfred here!');

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message}</p>
        <button onClick={() => setMessage('You clicked the button!')}>
          Click me
        </button>
        {/* The Greeting component is now included along with the original content */}
        <Greeting />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
