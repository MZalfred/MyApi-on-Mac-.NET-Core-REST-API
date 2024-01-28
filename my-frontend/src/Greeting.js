import React, { useState } from 'react';
import './Greeting.css';

// Define the Greeting functional component
function Greeting() {
    // useState hooks to manage component state
    const [name, setName] = useState(''); // Tracks the current name input
    const [greetingsList, setGreetingsList] = useState([]); // List of all greetings
    const [editIndex, setEditIndex] = useState(-1); // Index of the greeting being edited
    const [editText, setEditText] = useState(''); // Text being edited

    // Handles changes to the name input field
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    // Handles the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        if (name) {
            const newGreeting = `Hello, ${name}!`;
            setGreetingsList([...greetingsList, newGreeting]);
            setName('');
        }
    };

    // Deletes a greeting from the list
    const handleDelete = (index) => {
        const newGreetingsList = greetingsList.filter((_, idx) => idx !== index);
        setGreetingsList(newGreetingsList);
    };

    // Starts editing a greeting
    const handleStartEdit = (index, greeting) => {
        setEditIndex(index);
        setEditText(greeting);
    };

    // Saves the edited greeting
    const handleSaveEdit = (index) => {
        const updatedGreetings = [...greetingsList];
        updatedGreetings[index] = editText;
        setGreetingsList(updatedGreetings);
        setEditIndex(-1);
    };

    // JSX rendering of the component
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
                    <div key={index}>
                        {editIndex === index ? (
                            <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                        ) : (
                            <p>{greeting}</p>
                        )}
                        {editIndex === index ? (
                            <button onClick={() => handleSaveEdit(index)}>Save</button>
                        ) : (
                            <button onClick={() => handleStartEdit(index, greeting)}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Export the component for use in other parts of my application
export default Greeting;
