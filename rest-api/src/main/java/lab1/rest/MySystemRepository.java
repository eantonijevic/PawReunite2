package lab1.rest;

import lab1.rest.persistence.Users;
import lab1.rest.persistence.LostPets; // Added import statement

import javax.persistence.EntityManager;

public class MySystemRepository {

    private final Users users;
    private final LostPets lostPets; // Added LostPets field

    public MySystemRepository(EntityManager entityManager) {
        this.users = new Users(entityManager);
        this.lostPets = new LostPets(entityManager); // Initialize LostPets
    }

    public static MySystemRepository create(EntityManager entityManager) {
        return new MySystemRepository(entityManager);
    }

    public Users users() {
        return users;
    }

    public LostPets lostPets() {
        return lostPets;
    }
}