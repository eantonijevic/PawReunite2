import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

function PetList() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        // Fetch the list of lost pets from the server
        fetchLostPets();
    }, []);

    const fetchLostPets = () => {
        // Send an HTTP request to your server to fetch the lost pets
        // You can use libraries like axios or fetch for this purpose
        // Example:
        // axios.get('/api/lost-pets')
        //   .then(response => {
        //     setPets(response.data);
        //   })
        //   .catch(error => {
        //     // Handle the error
        //   })

        // For demonstration purposes, we'll use a dummy list of pets
        const dummyPets = [
            { id: 1, name: 'Max', species: 'Dog', userEmail: 'example1@example.com' },
            { id: 2, name: 'Bella', species: 'Cat', userEmail: null },
            { id: 3, name: 'Charlie', species: 'Dog', userEmail: 'example2@example.com' },
        ];
        setPets(dummyPets);
    };

    return (
        <div>
            <h2>Lost Pet List</h2>
            <p>Did you find me?</p>
            <ul>
                {pets.map(pet => (
                    <li key={pet.id}>
                        <strong>Name:</strong> {pet.name}<br />
                        <strong>Species:</strong> {pet.species}<br />
                        <strong>User Email:</strong> {pet.userEmail || 'N/A'}
                    </li>
                ))}
            </ul>
                <div>
                    <p>The lost pet you are looking for is not in the list.</p>
                    <Link to="/lost-pet">Register the Lost Pet</Link>
                </div>
        </div>
    );
}
export default PetList;