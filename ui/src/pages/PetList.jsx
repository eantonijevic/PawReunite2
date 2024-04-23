import '../styles/PetList.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useMySystem } from '../service/mySystem';
import { useAuthProvider } from '../auth/auth';

function PetList() {
    const [pets, setPets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const mySystem = useMySystem();
    const auth = useAuthProvider();
    const token = auth.getToken();

    useEffect(() => {
        mySystem.listLostPets(
            token,
            (pets) => {
                // On success, update the pets state with the received data
                setPets(pets);
            },
            (error) => {
                // On error, handle the error logic
                console.error('Error retrieving lost pets:', error);
                // You can also set an error state or display an error message to the user
            }
        );
    }, []);

    const handleKnowPetClick = (pet) => {
        // Handle the "I know this Pet!" button click for the specific pet
        console.log(`You know the pet: ${pet.name}`);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter the pets based on the search query
    const filteredPets = pets.filter((pet) => {
        const { name, species, userEmail } = pet;
        const query = searchQuery.toLowerCase();

        return (
            name.toLowerCase().includes(query) ||
            species.toLowerCase().includes(query) ||
            userEmail.toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <h2>Lost Pet List</h2>
            <p>Did you find me?</p>

            <div>
                <input
                    type="text"
                    placeholder="Search by name, species, or email"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <div>
                {filteredPets.length > 0 ? (
                    filteredPets.map((pet) => (
                        <div key={pet.id} className="pet-container">
                            <strong>Name:</strong> {pet.name}
                            <br />
                            <strong>Species:</strong> {pet.species}
                            <br />
                            <strong>User Email:</strong> {pet.userEmail || 'N/A'}
                            <div className="button-container">
                                <button onClick={() => handleKnowPetClick(pet)}>I know this Pet!</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No lost pets found.</p>
                )}
            </div>

            <div>
                <p>The lost pet you are looking for is not in the list.</p>
                <Link to="/lost-pet">Register the Lost Pet</Link>
            </div>
        </div>
    );
}

export default PetList;