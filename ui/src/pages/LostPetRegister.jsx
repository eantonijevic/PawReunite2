import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router';
import { useMySystem } from '../service/mySystem';

function LostPetRegister() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null); // Track registration status
    const navigate = useNavigate();
    const mySystem = useMySystem();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const petName = searchParams.get('name');
    const petSpecies = searchParams.get('species');
    const petMail = searchParams.get('mail');

    useEffect(() => {
        if (petName) {
            setName(petName);
        }
        if (petSpecies) {
            setSpecies(petSpecies);
        }
        if (petMail) {
            setUserEmail(petMail);
        }
    }, [petName, petSpecies, petMail]);

    const [users, setUsers] = useState([]);
    const username = searchParams.get('username');


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new Lost Pet object with the entered details
        const lostPet = {
            name: name,
            species: species,
            userEmail: userEmail !== '' ? userEmail : null,
            comment: comment, // Include the comment in the lostPet object

        };

        // Send the lostPet object to the server for registration
        mySystem.registerpet(
            lostPet,
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

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const isKennelUser = users.some(user => user.type === 'Kennel' && user.email === username);
    let x = '';
    return (
        <div>
            <h2>Register a Lost Pet</h2>
            {registrationStatus === 'success' && (
                <div style={{ color: 'green' }}>Lost pet registered successfully!</div>
            )}
            {registrationStatus === 'error' && (
                <div style={{ color: 'red' }}>Failed to register lost pet. Please try again.</div>
            )}
            <form onSubmit={handleSubmit}>
                {!isKennelUser &&
                    <div>
                        <label>
                            adoppet?:
                                <input
                                    type="text"
                                    value={x === 'yes' ? true : false}
                                    placeholder= "yes"
                                    onChange={handleNameChange}

                                />
                        </label>
                    </div>}
                <div>
                    <label>
                        Name:
                        <input
                            type="name"
                            value={name}
                            placeholder="Tom"
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
                        Comment (optional):
                        <textarea
                            placeholder="Enter a comment about the lost pet"
                            value={comment}
                            name="comment"
                            onChange={handleCommentChange}
                        />
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