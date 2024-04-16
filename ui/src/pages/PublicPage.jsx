import * as React from 'react'
import { Link } from 'react-router-dom';

export const PublicPage = () => {
    return (
        <div>
            <h1>Welcome to PetReunite!</h1>
            <p>Help lost pets find their way back home.</p>
            <div>
                <Link to="/login">Sign in</Link>
                <span> or </span>
                <Link to="/register">Sign up</Link>
            </div>
            <div>
                <h2>Lost a Pet?</h2>
                <p>Register your lost pet and increase the chances of a reunion:</p>
                <ul>
                    <li>Provide information about your pet, including name, breed, and age.</li>
                    <li>Upload a photo to assist with identification.</li>
                    <li>Specify the pet's last known location.</li>
                    <li>Share your contact information for communication purposes.</li>
                </ul>
                <Link to="/register">Sign up to register your Lost Pet</Link>
            </div>
            <div>
                <h2>Found a Pet?</h2>
                <p>Help reunite a lost pet with its owner:</p>
                <ul>
                    <li>Create a profile for the found pet, including a photo and location.</li>
                    <li>Provide your contact details so pet owners can reach you.</li>
                </ul>
                <Link to="/list">Report Found Pet</Link>
            </div>
            <div>
                <h2>Search for Lost Pets</h2>
                <p>Looking for a lost pet? Start your search here:</p>
                <ul>
                    <li>Filter search results by location, breed, and color.</li>
                    <li>View details of each lost pet, including photos and contact information.</li>
                    <li>Contact the owner directly if you find a match.</li>
                </ul>
                <Link to="/list">Check out our Lost Pet List</Link>
            </div>
        </div>
    )
}