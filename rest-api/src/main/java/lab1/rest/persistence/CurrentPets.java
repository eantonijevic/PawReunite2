package lab1.rest.persistence;

import lab1.rest.model.CurrentPet;
import lab1.rest.model.RegistrationCurrentPetForm;
import lab1.rest.model.RegistrationPetForm;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class CurrentPets {

    private final EntityManager entityManager;

    public CurrentPets(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public CurrentPet createCurrentPet(RegistrationCurrentPetForm signUpValues) {
        final String id = UUID.randomUUID().toString(); // Generate a unique ID
        final CurrentPet newCurrentPet = CurrentPet.create(
                id,
                signUpValues.getName(),
                signUpValues.getSpecies(),
                signUpValues.getUserEmail(),
                signUpValues.getComment(),
                signUpValues.getDate()
        );

        if (exists(newCurrentPet.getName())) {
            throw new IllegalStateException("Pet already exists.");
        }

        entityManager.persist(newCurrentPet);

        return newCurrentPet;
    }

    public boolean deleteCurrentPet(String name) {
        Optional<CurrentPet> optionalCurrentPet = findByName(name);
        if (optionalCurrentPet.isPresent()) {
            CurrentPet currentpet = optionalCurrentPet.get();
            entityManager.remove(currentpet);
            return true;
        }
        return false;
    }

    public boolean exists(String name) {
        return findByName(name).isPresent();
    }

    public Optional<CurrentPet> findByName(String name) {
        return entityManager.createQuery("SELECT u FROM CurrentPet u WHERE u.name LIKE :name", CurrentPet.class)
                .setParameter("name", name).getResultList().stream()
                .findFirst();
    }

    public List<CurrentPet> list() {
        return entityManager.createQuery("SELECT u FROM CurrentPet u", CurrentPet.class)
                .getResultList();
    }

    public Optional<CurrentPet> findById(String id) {
        return entityManager.createQuery("SELECT u FROM CurrentPet u WHERE u.id LIKE :id", CurrentPet.class)
                .setParameter("id", id).getResultList().stream()
                .findFirst();
    }

    public CurrentPet updateCurrentPet(CurrentPet existingPet) {
        // First, find the existing pet in the database
        CurrentPet pet = entityManager.find(CurrentPet.class, existingPet.getId());

        // If the pet is not found, return null or throw an exception
        if (pet == null) {
            return null;
        }

        // Update the properties of the existing pet
        pet.setName(existingPet.getName());
        pet.setSpecies(existingPet.getSpecies());
        pet.setUserEmail(existingPet.getUserEmail());
        pet.setComment(existingPet.getComment());
        pet.setDate(existingPet.getDate());

        // Persist the updated pet to the database
        entityManager.persist(pet);

        return pet;
    }

    public boolean deleteCurrentPetbyId(String id) {
        Optional<CurrentPet> optionalCurrentPet = findById(id);
        if (optionalCurrentPet.isPresent()) {
            CurrentPet currentpet = optionalCurrentPet.get();
            entityManager.remove(currentpet);
            return true;
        }
        return false;
    }
}

