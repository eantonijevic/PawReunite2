import * as  React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//import { useMySystem } from '../service/mySystem';

export const KennelPage = () => {

    const [errorMsg, setErrorMsg] = useState(undefined);
    /*muestra un error en cualquier fallo durante el logeo*/
    const navigate = useNavigate();
    //const mySystem = useMySystem();

    const handleExistingAssociation = () => {
        // Handle existing association logic
        navigate('/existing-association');
    };

    const handleNewAssociation = () => {
        // Handle new association logic
        navigate('/new-association');

    };

    return (
        <div>
            {errorMsg && (
                <div className="alert alert-warning" role="alert">
                    {setErrorMsg()}
                </div>
            )}

            <h1>Vet/Kennel Login</h1>
            <p>Are you already associated with PetReunite?</p>
            <button type="button" onClick={handleExistingAssociation}>
                Yes, I am already associated
            </button>
            <button type="button" onClick={handleNewAssociation}>
                No, I would like to associate
            </button>
            <br />
            <Link to="/">Back to Home</Link>
        </div>
    );
};