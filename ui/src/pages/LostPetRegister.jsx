import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';
import Dropzone from 'react-dropzone';

function LostPetRegister() {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [comment, setComment] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null);
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const [users, setUsers] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');
    const [files, setFiles] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const lostPet = {
            name: name,
            species: species,
            userEmail: userEmail !== '' ? userEmail : null,
            comment: comment,
            files: files // Include the uploaded files
        };

        mySystem.registerpet(
            lostPet,
            () => {
                setRegistrationStatus('success');
                resetForm();
            },
            () => {
                setRegistrationStatus('error');
                resetForm();
            }
        );
    };

    const resetForm = () => {
        setName('');
        setSpecies('');
        setUserEmail('');
        setFiles([]);
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

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles);
    }, []);

    const isKennelUser = users.some(user => user.type === 'Kennel' && user.email === username);

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
                    <Dropzone onDrop={onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <button type="button">Agregar imagen</button>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    {files.length > 0 && (
                        <div>
                            <h4>Uploaded Files:</h4>
                            <ul>
                                {files.map((file, index) => (
                                    <li key={index}>{file.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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