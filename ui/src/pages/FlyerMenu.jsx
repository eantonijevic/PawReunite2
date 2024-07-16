import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';

export const LostPetsPage = () => {
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();
    const token = auth.getToken();
    const [lostPets, setLostPets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    useEffect(() => {
        // Fetch the current user's information
        setCurrentUser(username);

        mySystem.listLostPets(
            token,
            (lostPets) => {
                setLostPets(lostPets);
            },
            (error) => {
                console.error("Error retrieving lost pets:", error);
            }
        );
    }, []);

    const handleEditPet = (petId) => {
        navigate(`/edit-pet?petId=${petId}`);
    };

    const userLostPets = lostPets.filter(pet => pet.userEmail === username);
    const handleDeletePet = async (petId) => {
        try {
            // Show a confirmation dialog before deleting the pet
            const confirmed = window.confirm(
                "Are you sure you want to delete this pet? This action cannot be undone. Please make sure your pet has been found before deleting."
            );

            if (!confirmed) {
                return; // User canceled the deletion, so don't proceed
            }

            // Call the backend to delete the pet
            await mySystem.deletePet(
                token,
                petId,
                () => {
                    // Callback for successful deletion
                    console.log("Pet deleted successfully");
                    // Update the local state
                    setLostPets(lostPets.filter((pet) => pet.id !== petId));
                },
                (error) => {
                    // Callback for error in deletion
                    console.error("Error deleting pet:", error);
                }
            );
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    if (!lostPets || lostPets.length === 0) {
        return <div>No lost pets found.</div>;
    }

    return (
        <div className="container">
            <h1>Lost Pets</h1>
            {currentUser && <p>Currently logged in as: {currentUser}</p>}
            <ul>
                {userLostPets.map((pet) => (
                    <li key={pet.id}>
                        {pet.photo && (
                            <img src={pet.photo} alt={pet.name} className="pet-photo" />
                        )}
                        <h3>{pet.name}</h3>
                        <p>{pet.species}</p>
                        <div className="comment-container">
                            <strong>Comment:</strong>
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
                        <button type="button" onClick={() => handleEditPet(pet.id)}>
                            Edit Pet
                        </button>
                        <button type="button" onClick={() => handleDeletePet(pet.id)}>
                            Delete Pet
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};