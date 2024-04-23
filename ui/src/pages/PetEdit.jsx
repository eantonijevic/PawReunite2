import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAuthProvider } from '../auth/auth';
import { useMySystem } from '../service/mySystem';

export const PetEdit = () => {
  const navigate = useNavigate();
  const mySystem = useMySystem();
  const auth = useAuthProvider();

  const token = auth.getToken();
  const [pet, setPet] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const petId = searchParams.get('petId');

  useEffect(() => {
    mySystem.getPet(
      token,
      petId,
      (pet) => {
        setPet(pet);
      },
      (error) => {
        console.error('Error retrieving pet:', error);
      }
    );
  }, []);

  const handleSave = async () => {
    try {
      await mySystem.updatePet(
        token,
        pet,
        () => {
          navigate('/home');
        },
        (error) => {
          console.error('Error updating pet:', error);
        }
      );
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleCancel = () => {
    navigate('/home');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPet((prevPet) => ({
      ...prevPet,
      [name]: value,
    }));
  };

  if (!pet) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Edit Pet</h1>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={pet.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="species">Species:</label>
        <input
          type="text"
          id="species"
          name="species"
          value={pet.species}
          onChange={handleChange}
        />
      </div>

      {/* Add more fields as needed */}

      <button type="button" onClick={handleSave}>
        Save
      </button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};