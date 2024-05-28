import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../assets/logo.jpg';
import background from '../assets/fondotitulo.png';


const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.navBar}>
            <div style={styles.backgroundContainer}>
                <img src={background} style={styles.backgroundImage} alt="Background" />
            </div>
            <Link to="/" style={styles.logoButton}>
                <img src={logo} style={styles.logo} alt="Logo" />
            </Link>

                <button style={styles.button_Setting} onClick={() => navigate("/login")}>Registered User</button>

                <button style={styles.button_Setting} onClick={() => navigate("/list") } >Pet List</button>
                <button style={styles.button_Setting} onClick={() =>navigate("/register")}>Sing Up </button>

                <button style={styles.button_Setting} onClick={()=> navigate("/vet-Kennel")}>Vet/Kennel</button>
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
    backgroundContainer: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    backgroundImage: {
        flex:1,
        zIndex: -1,
        position: 'absolute',
        width: '100%',
        height: '9%',
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