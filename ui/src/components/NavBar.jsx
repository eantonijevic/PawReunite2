import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import background from '../assets/fondotitulo.png';

const NavBar = () => {
    return (
        <div style={styles.navBar}>
            <Link to="/" style={styles.logoButton}>
                <img src={logo} style={styles.logo} alt="Logo" />
            </Link>
            <Link to="/login" style={styles.navItem}>
                <button style={styles.button_Setting}>Registered User</button>
            </Link>
            <Link to="/list" style={styles.navItem}>
                <button style={styles.button_Setting}>Lost Pet List</button>
            </Link>
            <Link to="/register" style={styles.navItem}>
                <button style={styles.button_Setting}>Sign Up</button>
            </Link>
            <Link to="/vet-kennel" style={styles.navItem}>
                <button style={styles.button_Setting}>Vet/Kennel</button>
            </Link>
        </div>
    );
};

// Styles

const styles = {
    navBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
        alignItems: 'center',
    },
    logoButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
    navItem: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button_Setting: {
        backgroundColor: 'rgba(98, 232, 44, 0.48)',
        borderRadius: 7,
        fontSize: 16,
        color: '#000000',
        padding: '8px 16px',
        border: 'none',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
};

export default NavBar;