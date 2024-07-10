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
    const [currentPets, setCurrentPets] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    useEffect(() => {
        // Fetch the current user's information
        setCurrentUser(username);

        // Fetch the user's lost pets
        mySystem.listLostPets(
            token,
            (lostPets) => {
                setLostPets(lostPets);
            },
            (error) => {
                console.error("Error retrieving lost pets:", error);
            }
        );

        // Fetch the user's current pets
        mySystem.listCurrentPets(
            token,
            (currentPets) => {
                setCurrentPets(currentPets);
            },
            (error) => {
                console.error("Error retrieving current pets:", error);
            }
        );
    }, []);

    const handleEditPet = (petId) => {
        navigate(`/edit-pet?petId=${petId}`);
    };

    const handleEditCurrentPet = (petId) => {
        navigate(`/edit-current-pet?petId=${petId}`);
    };


    const handleDeletePet = async (petId) => {
        try {
            // Show a confirmation dialog before deleting the pet
            const confirmed = window.confirm(
                "Are you sure you want to delete this pet? This action cannot be undone. Please make sure your pet has been found before deleting."
            );
            if (!confirmed) {
                return; // User canceled the deletion, so don't proceed
            }
                await mySystem.deletePet(
                    token,
                    petId,
                    () => {
                        // Callback for successful deletion
                        console.log("Lost pet deleted successfully");
                        // Update the local state
                        setLostPets(lostPets.filter((pet) => pet.id !== petId));
                    },
                    (error) => {
                        // Callback for error in deletion
                        console.error("Error deleting lost pet:", error);
                    }
                );
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };

    const handleDeleteCurrentPet = async (petId) => {
        try {
            // Show a confirmation dialog before deleting the pet
            const confirmed = window.confirm(
                "Are you sure you want to delete this pet? This action cannot be undone. Please make sure your pet has been found before deleting."
            );
            if (!confirmed) {
                return; // User canceled the deletion, so don't proceed
            }
            // Call the backend to delete the pet
                await mySystem.deleteCurrentPet(
                    token,
                    petId,
                    () => {
                        // Callback for successful deletion
                        console.log("Current pet deleted successfully");
                        // Update the local state
                        setLostPets(lostPets.filter((pet) => pet.id !== petId));
                    },
                    (error) => {
                        // Callback for error in deletion
                        console.error("Error deleting current pet:", error);
                    }
                );
        } catch (error) {
            console.error("Error deleting pet:", error);
        }
    };


    const userLostPets = lostPets.filter(pet => pet.userEmail === username);
    const userCurrentPets = currentPets.filter(pet => pet.userEmail === username);

    // Sort the current pets by date added in descending order
    const sortedCurrentPets = userCurrentPets.sort((a, b) => new Date(b.date) - new Date(a.date));


    return (
        <div className="container">
            <h1>Pets</h1>
            {currentUser && <p>Currently logged in as: {currentUser}</p>}
            <h2>Lost Pets</h2>
            <ul>
                {userLostPets.map((pet) => (
                    <li key={pet.id}>
                        {pet.name}
                        <br />
                        {pet.species}
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
                        <button type="button" onClick={() => handleEditPet(pet.id, true)}>
                            Edit Pet
                        </button>
                        <button type="button" onClick={() => handleDeletePet(pet.id, true)}>
                            Delete Pet
                        </button>
                    </li>
                ))}
            </ul>

            <h2>Current Pets</h2>
            <ul>
                {sortedCurrentPets.map((pet) => (
                    <li key={pet.id}>
                        {pet.name}
                        <br/>
                        {pet.species}
                        <br/>
                        {pet.comment}
                        <br/>
                        {new Date(pet.date).toLocaleString()}
                        <br/>
                        <button type="button" onClick={() => handleEditCurrentPet(pet.id, false)}>
                            Edit Pet
                        </button>
                        <button type="button" onClick={() => handleDeleteCurrentPet(pet.id, false)}>
                            Delete Pet
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};