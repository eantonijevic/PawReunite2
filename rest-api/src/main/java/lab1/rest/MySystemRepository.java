package lab1.rest;

import lab1.rest.persistence.Kennels;
import lab1.rest.persistence.Users;
import lab1.rest.persistence.LostPets;
import lab1.rest.persistence.CurrentPets;


import javax.persistence.EntityManager;

public class MySystemRepository {

    private final Users users;
    private final Kennels kennels;
    private final LostPets lostPets;

    private final CurrentPets currentPets;

    public MySystemRepository(EntityManager entityManager) {
        this.users = new Users(entityManager);
        this.lostPets = new LostPets(entityManager);
        this.kennels = new Kennels(entityManager);
        this.currentPets = new CurrentPets(entityManager);
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

    public Kennels kennels() {
        return kennels;
    }

    public CurrentPets currentPets() {
        return currentPets;
    }
}