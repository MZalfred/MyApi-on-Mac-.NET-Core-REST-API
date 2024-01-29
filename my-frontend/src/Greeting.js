import React, { useState, useEffect } from 'react';
import './Greeting.css';

// Define the Greeting functional component
function Greeting() {
    // useState hooks to manage component state
    const [name, setName] = useState(''); // Tracks the current name input
    const [greetingsList, setGreetingsList] = useState([]); // List of all greetings
    const [editIndex, setEditIndex] = useState(-1); // Index of the greeting being edited
    const [editText, setEditText] = useState(''); // Text being edited
    const [sortOrder, setSortOrder] = useState('none'); // State for sorting order
    const [filterQuery, setFilterQuery] = useState(''); // State for filtering query

    
    // useEffect hook to load greetings from local storage when the component mounts
    useEffect(() => {
        // Retrieving stored greetings from local storage, or an empty array if none
        const storedGreetings = JSON.parse(localStorage.getItem('greetingsList')) || [];
        setGreetingsList(storedGreetings);
        }, []);    
    
    // Save greetings both in state and local storage
     const saveGreetings = (newList) => {
        setGreetingsList(newList); // Updating state with the new list
        localStorage.setItem('greetingsList', JSON.stringify(newList)); // Saving to local storage
    };   
    
    // Handle changes in the name input field
    const handleNameChange = (event) => {
        setName(event.target.value); // Updating the name state with the input value
    };
    
    // Handle form submission
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
    
    // Delete a greeting from the list
    const handleDelete = (index) => {
        const newGreetingsList = greetingsList.filter((_, idx) => idx !== index); // Creating a new list without the deleted greeting
        saveGreetings(newGreetingsList); // Saving the updated list
        alert('Greeting deleted.'); // Alert to confirm deletion
        };
    
    // Start editing a greeting
    const handleStartEdit = (index, greeting) => {
        setEditIndex(index); // Setting the index of the greeting being edited
        setEditText(greeting); // Setting the text to be edited
    };
    
    // Save the edited greeting
    const handleSaveEdit = (index) => {
        const updatedGreetings = [...greetingsList]; // Creating a copy of the current greetings list
        updatedGreetings[index] = editText; // Updating the specific greeting with the edited text
        saveGreetings(updatedGreetings); // Saving the updated list
        setEditIndex(-1); // Resetting the edit index
        alert('Greeting updated.'); // Alert to confirm the update
    };
    
    // Sort the greeting list
    const sortGreetings = (order) => {
        let sortedList;
        if (order === 'alphabetical') {
            sortedList = [...greetingsList].sort();
        } else {
            sortedList = [...greetingsList];
        }
        saveGreetings(sortedList);
        setSortOrder(order);
    };

    // Filter the greeting based on query
    const filteredGreetings = greetingsList.filter(greeting =>
        greeting.toLowerCase().includes(filterQuery.toLowerCase())
    );
    
    // JSX rendering
    return (
    <div className="greeting-container"> {/* Main container with Flexbox */}
        <h1>Welcome Alfred here!</h1>
        
        <form onSubmit={handleSubmit} className="greeting-form"> {/* Form section with Flexbox */}
            <input type="text" placeholder="Enter your name" value={name} onChange={handleNameChange} />
            <button type="submit">Greet Me</button>
        </form>

        <div className="sort-filter-container"> {/* Sorting and filtering section with Flexbox */}
            <button onClick={() => sortGreetings('alphabetical')}>Sort Alphabetically</button>
            <input type="text" placeholder="Filter greetings..." value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
            <p>Current Sort Order: {sortOrder === 'alphabetical' ? 'Alphabetical' : 'None'}</p>
        </div>

        <div className="greeting-list"> {/* Greetings list with Flexbox */}
            {filteredGreetings.map((greeting, index) => (
                <div key={index} className="greeting-item"> {/* Individual greeting item with Flexbox */}
                    {editIndex === index ? (
                        <div className="edit-greeting">
                            <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                            <button onClick={() => handleSaveEdit(index)}>Save</button>
                            <button onClick={() => setEditIndex(-1)}>Cancel</button>
                        </div>
                    ) : (
                        <div className="display-greeting">
                            <p>{greeting}</p>
                            <button onClick={() => handleStartEdit(index, greeting)}>Edit</button>
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);

}

export default Greeting;
