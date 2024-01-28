import React, { useState } from 'react';
import './Greeting.css';

function Greeting() {
    const [name, setName] = useState('');
    const [greetingsList, setGreetingsList] = useState([]);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (name) {
            const newGreeting = `Hello, ${name}!`;
            setGreetingsList([...greetingsList, newGreeting]);
            setName('');
        }
    };

    return (
        <div>
            <h1>Welcome to React!</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button type="submit">Greet Me</button>
            </form>
            <div className="greeting-list">
                {greetingsList.map((greeting, index) => (
                    <p key={index}>{greeting}</p>
                ))}
            </div>
        </div>
    );
}

export default Greeting;
