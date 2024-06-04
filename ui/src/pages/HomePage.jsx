import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';

export const HomePage = () => {
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();

    const token = auth.getToken();
    const [lostPets, setLostPets] = useState([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');


    useEffect(() => {
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

    const signOut = () => {
        auth.removeToken();
        navigate('/');
    };

    const deleteAccount = async () => {
        const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');

        if (confirmed) {
            try {
                await mySystem.deleteUser(token, () => {
                    auth.removeToken();
                    navigate('/');
                }, () => {
                    // Handle error
                });
            } catch (error) {
                // Handle error
            }
        }
    };

    const handleEditPet = (petId) => {
        // Redirect the user to the edit pet page, passing the petId as a query parameter
        navigate(`/edit-pet?petId=${petId}`);
    };

    const goToRegisterLostPet = () => {
        navigate('/lost-pet');
    };

    const goToSearchFlyers = () => {
        navigate('/list');
    };

    const goToOwnFlyerMenu = () => {
        navigate('/own-flyer-menu');
    };

    const goToSavedFlyers = () => {
        navigate('/saved-flyers');
    };

    const goToNotifyVeterinarian = () => {
        navigate('/notify-veterinarian');
    };

    const goToViewComments = () => {
        navigate('/view-comments');
    };

    const goToCreateChat = () => {
        navigate('/create-chat');
    };

    const userLostPets = lostPets.filter(pet => pet.userEmail === username);

    const handleDeletePet = async (petId) => {
        try {
            // Remove the pet from the local state first
            setLostPets(lostPets.filter((pet) => pet.id !== petId));

            // Call the backend to delete the pet
            await mySystem.deletePet(
                token,
                petId,
                () => {
                    // Callback for successful deletion
                    console.log("Pet deleted successfully");
                },
                (error) => {
                    // Callback for error in deletion
                    console.error("Error deleting pet:", error);
                    // Revert the optimistic update
                    setLostPets([...lostPets, { id: petId }]);
                }
            );
        } catch (error) {
            console.error("Error deleting pet:", error);
            // Revert the optimistic update
            setLostPets([...lostPets, { id: petId }]);
        }
    };

    return (
        <div className="container">
            <nav className="navbar navbar-default" role="navigation">
                <div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a href="" onClick={signOut}>
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <h1>User</h1>
                <ul>
                        <li>{username}</li>
                </ul>
            </div>

            <div className="container">
                <h1>Actions</h1>
                <ul>
                    <li>
                        <button type="button" onClick={goToRegisterLostPet}>
                            Add New Flyers
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToSearchFlyers}>
                            Search Flyers
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToOwnFlyerMenu}>
                            Own Flyer Menu
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToSavedFlyers}>
                            Saved Flyers
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToNotifyVeterinarian}>
                            Notify a Veterinarian/Kennel
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToViewComments}>
                            View/Reply Comments
                        </button>
                    </li>
                    <li>
                        <button type="button" onClick={goToCreateChat}>
                            Create Chat and View Messages
                        </button>
                    </li>
                </ul>
            </div>

            <div className="container">
                <h1>Lost Pets</h1>
                <ul>
                    {userLostPets.map((pet) => (
                        <li key={pet.id}>
                            {pet.name}
                            <br />
                            {pet.species}
                            <br /><button type="button" onClick={() => handleEditPet(pet.id)}>
                            Edit Pet
                            </button>
                            <button type="button" onClick={() => handleDeletePet(pet.id)}>
                                Delete Pet
                            </button>

                        </li>
                    ))}
                </ul>
            </div>

            <div className="container">
                <button type="button" onClick={deleteAccount}>
                    Delete Account
                </button>
            </div>

            <footer className="footer">
                <p>Footer</p>
            </footer>
        </div>
    );
};