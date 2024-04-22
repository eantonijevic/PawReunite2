package lab1.rest.persistence;

import lab1.rest.model.LostPet;
import lab1.rest.model.RegistrationPetForm;
import lab1.rest.model.RegistrationUserForm;
import lab1.rest.model.User;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class LostPets {

    private final EntityManager entityManager;

    public LostPets(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public LostPet createLostPet(RegistrationPetForm signUpValues) {
        final String id = UUID.randomUUID().toString(); // Generate a unique ID
        final LostPet newLostPet = LostPet.create(
                id,
                signUpValues.getName(),
                signUpValues.getSpecies(),
                signUpValues.getUserEmail()
        );

        if (exists(newLostPet.getName())) {
            throw new IllegalStateException("Pet already exists.");
        }

        entityManager.persist(newLostPet);

        return newLostPet;
    }

    public boolean deleteLostPet(String name) {
        Optional<LostPet> optionalLostPet = findByName(name);
        if (optionalLostPet.isPresent()) {
            LostPet lostpet = optionalLostPet.get();
            entityManager.remove(lostpet);
            return true;
        }
        return false;
    }

    public boolean exists(String name) {
        return findByName(name).isPresent();
    }

    public Optional<LostPet> findByName(String name) {
        return entityManager.createQuery("SELECT u FROM LostPet u WHERE u.name LIKE :name", LostPet.class)
                .setParameter("name", name).getResultList().stream()
                .findFirst();
    }

    public List<LostPet> list() {
        return entityManager.createQuery("SELECT u FROM LostPet u", LostPet.class)
                .getResultList();
    }
}