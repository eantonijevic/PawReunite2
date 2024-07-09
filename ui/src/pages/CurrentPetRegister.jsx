import React, { useState, useEffect } from 'react';
import { useAuthProvider } from '../auth/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';

export const CurrentPetRegister = () => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [dateAdded, setDateAdded] = useState(new Date().toISOString().split('T')[0]);
    const [comment, setComment] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null); // Track registration status
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const [currentPet, setCurrentPet] = useState(null); // Track the current pet object

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new Current Pet object with the entered details
        const newPet = {
            name: name,
            species: species,
            userEmail: userEmail !== '' ? userEmail : null,
            dateAdded: new Date().toISOString().split('T')[0],
            comment: comment,
        };

        mySystem.registerCurrentPet(
            currentPet,
            () => {
                // Registration successful
                setRegistrationStatus('success'); // Set registration status to success
                resetForm();
            },
            () => {
                // Registration failed
                setRegistrationStatus('error'); // Set registration status to error
                resetForm();
            }
        );
    };

    const resetForm = () => {
        // Clear the form inputs
        setName('');
        setSpecies('');
        setUserEmail('');
        setDateAdded(new Date().toISOString().split('T')[0]);
        setCurrentPet(null);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value);
    };

    const handleUserEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const handleDateAddedChange = (event) => {
        setDateAdded(event.target.value);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    return (
        <div>
            <h2>Manage Current Pets</h2>
            {registrationStatus === 'success' && (
                <div style={{ color: 'green' }}>Current pet details updated successfully!</div>
            )}
            {registrationStatus === 'error' && (
                <div style={{ color: 'red' }}>Failed to update current pet details. Please try again.</div>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Name:
                        <input
                            type="name"
                            value={name}
                            placeholder="Whiskers"
                            name="name"
                            onChange={handleNameChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Species:
                        <input
                            type="species"
                            placeholder="Cat"
                            name="species"
                            value={species}
                            onChange={handleSpeciesChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        User Email (optional):
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={userEmail}
                            name="userEmail"
                            onChange={handleUserEmailChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Date Added:
                        <input
                            type="date"
                            name="dateAdded"
                            value={dateAdded}
                            onChange={handleDateAddedChange}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Comment (optional):
                        <textarea
                            placeholder="Enter a comment about the current pet"
                            value={comment}
                            name="comment"
                            onChange={handleCommentChange}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">Save Current Pet Details</button>
                </div>
            </form>
            <div>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
};

export default CurrentPetRegister;