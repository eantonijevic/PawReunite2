package lab1.monolithic.repository;

import javax.persistence.EntityManager;

public class SystemRepository {

    private final Users users;

    public SystemRepository(EntityManager entityManager) {
        this.users = new Users(entityManager);
    }

    public static SystemRepository create(EntityManager entityManager) {
        return new SystemRepository(entityManager);
    }

    public Users users() {
        return users;
    }

}
