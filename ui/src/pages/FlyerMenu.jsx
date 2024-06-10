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

    const goToRegisterLostPet = () => {
        navigate('/lost-pet');
    };

    const userLostPets = lostPets.filter(pet => pet.userEmail === username);
    const handleDeletePet = async (petId) => {
        // ... (existing code for deleting a pet)
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
                        {pet.name}
                        <br />
                        {pet.species}
                        <br />
                        <strong>Comment:</strong>
                        <br />
                        {pet.comment || 'N/A'}
                        <br />
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