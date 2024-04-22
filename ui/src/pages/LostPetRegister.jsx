import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';

function LostPetRegister() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const navigate = useNavigate();
    const mySystem = useMySystem();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new Lost Pet object with the entered details
        const lostPet = {
            name: name,
            species: species,
            userEmail: userEmail !== '' ? userEmail : null,
        };

        // Send the lostPet object to the server for registration
        mySystem.registerpet(
            lostPet,
            () => {
                // Registration successful
                console.log('Lost pet registered successfully');
                // Additional code to handle success, e.g., show a success message
                resetForm();
            },
            () => {
                // Registration failed
                console.error('Failed to register lost pet');
                // Additional code to handle failure, e.g., show an error message
                resetForm();
            }
        );
    };

    const resetForm = () => {
        // Clear the form inputs
        setName('');
        setSpecies('');
        setUserEmail('');
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    return (
        <div>
            <h2>Register a Lost Pet</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input type="name"
                               value={name}
                               placeholder="Tom"
                               name="name"
                               onChange={handleNameChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Species:
                        <input type="species"
                               placeholder="Cat"
                               name="species"
                               value={species}
                               onChange={handleSpeciesChange} />
                    </label>
                </div>
                <div>
                    <label>
                        User Email (optional):
                        <input type="email"
                               placeholder="name@example.com"
                               value={userEmail}
                               name="userEmail"
                               onChange={handleUserEmailChange} />
                    </label>
                </div>
                <div>
                    <button type="submit">Register Lost Pet</button>
                </div>
            </form>
            <div>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
}

export default LostPetRegister;