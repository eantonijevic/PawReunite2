import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {useLocation, useNavigate} from 'react-router';
import { useMySystem } from '../service/mySystem';

function LostPetRegister() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [adopp, setAdopp] = useState(false) // Set adopp to false by default
    const [comment, setComment] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null); // Track registration status
    const navigate = useNavigate();
    const mySystem = useMySystem();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const petName = searchParams.get('name');
    const petSpecies = searchParams.get('species');
    const petMail = searchParams.get('mail');
    const petAdopp = searchParams.get('adopp');

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
        if (petAdopp) {
            setAdopp(petAdopp === 'true'); // Convert the string value to a boolean
        }
    }, [petName, petSpecies, petMail, petAdopp]);

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
            adopp: adopp // Include the adopp value in the lostPet object
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
        setAdopp(false); // Reset adopp to false
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

    const handleAdoppChange = (event) => {
        setAdopp(event.target.value === 'true'); // Convert the string value to a boolean
    };

    const isKennelUser = users.some(user => user.type === 'Kennel' && user.email === username);

    return (
        <div>
            <h2>{adopp ? 'Register an Adopted Pet' : 'Register a Lost Pet'}</h2>
            {registrationStatus === 'success' && (
                <div style={{ color: 'green' }}>Pet registration successful!</div>
            )}
            {registrationStatus === 'error' && (
                <div style={{ color: 'red' }}>Failed to register pet. Please try again.</div>
            )}
            <form onSubmit={handleSubmit}>
                {!isKennelUser &&
                    <div>
                        <label>
                            adoppet?:
                            <input
                                type="checkbox"
                                checked={adopp}
                                onChange={handleAdoppChange}
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
                            placeholder="Enter a comment about the pet"
                            value={comment}
                            name="comment"
                            onChange={handleCommentChange}
                        />
                    </label>
                </div>
                <div>
                    <button type="submit">{adopp ? 'Register Adopted Pet' : 'Register Lost Pet'}</button>
                </div>
            </form>
            <div>
                <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
}

export default LostPetRegister;