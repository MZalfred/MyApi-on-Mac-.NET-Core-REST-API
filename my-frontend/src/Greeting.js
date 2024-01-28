import React, { useState, useEffect } from 'react';
import './Greeting.css';

// Define the Greeting functional component
function Greeting() {
    // useState hooks to manage component state
    const [name, setName] = useState(''); // Tracks the current name input
    const [greetingsList, setGreetingsList] = useState([]); // List of all greetings
    const [editIndex, setEditIndex] = useState(-1); // Index of the greeting being edited
    const [editText, setEditText] = useState(''); // Text being edited
    
    // useEffect hook to load greetings from local storage when the component mounts
    useEffect(() => {
        // Retrieving stored greetings from local storage, or an empty array if none
        const storedGreetings = JSON.parse(localStorage.getItem('greetingsList')) || [];
        setGreetingsList(storedGreetings);
        }, []);    
    
    // Function to save greetings both in state and local storage
     const saveGreetings = (newList) => {
        setGreetingsList(newList); // Updating state with the new list
        localStorage.setItem('greetingsList', JSON.stringify(newList)); // Saving to local storage
        };   
    
        // Function to handle changes in the name input field
    const handleNameChange = (event) => {
        setName(event.target.value); // Updating the name state with the input value
        };
    
    // Function to handle form submission
    const handleSubmit = (event) => {
            event.preventDefault(); // Preventing the default form submit action
            if (!name.trim()) { // Checking if the name input is not just empty spaces
                alert('Please enter a name.'); // Alerting if the name is empty
                return;
            }
            const newGreeting = `Hello, ${name}!`; // Creating a new greeting
            saveGreetings([...greetingsList, newGreeting]); // Adding the new greeting to the list
            setName(''); // Resetting the name input field
        };
    
        // Function to delete a greeting from the list
        const handleDelete = (index) => {
            const newGreetingsList = greetingsList.filter((_, idx) => idx !== index); // Creating a new list without the deleted greeting
            saveGreetings(newGreetingsList); // Saving the updated list
            alert('Greeting deleted.'); // Alert to confirm deletion
        };
    
        // Function to start editing a greeting
        const handleStartEdit = (index, greeting) => {
            setEditIndex(index); // Setting the index of the greeting being edited
            setEditText(greeting); // Setting the text to be edited
        };
    
        // Function to save the edited greeting
        const handleSaveEdit = (index) => {
            const updatedGreetings = [...greetingsList]; // Creating a copy of the current greetings list
            updatedGreetings[index] = editText; // Updating the specific greeting with the edited text
            saveGreetings(updatedGreetings); // Saving the updated list
            setEditIndex(-1); // Resetting the edit index
            alert('Greeting updated.'); // Alert to confirm the update
        };
    
        // JSX to render the component
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
                            {editIndex === index ? (
                                <button onClick={() => setEditIndex(-1)}>Cancel</button>
                            ) : null}
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    
// Exporting the component for use in other parts of the application
 export default Greeting;
    