import '../styles/PetList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';
import { useAuthProvider } from '../auth/auth';

function PetList() {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editedComment, setEditedComment] = useState('');
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [updatedPet, setUpdatedPet] = useState(null);


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

    const handleCommentUpdate = (pet) => {
        const now = new Date().toLocaleString();
        const updatedPet = {
            ...pet,
            comment: `${pet.comment || ''}\n\n[${now}] ${editedComment}`,
        };

        mySystem.updatePet(
            token,
            updatedPet,
            () => {
                console.log('Pet comment updated successfully!');
                setEditedComment('');
                setUpdatedPet(updatedPet); // Update the updatedPet state
            },
            (error) => {
                console.error('Error updating pet comment:', error);
            }
        );
    };

    const filteredPets = pets.map((pet) => (
        pet.id === updatedPet?.id ? updatedPet : pet
    ));

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
                                    value={editedComment}
                                    onChange={(e) => setEditedComment(e.target.value)}
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