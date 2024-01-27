import React, { useState } from 'react';

function Greeting() {
  // This is a "state" that remembers the message.
  const [message, setMessage] = useState('Hello, world!');

  // This function changes the message when the button is clicked.
  const changeMessage = () => {
    setMessage('Hello, React!');
  };

  return (
    <div>
      <h1>{message}</h1> {/* This shows the message */}
      <button onClick={changeMessage}>Change Message</button>
    </div>
  );
}

export default Greeting;
