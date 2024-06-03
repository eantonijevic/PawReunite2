import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';

export const LostPetsPage = () => {
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();

    const token = auth.getToken();
    const [lostPets, setLostPets] = useState(null);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');

    const userLostPets = lostPets?.filter(pet => pet.userEmail === username) || [];

    useEffect(() => {
        mySystem.listLostPets(
            token,
            (lostPets) => {
                setLostPets(lostPets);
                setLoading(false);
            },
            (error) => {
                console.error("Error retrieving lost pets:", error);
                setLoading(false);
            }
        );
    }, []);

    const handleEditPet = (petId) => {
        navigate(`/edit-pet?petId=${petId}`);
    };

    const handleDeletePet = async (petId) => {
        try {
            // Optimistic update
            setLostPets(lostPets.filter((pet) => pet.id !== petId));

            // Make the API call to delete the pet
            await mySystem.deletePet(
                token,
                () => {
                    console.log('Pet deleted successfully');
                },
                (error) => {
                    console.error('Error deleting pet:', error);
                    setLostPets([...lostPets, { id: petId }]);
                    alert('Failed to delete the pet. Please try again later.');
                }
            );
        } catch (error) {
            setLostPets([...lostPets, { id: petId }]);
            alert('An unexpected error occurred. Please try again later.');
            console.error('Error deleting pet:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!lostPets || lostPets.length === 0) {
        return <div>No lost pets found.</div>;
    }

    return (
        <div className="container">
            <h1>Lost Pets</h1>
            <ul>
                {userLostPets.map((pet) => (
                    <li key={pet.id}>
                        {pet.name}
                        <br />
                        {pet.species}
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