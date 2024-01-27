import React, { useState } from 'react';

function Greeting() {
    const [name, setName] = useState('');
    const [greeting, setGreeting] = useState('Welcome Alfred here!');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setGreeting(`Hello, ${name}!`);
    };

    return (
        <div>
            <h1>{greeting}</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={handleNameChange}
                />
                <button type="submit">Greet Me</button>
            </form>
        </div>
    );
}

export default Greeting;
