import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';

export const HomePage = () => {
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();

    const token = auth.getToken();
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [lostPets, setLostPets] = useState([]);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const user = await mySystem.getCurrentUser(token);
                setCurrentUser(user);
            } catch (error) {
                // Handle error
            }
        };

        const fetchLostPets = async () => {
            try {
                const pets = await mySystem.getLostPets();
                setLostPets(pets);
            } catch (error) {
                // Handle error
            }
        };

        fetchCurrentUser();
        fetchLostPets();
    }, []);

    const signOut = async () => {
        try {
            // Make a server call to delete the user
            await mySystem.deleteUser(token);
        } catch (error) {
            // Handle error
        }
        auth.removeToken();
        navigate('/');
    };

    const deleteAccount = async () => {
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
    };

    const goToRegisterLostPet = () => {
        navigate('/register-lost-pet');
    };

    const goToSearchFlyers = () => {
        navigate('/search-flyers');
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

    const currentUserEmail = currentUser ? currentUser.email : '';

    const userLostPets = lostPets.filter(pet => pet.userEmail === currentUserEmail);

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
                <h1>Users</h1>
                <ul>
                    {users.map((user) => (
                        <li key={user.email}>{user.email}</li>
                    ))}
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
                        <li key={pet.id}>{pet.name}</li>
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