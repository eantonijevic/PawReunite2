import React, { useState } from 'react';

function LostPetRegister() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new Lost Pet object with the entered details
        const lostPet = {
            name: name,
            species: species,
            userEmail: userEmail !== '' ? userEmail : null,
        };

        // Send the lostPet object to the server for registration
        registerLostPet(lostPet);

        // Clear the form inputs
        setName('');
        setSpecies('');
        setUserEmail('');
    };

    const registerLostPet = (lostPet) => {
        // Send an HTTP request to your server to register the lost pet
        // You can use libraries like axios or fetch for this purpose
        // Example:
        // axios.post('/api/lost-pets', lostPet)
        //   .then(response => {
        //     // Handle the response
        //   })
        //   .catch(error => {
        //     // Handle the error
        //   })
        console.log('Registering Lost Pet:', lostPet);
    };

    return (
        <div>
            <h2>Register a Lost Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="text" value={name} onChange={handleNameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Species:
                        <input type="text" value={species} onChange={handleSpeciesChange} />
                    </label>
                </div>
                <div>
                    <label>
                        User Email (optional):
                        <input type="text" value={userEmail} onChange={handleUserEmailChange} />
                    </label>
                </div>
                <div>
                    <button type="submit">Register Lost Pet</button>
                </div>
            </form>
        </div>
    );
}

export default LostPetRegister;