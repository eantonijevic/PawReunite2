package lab1.rest;

import lab1.rest.persistence.Users;

import javax.persistence.EntityManager;

public class MySystemRepository {

    private final Users users;

    public MySystemRepository(EntityManager entityManager) {
        this.users = new Users(entityManager);
    }

    public static MySystemRepository create(EntityManager entityManager) {
        return new MySystemRepository(entityManager);
    }

    public Users users() {
        return users;
    }

}