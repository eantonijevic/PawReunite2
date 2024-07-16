import '../styles/PetList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';
import { useAuthProvider } from '../auth/auth';
import useNotification from "../components/useNotification";

function PetList() {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedComments, setEditedComments] = useState({});
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [notification, showNotification] = useNotification();

    useEffect(() => {
        mySystem.listLostPets(
            token,
            (pets) => {
                setPets(pets);
            },
            (error) => {
                console.error('Error retrieving lost pets:', error);
            }
        );
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    function getEmail() {
        return sessionStorage.getItem('email');
    }

    const handleCommentUpdate = (pet) => {
        // Update the comment logic
        const currentTimestamp = new Date().toLocaleString();
        const userEmail = getEmail();
        const updatedPet = {
            ...pet,
            comment: pet.comment ? `${pet.comment}\n\n${editedComments[pet.id]} (${userEmail ? `${userEmail} - ` : ''}${currentTimestamp})` : `${editedComments[pet.id]} (${userEmail ? `${userEmail} - ` : ''}${currentTimestamp})`,
        };

        mySystem.updatePet(
            token,
            updatedPet,
            () => {
                console.log('Pet comment updated successfully!');
                setEditedComments({ ...editedComments, [pet.id]: '' });
                showNotification(`Comment updated for pet: ${pet.name}`);

                // Refresh the list of pets to show the updated comment
                mySystem.listLostPets(
                    token,
                    (pets) => {
                        setPets(pets);
                    },
                    (error) => {
                        console.error('Error retrieving lost pets:', error);
                    }
                );
            },
            (error) => {
                console.error('Error updating pet comment:', error);
            }
        );
    };

    const handleCommentChange = (petId, newComment) => {
        setEditedComments({ ...editedComments, [petId]: newComment });
    };

    const filteredPets = pets.filter((pet) => {
        const searchText = `${pet.name.toLowerCase()} ${pet.species.toLowerCase()} ${pet.userEmail?.toLowerCase() || ''} ${(pet.comment || '').toLowerCase()}`;
        return searchText.includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <h2>Lost Pet List</h2>
            <p>Did you find me?</p>

            <div>
                <input
                    type="text"
                    placeholder="Search by name, species, or email"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div>
                {filteredPets.length > 0 ? (
                    filteredPets.map((pet) => (
                        <div key={pet.id} className="pet-container">
                            {pet.photos && pet.photos.length > 0 && (
                                <img
                                    src={pet.photos[0]}
                                    alt={`Pet: ${pet.name}`}
                                    className="pet-photo"
                                />
                            )}
                            <strong>Name:</strong> {pet.name}
                            <br />
                            <strong>Species:</strong> {pet.species}
                            <br />
                            <strong>User Email:</strong> {pet.userEmail || 'N/A'}
                            <br />
                            <strong>Comment:</strong>
                            <div className="comment-container">
                                {pet.comment ? (
                                    pet.comment.split('\n\n').map((line, index) => (
                                        <div key={index} className="comment-line">
                                            {line}
                                        </div>
                                    ))
                                ) : (
                                    'N/A'
                                )}
                            </div>
                            <div className="button-container">
                                <input
                                    type="text"
                                    placeholder="Add a new comment"
                                    value={editedComments[pet.id] || ''}
                                    onChange={(e) => handleCommentChange(pet.id, e.target.value)}
                                />
                                <button onClick={() => handleCommentUpdate(pet)}>Add New Comment</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No lost pets found.</p>
                )}
            </div>
            <div>
                <p>If the lost pet you are looking for is not in the list...</p>
                <Link to="/lost-pet">Register the Lost Pet</Link>
            </div>
        </div>
    );
}

export default PetList;