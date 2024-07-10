import React, { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';
import useNotification from "../components/useNotification";

export const HomePage = () => {
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();
    const [users, setUsers] = useState([])
    const token = auth.getToken();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const username = searchParams.get('username');
    const [notification, showNotification, dismissNotification] = useNotification();


    useEffect(() => {
        mySystem.listUsers(
            token,
            (user) => {
                setUsers(user);
            },
            (error) => {
                console.error("Error retrieving users:", error);
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

    const goToRegisterLostPet = () => {
        navigate('/lost-pet');
    };

    const goToRegisterNonLostPet = () => {
        navigate('/register-current-pet');
    };

    const goToSearchFlyers = () => {
        navigate('/list');
    };

    const goToOwnFlyerMenu = () => {
        navigate(`/own-flyer-menu?username=${username}`, { replace: true });
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

    const isKennelUser = users.some(user=>user.type === 'Kennel' && user.email === username)

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
                {!isKennelUser ?(
                    <li>
                <h1>User</h1>
                    </li>):(
                    <li>
                        <h1>Kennel</h1>
                    </li>)
                }
                <ul><li>{username}</li></ul>
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
                        <button type="button" onClick={goToRegisterNonLostPet}>
                            Register your current Pets
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
                <button type="button" onClick={deleteAccount}>
                    Delete Account
                </button>
            </div>

            <div className="container">
                <h2>Notifications:</h2>
                {notification ? (
                    <div className="notification">
                        <p>{notification.message}</p>
                        <p>{notification.timestamp}</p>
                        <button onClick={dismissNotification}>Dismiss</button>
                    </div>
                ) : (
                    <p>No new notifications.</p>
                )}
            </div>
        </div>
    );
};